import React from 'react';
import Log from '../components/log/Index';
import Leftnav from '../components/Leftnav';
import Trends from '../components/Trends';

const Home = () => {
    return (
        <div className="home">
            <Leftnav />
            <div className="main">
                <div className="home-header">
                
                </div>
            </div>
            <div className="right-side">
                <div className="right-side-container">
                <div className="wrapper">
                    <Trends />
                </div>
                </div>
            </div>
        </div>
    )
}

export default Home
