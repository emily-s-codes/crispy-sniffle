import { useNavigate } from "react-router-dom";
import "./LoginForm.css"
import { useState } from "react";

const LoginForm = ({ setForgotPassword }) => {
    const [isRegistered, setIsRegistered] = useState(true)
    const nav = useNavigate()

    const sendAuth = async (e) => {
        e.preventDefault()
        const form = new FormData(e.target)

        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/auth/${isRegistered ? 'signin' : 'signup'}`, {
            method: 'POST',
            credentials: 'include',
            body: form
        })
        if (response.ok) {
            isRegistered ? nav('/dashboard') : setIsRegistered(true)
        }
        else {
            throw new Error('error with registration or login')
        }
    }

    return (
        <form onSubmit={sendAuth} className="loginFormSection">
            <section className="inputFieldsSection">
                {!isRegistered && <input className="passwordFieldInput" type="text" name='firstName' placeholder="first name" />}
                {!isRegistered && <input className="passwordFieldInput" type="text" name='lastName' placeholder="last name" />}
                <input className="passwordFieldInput" type="email" name='email' placeholder="email address" />
                <input className="passwordFieldInput" type="password" name='password' placeholder="password" />
            </section>
            <button type="submit">{isRegistered ? "Log In" : "Register"}</button>
            <p className="loginFormClickableText" onClick={() => setIsRegistered(prev => !prev)}>{isRegistered ? "Click here to register for a new account." : "Already have an account? Click here to log in."}</p>
            {isRegistered && <p className="loginFormClickableText" onClick={() => setForgotPassword(prev => !prev)}>Forgot your password?</p>}
        </form>
    );
}

export default LoginForm;