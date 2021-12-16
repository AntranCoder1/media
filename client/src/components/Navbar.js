import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
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
                <ul>
                    <li></li>
                    <li className="welcome">
                        <NavLink exact to="/profil">
                            <h5>Welcome Trần Thành An</h5>
                        </NavLink>
                    </li>
                </ul>
                <ul>
                    <li></li>
                    <li>
                        <NavLink exact to="/profil">
                            <img src="./img/icons/login.svg" alt="login"/>
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar
