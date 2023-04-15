import { useLocation, useParams } from "react-router-dom";
import "./ResetPassword.css"
import { useEffect, useState } from "react";

const ResetPasswordPage = () => {
    const location = useLocation()
    const [token, setToken] = useState(null)
    const [id, setId] = useState(null)
    const [resetSent, setResetSent] = useState(false)
    const [resetUnsuccessful, setResetUnsuccessful] = useState(false)

    useEffect(() => {
        const params = new URLSearchParams(location.search)
        setToken(params.get('token'))
        setId(params.get('id'))
    }, [location])

    return (
        <main className="resetPasswordPageMain">
            <h1>enter your new password</h1>
            <form className="newPasswordForm">
                {!resetSent && !resetUnsuccessful && <>
                    <input className="newPasswordInput" type="password" placeholder="new password" />
                    <input className="newPasswordInput" type="password" placeholder="confirm new password" />
                    <button>Confirm Password Reset</button>
                </>}
                {resetUnsuccessful && <p>There was a problem resetting your password. Please try again.</p>}
                {resetSent && <>
                    <p>Your password has been reset. You will receive a confirmation email.</p>
                </>}
            </form>
        </main >
    );
}

export default ResetPasswordPage;