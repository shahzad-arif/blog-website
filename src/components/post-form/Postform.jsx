import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Select, RTE } from "../index.js"; // Assuming these components are in the same directory
import service from "../../appwrite/appwrite_config.js"; // Assuming the Appwrite config is in this path
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const Postform = ({ post }) => {
    const navigate = useNavigate();
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });
    const userData = useSelector((state) => state.auth.userData);
    
    const submit = async (data) => {
        try {
            if (post) {
                const file = data.image?.[0] ? await service.uploadFile(data.image[0]) : null;
                if (file) {
                    await service.deleteFile(post.featuredImage);
                }
                const dbPost = await service.updatePost(post.$id, {
                    ...data,
                    featuredImage: file ? file.$id : post.featuredImage,
                });
                if (dbPost) {
                    navigate(`/post/${post.$id}`);
                }
            } else {
                try {
                    const file = await service.uploadFile(data.image[0]);
                    console.log("File uploaded:", file);
    
                    if (file) {
                        console.log("In the condition for creating post");
                        const fileID = file.$id;
                        data.featuredImage = fileID;
    
                        const dbPost = await service.createPost({
                            ...data,
                            userId: userData.$id,
                        });
    
                        console.log("Post Created");
    
                        if (dbPost) {
                            console.log("Post Created with ID:", dbPost.$id);
                            navigate(`/post/${dbPost.$id}`);
                        }
                    } else {
                        console.error("File upload returned null or undefined");
                    }
                } catch (uploadError) {
                    console.error("Error during file upload:", uploadError);
                }
            }
        } catch (error) {
            console.error("Error submitting the post:", error);
        }
    };
    

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string") {
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "")
                .replace(/\s+/g, "-");
        }
        return "";
    }, []);

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
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
                    {...register("title", { required: true })}
                />

                <Input
                    label="Slug"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />

                <RTE
                    name="content"
                    label="Content :"
                    control={control}
                    defaultValue={getValues("content")}
                />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpeg, image/jpg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && post.featuredImage && (
                    <div className="w-full mb-4">
                        <img
                            src={service.filePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button
                    type="submit"
                    bgColor={post ? "bg-green-500" : undefined}
                    className="w-full"
                >
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
};
