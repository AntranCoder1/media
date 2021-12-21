import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addComment, getPosts } from '../../redux/actions/Post.actions';
import FollowHandle from '../profil/FollowHandle';
import { isEmpty, timestampParser } from '../Utils';

const CardComment = ({ post }) => {

    const usersData = useSelector(state => state.UsersRedux);
    const userData = useSelector(state => state.UserRedux);
    const dispatch = useDispatch();
    const [text, setText] = useState("");

    const handleComment = (e) => {
        e.preventDefault();

        if (text) {
            dispatch(addComment(post._id, userData._id, userData.username, text))
                .then(() => dispatch(getPosts()))
                .then(() => setText(''));
        }
    }

    return (
        <div className="comments-container">
            { post.comments.map((comment) => (
                <div className={
                    comment.commenterId === userData._id
                        ? "comment-container client"
                        : "comment-container"
                }>
                    <div className="left-part">
                        <img 
                            src={!isEmpty(usersData[0]) && usersData.map((user) => {
                                if (user._id === comment.commenterId) return user.picture;
                                else return null;
                            }).join("")}
                            alt="commenter-pic"
                        />
                    </div>
                    <div className="right-part">
                        <div className="comment-header">
                            <div className="username">
                                <h3>{comment.commenterUsername}</h3>
                                {comment.commenterId !== userData._id && (
                                    <FollowHandle
                                        idToFollow={comment.commenterId}
                                        type={"card"}
                                    />
                                )}
                            </div>
                            <span>{timestampParser(comment.timestamp)}</span>
                        </div>
                        <p>{comment.text}</p>
                    </div>
                </div>
            )) }
            { userData._id && (
                <form className="comment-form" onSubmit={handleComment}>
                    <input 
                        type="text"
                        name="text"
                        placeholder="Leave a comment"
                        onChange={(e) => setText(e.target.value)}
                        value={text}
                    />
                    <br />
                    <input type="submit" value="To send" />
                </form>
            ) }
        </div>
    )
}

export default CardComment
