import React, { useContext } from 'react';
import Log from '../components/log/Index';
import Leftnav from '../components/Leftnav';
import Trends from '../components/Trends';
import Thread from '../components/Thread';
import { UidContext } from '../components/AppContext';
import NewPostForm from '../components/post/NewPostForm';

const Home = () => {

    const uid = useContext(UidContext);

    return (
        <div className="home">
            <Leftnav />
            <div className="main">
                <div className="home-header">
                    { uid ? <NewPostForm /> : <Log signin={true} signup={false} /> }
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
