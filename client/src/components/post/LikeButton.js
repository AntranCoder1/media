import React, { useContext, useEffect, useState } from 'react';
import { UidContext } from '../../components/AppContext';
import Popup from 'reactjs-popup';
import "reactjs-popup/dist/index.css";
import { useDispatch } from 'react-redux';
import { likePost } from '../../redux/actions/Post.actions';

const LikeButton = ({ post }) => {

    const uid = useContext(UidContext);
    const [liked, setLiked] = useState(false);
    const dispatch = useDispatch();

    const like = () => {
        dispatch(likePost(post._id, uid));
        setLiked(true);
    };

    useEffect(() => {
        if (post.likers.includes(uid)) setLiked(true);
        else setLiked(false);
    }, [uid, post.likers, liked]);

    return (
        <div className="like-container">
            { uid === null && (
                <Popup 
                    trigger={<img src="./img/icons/heart.svg" alt="like" />}
                    position={["bottom center", "bottom right", "bottom left"]}
                    closeOnDocumentClick
                >
                    <div>Log in to like a post!</div>
                </Popup>
            ) }

            { uid && liked === false && (
                <img src="/img/icons/heart.svg" onClick={like} alt="like" />
            )}
            { uid && liked && (
                <img src="./img/icons/heart-filled.svg" alt="unlike" />
            ) }
            <span>{post.likers.length}</span>
        </div>
    )
}

export default LikeButton
