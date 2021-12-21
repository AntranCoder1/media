import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deletePost } from '../../redux/actions/Post.actions';

const DeleteCard = ({ id }) => {

    const dispatch = useDispatch();

    const deleteQuote = () => dispatch(deletePost(id));

    return (
        <div onClick={() => {
            if (window.confirm("Do you want to delete this article ?")) {
                deleteQuote();
            }
        }}>
            <img src="./img/icons/trash.svg" alt="trash" />
        </div>
    )
}

export default DeleteCard
