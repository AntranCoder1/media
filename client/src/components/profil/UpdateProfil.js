import React, { useState } from 'react';
import Leftnav from '../Leftnav';
import { useDispatch, useSelector } from 'react-redux';
import { dateParser } from '../Utils';
import UploadImg from './UploadImg';
import FollowHandle from './FollowHandle';
import { updateBio } from '../../redux/actions/User.actions';

const UpdateProfil = () => {

    const userData = useSelector(state => state.UserRedux);
    const usersData = useSelector(state => state.UsersRedux);
    const [bio, setBio] = useState("");
    const [updateForm, setUpdateForm] = useState(false);
    const dispatch = useDispatch();
    const [followingPopup, setFollowingPopup] = useState(false);
    const [followersPopup, setFollowersPopup] = useState(false);

    const handleUpdate = () => {
        dispatch(updateBio(userData._id, bio));
        setUpdateForm(false);
    }

    return (
        <div className="profil-container">
            <Leftnav />
            <h1>Profile of {userData.username}</h1>
            <div className="update-container">
                <div className="left-part">
                    <h3>Profile picture</h3>
                    <img src={userData.picture} alt="user-pic" />
                    <UploadImg />
                    <p>124</p>
                    <p>124</p>
                </div>
                <div className="right-part">
                    <div className="bio-update">
                        <h3>Bio</h3>
                        { updateForm === false && (
                            <>
                                <p onClick={() => setUpdateForm(!updateForm)}>{userData.bio}</p>
                                <button onClick={() => setUpdateForm(!updateForm)}>Update</button>
                            </>
                        ) }
                        { updateForm && (
                            <>
                                <textarea
                                    type="text"
                                    defaultValue={userData.bio}
                                    onChange={(e) => setBio(e.target.value)}
                                    ></textarea>
                                <button onClick={handleUpdate}>Validate modifications</button>
                            </>
                        ) }
                    </div>
                    <h4>Member since : {dateParser(userData.createdAt)}</h4>
                    <h5 onClick={() => setFollowingPopup(true)}>
                        Subscriptions: {userData.following ? userData.following.length : ""}
                    </h5>
                    <h5 onClick={() => setFollowersPopup(true)}>
                        Subscribers: {userData.followers ? userData.followers.length : ""}
                    </h5>
                </div>
            </div>
            { followingPopup && (
                <div className="popup-profil-container">
                    <div className="modal">
                        <h3>Subscriptions</h3>
                        <span 
                            className="cross"
                            onClick={() => setFollowingPopup(false)}
                        >
                            &#10005;
                        </span>
                        <ul>
                            { usersData.map((user) => {
                                for (let i = 0; i < userData.following.length; i++ ) {
                                    if (user._id === userData.following[i]) {
                                        return (
                                            <li key={user._id}>
                                                <img src={user.picture} alt="user-pic" />
                                                <h4>{user.username}</h4>
                                                <div className="follow-handler">
                                                    <FollowHandle idToFollow={user._id} type={'suggestion'} />
                                                </div>
                                            </li>
                                        );
                                    }
                                }
                                return null;
                            }) }
                        </ul>
                    </div>
                </div>
            ) }
            { followersPopup && (
                <div className="popup-profil-container">
                    <div className="modal">
                        <h3>Subscribers</h3>
                        <span 
                            className="cross"
                            onClick={() => setFollowersPopup(false)}
                        >
                            &#10005;
                        </span>
                        <ul>
                            { usersData.map((user) => {
                                for(let i = 0; i < userData.followers.length; i++) {
                                    if (user._id === userData.followers[i]) {
                                        return (
                                            <li key={user._id}>
                                                <img src={user.picture} alt="user-pic" />
                                                <h4>{user.username}</h4>
                                                <div className="follow-handler">
                                                    <FollowHandle idToFollow={user._id} type={'suggestion'} />
                                                </div>
                                            </li>
                                        );
                                    }
                                }
                                return null;
                            }) }
                        </ul>
                    </div>
            </div>
            ) }
        </div>
    )
}

export default UpdateProfil
