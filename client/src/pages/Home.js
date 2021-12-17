import React, { useContext } from 'react';
import Log from '../components/log/Index';
import Leftnav from '../components/Leftnav';
import Trends from '../components/Trends';
import Thread from '../components/Thread';
import { UidContext } from '../components/AppContext';

const Home = () => {

    const uid = useContext(UidContext);

    return (
        <div className="home">
            <Leftnav />
            <div className="main">
                <div className="home-header">
                
                </div>
                <Thread />
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
