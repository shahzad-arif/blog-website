import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Select, RTE } from "../index.js";
import service from "../../appwrite/appwrite_config.js";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { data } from "autoprefixer";
export const Postform = ({ post }) => {
	const navigate = useNavigate();
	const { register, handleSubmit, watch, setValue, control, getValues } =
		useForm({
			defaultValues: {
				title: post?.title || "",
				slug: post?.slug || "",
				content: post?.content || "",
				status: post?.status || "active",
			},
		});
	const userData = useSelector((state) => state.user.userData);
	const submit = async (data) => {
		if (post) {
			const file = data.image[0] ? service.uploadFile(data.image[0]) : null;
			if (file) {
				service.deleteFile(post.featuredImage);
			}
			const dbPost = await service.updatePost(post.$id, {
				...data,
				featuredImage: file ? file.$id : undefined,
			});
			if (dbPost) {
				navigate(`/post/${post.$id}`);
			}
		} else {
			const file = await service.uploadFile(data.image[0]);
			if (file) {
				const fileID = file.$id;
				data.featuredImage = fileID;
				const dbPost = await service.createPost({
					...data,
					userId: userData.$id,
				});
				if (dbPost) {
					navigate(`/post/${dbPost.$id}`);
				}
			}
		}
	};
	const slugTransform = useCallback((value) => {
		if (value && typeof value === "string")
			return value
				.trim()
				.toLowerCase()
				.replace(/[^a-zA-Z\d\s]+/g, "-")
				.replace(/\s/g, "-");

		return "";
	}, []);

	useEffect(() => {
		const subscription = watch((value, { name }) => {
			if (name == "title") {
				setValue("slug", slugTransform(value.title, { shouldValidate: true }));
			}
		});

		return () => subscription.unsubscribe();
	}, [watch, slugTransform, setValue]);

	return (
		<form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
			<div className="w-2/3 px-2">
				<Input
					label="Title"
					placeholder="Title"
					className="mb-4"
					{...register("title", {
						required: true,
					})}
				/>

				<Input
					label="Slug"
					placeholder="Slug"
					className="mb-4"
					{...register("slug", {
						required: true,
					})}
					onInput={(e) => {
						setValue("slug", slugTransform(e.currentTarget.value), {
							shouldValidate: true,
						});
					}}
				/>
				<RTE
					name="content"
					label="Content"
					control={control}
					defaultvalue={getValues("content")}
				/>
			</div>
			<div className="w-1/3 px-2">
				<Input
					label="Featured Image"
					type="file"
					className="mb-4"
					accept="image/png image/jpeg image/jpg image/gif"
					{...register("image", {
						required: true,
					})}
				/>
				{post && (
					<div className="w-full mb-4">
						<img
							src={service.filePreview(post.featuredImage)}
							alt={post.title}
							className="rounded-lg"
						/>
					</div>
				)}
				<Select
					options={["active , inactive"]}
					label="Status"
					className="mb-4"
					{...register("status", {
						required: true,
					})}
				/>
			</div>
			<Button
				type="submit"
				bgColor={post ? "bg-green-500" : undefined}
				className="w-full"
			>
				{post ? "Update" : "Submit"}
			</Button>
		</form>
	);
};
