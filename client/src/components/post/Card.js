import React from 'react';
import LikeButton from './LikeButton';
import DeleteCard from './DeleteCard';
import CardComment from './CardComment';

const Card = () => {
    return (
        <li className="card-container">
        <div className="card-left">
                <img
                    src="https://i.pinimg.com/564x/52/34/35/523435f76d9c3d1e1882a81ca8accc26.jpg"
                    alt="poster-pic"
                />
            </div>
            <div className="card-right">
                <div className="card-header">
                    <div className="name">
                        <h3>
                            Trần Thành An
                        </h3>
                        {/* <FollowHandler  /> */}
                    </div>
                    <span>16/12/2021</span>
                </div>
                <div className="update-post">
                    <textarea />
                    <div className="button-container">
                        <button className="btn">
                            Valider modification
                        </button>
                    </div>
                </div>
                <img src="https://i.pinimg.com/564x/52/34/35/523435f76d9c3d1e1882a81ca8accc26.jpg" alt="card-pic" className="card-pic" />
                <iframe
                    width="500"
                    height="300"
                    src="https://i.pinimg.com/564x/52/34/35/523435f76d9c3d1e1882a81ca8accc26.jpg"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title=""
                ></iframe>
                <div className="button-container">
                    <div>
                        <img src="./img/icons/edit.svg" alt="edit" />
                    </div>
                    <DeleteCard />
                </div>
                <div className="card-footer">
                <div className="comment-icon">
                    <img
                        src="./img/icons/message1.svg"
                        alt="comment"
                    />
                    <span>like</span>
                </div>
                <LikeButton />
                <img src="./img/icons/share.svg" alt="share" />
                </div>
                <CardComment />
            </div>
        </li>
    )
}

export default Card
