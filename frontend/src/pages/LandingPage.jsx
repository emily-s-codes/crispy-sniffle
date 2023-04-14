import "./LandingPage.css"
import LoginForm from "../components/LoginForm";
import { useState } from "react";
import ResetPasswordForm from "../components/ResetPassword";

const LandingPage = () => {
    const [forgotPassword, setForgotPassword] = useState(false)
    return (
        <main className="landingPageMain">
            <h1>welcome</h1>
            {!forgotPassword && <LoginForm setForgotPassword={setForgotPassword} />}
            {forgotPassword && <ResetPasswordForm setForgotPassword={setForgotPassword} />}
        </main>
    );
}

export default LandingPage;