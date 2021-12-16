import React from 'react'

const Register = () => {
    return (
        <form action="" id="sign-up-form">
            <label htmlFor="username">Username</label>
            <br />
            <input
                type="text"
                name="username"
                id="username"
            />
            <div className="name error"></div>
            <br />
            <label htmlFor="email">Email</label>
            <br />
            <input
                type="text"
                name="email"
                id="email"
            />
            <div className="email error"></div>
            <br />
            <label htmlFor="password">Password</label>
            <br />
            <input
                type="password"
                name="password"
                id="password"
            />
            <div className="password error"></div>
            <br />
            <label htmlFor="password-conf">Confirm password</label>
            <br/>
            <input
                type="password"
                name="password"
                id="password-conf"
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
    )
}

export default Register
