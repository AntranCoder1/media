import React from 'react';
import { NavLink } from 'react-router-dom';

const Trends = () => {
    return (
        <div className="trending-container">
            <h4>Trending</h4>
            <NavLink exact to="/trending">
                <ul>
                    <li>
                        <div>
                            <img src="https://i.pinimg.com/564x/52/34/35/523435f76d9c3d1e1882a81ca8accc26.jpg" alt="post-pic" />
                            <iframe
                                src="https://i.pinimg.com/564x/52/34/35/523435f76d9c3d1e1882a81ca8accc26.jpg"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                title="123"
                            ></iframe>
                        </div>
                        <div className="trend-content">
                            <p>LoremFlickr provides placeholder images for every case, web or print, on almost any subject, in any size. It's simple and free. Just put the custom url in your code like so:</p>
                            <span>Lire</span>
                        </div>
                    </li>
                </ul>
            </NavLink>
        </div>
    )
}

export default Trends
