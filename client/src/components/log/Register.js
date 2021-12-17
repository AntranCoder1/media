import React, { useState } from 'react';
import axios from 'axios';
import Login from './Login';

const Register = () => {

    const [formSubmit, setFormSubmit] = useState(false);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [controlPassword, setControlPassword] = useState("");

    const handleChange = async (e) => {
        e.preventDefault();
        const term =  document.getElementById("terms");
        const usernameError = document.querySelector(".name.error");
        const emailError = document.querySelector(".email.error");
        const passwordError = document.querySelector(".password.error");
        const controlPasswordError = document.querySelector(".password-confirm.error");
        const termError = document.querySelector(".terms.error");

        controlPasswordError.innerHTML = "";
        termError.innerHTML = "";

        if (password !== controlPassword || !term.checked) {
            if (password !== controlPassword)
                controlPasswordError.innerHTML = "Passwords do not match";

            if (!term.checked)
                termError.innerHTML = "Please validate the general conditions";
        } else {
            await axios({
                method: "post",
                url: "/auth/register",
                data: {
                    username,
                    email,
                    password,
                },
            })
                .then((res) => {
                    console.log(res);
                    if (res.data.errors) {
                        usernameError.innerHTML = res.data.errors.username;
                        emailError.innerHTML = res.data.errors.email;
                        passwordError.innerHTML = res.data.errors.password;
                    } else {
                        setFormSubmit(true);
                    }
                })
                .catch((err) => console.log(err));
        }
    };

    return (
        <>
            { formSubmit ? (
                <>
                    <Login />
                    <span></span>
                    <h4 className="success">
                        Registration successful, please login
                    </h4>
                </>
            ) : (
                <>
                    <form action="" onSubmit={handleChange} id="sign-up-form">
                        <label htmlFor="username">Username</label>
                        <br />
                        <input
                            type="text"
                            name="username"
                            id="username"
                            onChange={(e) => setUsername(e.target.value)}
                            value={username}
                        />
                        <div className="name error"></div>
                        <br />
                        <label htmlFor="email">Email</label>
                        <br />
                        <input
                            type="text"
                            name="email"
                            id="email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />
                        <div className="email error"></div>
                        <br />
                        <label htmlFor="password">Password</label>
                        <br />
                        <input
                            type="password"
                            name="password"
                            id="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                        />
                        <div className="password error"></div>
                        <br />
                        <label htmlFor="password-conf">Confirm password</label>
                        <br/>
                        <input
                            type="password"
                            name="password"
                            id="password-conf"
                            onChange={(e) => setControlPassword(e.target.value)}
                            value={controlPassword}
                        />
                        <div className="password-confirm error"></div>
                        <br />
                        <input type="checkbox" id="terms" />
                        <label htmlFor="terms">
                            I accept the{" "}
                            <a href="/" target="_blank" rel="noopener noreferrer">
                                terms and conditions
                            </a>
                        </label>
                        <div className="terms error"></div>
                        <br />
                        <input type="submit" value="Register" />
                    </form>
                </>
            ) }
        </>
    )
}

export default Register
