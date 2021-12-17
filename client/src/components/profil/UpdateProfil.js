import React, { useState } from 'react';
import Leftnav from '../Leftnav';
import { useDispatch, useSelector } from 'react-redux';
import { dateParser } from '../Utils';
import UploadImg from './UploadImg';
import FollowHandle from './FollowHandle';

const UpdateProfil = () => {

    const userData = useSelector(state => state.UserRedux);

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
                        <p>text</p>
                        <button>
                            Update
                        </button>
                        <textarea
                            type="text"
                            // defaultValue={userData.bio}
                            // onChange={(e) => setBio(e.target.value)}
                            ></textarea>
                        <button>Validate modifications</button>
                    </div>
                    <h4>Member since : 2021</h4>
                    <h5>Subscribers</h5>
                </div>
            </div>
            {/* <div className="popup-profil-container">
                <div className="modal">
                    <h3>Subscriptions</h3>
                    <span 
                        className="cross"
                        onClick={() => setFollowingPopup(true)}
                    >
                        &#10005;
                    </span>
                    <ul>
                        <li>
                            <img src="https://i.pinimg.com/564x/52/34/35/523435f76d9c3d1e1882a81ca8accc26.jpg" alt="user-pic" />
                            <h4>Trần Thành An</h4>
                            <div className="follow-handler">
                                <FollowHandle />
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="popup-profil-container">
                <div className="modal">
                    <h3>Subscriptions</h3>
                    <span 
                        className="cross"
                        onClick={() => setFollowersPopup(false)}
                    >
                        &#10005;
                    </span>
                    <ul>
                        <li>
                            <img src="https://i.pinimg.com/564x/52/34/35/523435f76d9c3d1e1882a81ca8accc26.jpg" alt="user-pic" />
                            <h4>Trần Thành An</h4>
                            <div className="follow-handler">
                                <FollowHandle />
                            </div>
                        </li>
                    </ul>
                </div>
            </div> */}
        </div>
    )
}

export default UpdateProfil
