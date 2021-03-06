import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom';
import { UidContext } from './AppContext';
import Logout from './log/Logout';
import { useSelector } from 'react-redux';

const Navbar = () => {

    const uid = useContext(UidContext);
    const user = useSelector(state => state.UserRedux);

    return (
        <nav>
            <div className="nav-conatiner">
                <div className="logo">
                    <NavLink exact to="/">
                        <div className="logo">
                            <img src="./img/icon.png" alt="icon" />
                            <h3>React Network</h3>
                        </div>
                    </NavLink>
                </div>
                { uid ? (
                    <ul>
                        <li></li>
                        <li className="welcome">
                            <NavLink exact to="/profil">
                                <h5>Welcome {user.username}</h5>
                            </NavLink>
                        </li>
                        <Logout />
                    </ul>
                ) : (
                    <ul>
                        <li></li>
                        <li>
                            <NavLink exact to="/profil">
                                <img src="./img/icons/login.svg" alt="login" />
                            </NavLink>
                        </li>
                    </ul>
                ) }
            </div>
        </nav>
    )
}

export default Navbar
