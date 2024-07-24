import React from 'react';
import PropTypes from 'prop-types';
import service from '../appwrite/appwrite_config';
import { Link } from 'react-router-dom';

function PostCard({ $id, title, featuredImage }) {
    return (
        <Link to={`/post/${$id}`}>
            <div className="w-full bg-gray-100 rounded-xl p-4">
                <div className="w-full justify-center mb-4">
                    <img src={service.filePreview(featuredImage)} alt={title} className="rounded-xl" />
                </div>
                <h2 className="text-xl font-bold">{title}</h2>
            </div>
        </Link>
    );
}

PostCard.propTypes = {
    $id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    featuredImage: PropTypes.string,
};

export default PostCard;
