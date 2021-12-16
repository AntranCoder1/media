import React from 'react';
import Log from '../components/log/Index';

const Profil = () => {
    return (
        <div className="profil-page">
            <div className="log-container">
                <Log login={false} register={true} />
                <div className="img-container">
                    <img src="./img/log.svg" alt="img-log" />
                </div>
            </div>
        </div>
    )
}

export default Profil
