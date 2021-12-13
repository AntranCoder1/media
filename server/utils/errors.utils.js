module.exports.signUpErrors = (err) => {
    let errors = { username: "", email: "", password: "" };

    if (err.message.includes("username"))
        errors.username = "Username incorrect or already taken";
    
    if (err.message.includes("email"))
        errors.email = "Email incorrect";

    if (err.message.includes("password"))
        errors.password = "The password must be 6 characters minimum";

    if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("username"))
        errors.username = "This username is already taken";

    if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("email"))
        errors.email = "This email is already registered";

    return errors
};

module.exports.signInErrors = (err) => {
    let errors = { email: "", password: "" };

    if (err.message.includes("email"))
        errors.email = "Unknown email";

    if (err.message.includes("password"))
        errors.password = "Password does not match";

    return errors;
};