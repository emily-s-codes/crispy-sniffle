import { useState } from "react";
import "./ResetPasswordRequest.css"

const ResetPasswordRequestForm = ({ setForgotPassword }) => {
    const [sentRequest, setSentRequest] = useState(false)
    const [resetFailed, setResetFailed] = useState(false)

    const reset = async (e) => {
        e.preventDefault()
        const form = new FormData(e.target)

        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/auth/requestResetPassword`, {
            method: 'POST',
            credentials: 'include',
            body: form
        })

        if (response.ok) {
            console.log('password reset link sent')
            setResetFailed(false)
            setSentRequest(prev => !prev)
            setTimeout(() => {
                setForgotPassword(false)
            }, 5000)
        } else {
            setSentRequest(false)
            setResetFailed(true)
        }
    }

    return (
        <section className="resetPasswordForm">
            {!sentRequest &&
                <form onSubmit={reset}>
                    <h3>reset password</h3>
                    <input className="passwordFieldInput" name="email" type="email" placeholder="email" />
                    <button type="submit">Send Password Reset Link</button>
                </form>}
            {resetFailed && <p>There was a problem with your request. Please check that you have correctly entered your email address and try again.</p>}
            {sentRequest && <>
                <p>Your password reset request has been sent. If your email address is associated with an account, you will receive a link to reset your password.</p>
                <p className="loginFormClickableText" onClick={() => setForgotPassword(false)}>You will be redirected to the login page shortly; or you can click here.</p>
            </>}
        </section>
    );
}

export default ResetPasswordRequestForm;