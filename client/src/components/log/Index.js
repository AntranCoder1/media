import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';

const Index = ( props ) => {

    const [registerModal, setRegisterModal] = useState(props.register);
    const [loginModal, setLoginModal] = useState(props.login);

    const handleClick = (e) => {
        if (e.target.id === "register") {
            setLoginModal(false);
            setRegisterModal(true);
        } else if (e.target.id === "login") {
            setRegisterModal(false);
            setLoginModal(true);
        }
    }

    return (
        <div className="connection-form">
            <div className="form-container">
                <ul>
                    <li 
                        onClick={handleClick}
                        id="register"
                        className={registerModal ? "active-btn" : null}
                    >
                        Register
                    </li>
                    <li 
                        onClick={handleClick}
                        id="login"
                        className={loginModal ? "active-btn" : null}
                    >
                        Login
                    </li>
                </ul>
                { registerModal && <Register /> }
                { loginModal && <Login /> }
            </div>
        </div>
    )
}

export default Index
