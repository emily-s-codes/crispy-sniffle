import "./LoginForm.css"
import { useState } from "react";

const LoginForm = ({ setForgotPassword }) => {
    const [isRegistered, setIsRegistered] = useState(true)
    return (
        <section className="loginFormSection">
            <section className="inputFieldsSection">
                {!isRegistered && <input type="text" placeholder="first name" />}
                {!isRegistered && <input type="text" placeholder="last name" />}
                <input type="email" placeholder="email address" />
                <input type="password" placeholder="password" />
            </section>
            <button>{isRegistered ? "Log In" : "Register"}</button>
            <p className="loginFormClickableText" onClick={() => setIsRegistered(prev => !prev)}>{isRegistered ? "Click here to register for a new account." : "Already have an account? Click here to log in."}</p>
            {isRegistered && <p className="loginFormClickableText" onClick={() => setForgotPassword(prev => !prev)}>Forgot your password?</p>}
        </section>
    );
}

export default LoginForm;