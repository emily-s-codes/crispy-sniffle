import { useState } from "react";
import "./ResetPassword.css"

const ResetPasswordForm = ({ setForgotPassword }) => {
    const [sentRequest, setSentRequest] = useState(false)
    return (
        <section className="resetPasswordForm">
            {!sentRequest && <>
                <h3>reset password</h3>
                <input type="email" placeholder="email" />
                <button onClick={() => setSentRequest(prev => !prev)}>Send Password Reset Link</button>
            </>}
            {sentRequest && <>
                <p>Your password reset request has been sent. If your email address is associated with an account, you will received a link to reset your password.</p>
                <p className="loginFormClickableText" onClick={() => setForgotPassword(false)}>Home</p>
            </>}
        </section>
    );
}

export default ResetPasswordForm;