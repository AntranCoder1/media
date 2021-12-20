import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { followUser, unfollowUser } from '../../redux/actions/User.actions';
import { isEmpty } from '../Utils';

const FollowHandle = ({ idToFollow, type }) => {

    const userData = useSelector(state => state.UserRedux);
    const dispatch = useDispatch();
    const [isFollowed, setIsFollowed] = useState(false);

    const handleFollow = () => {
        dispatch(followUser(userData._id, idToFollow));
        setIsFollowed(true);
    };

    const handleUnFollow = () => {
        dispatch(unfollowUser(userData._id, idToFollow));
        setIsFollowed(false);
    }

    useEffect(() => {
        if (!isEmpty(userData.following)) {
            if (userData.following.includes(idToFollow)) {
                setIsFollowed(true);
            } else {
                setIsFollowed(false);
            }
        }
    }, [userData, idToFollow]);

    return (
        <>
            { isFollowed && !isEmpty(userData) && (
                <span onClick={handleUnFollow}>
                    { type === "suggestion" && <button className="unfollow-btn">Subscriber</button> }
                    { type === "card" && <img src="./img/icons/checked.svg" alt="checked" /> }
                </span>
            ) }

            { isFollowed === false && !isEmpty(userData) && (
                <span onClick={handleFollow}>
                    {type === "suggestion" && <button className="follow-btn">To follow</button>}
                    {type === "card" && <img src="./img/icons/check.svg" alt="check"/>}
                </span>
            ) }
        </>
    )
}

export default FollowHandle
