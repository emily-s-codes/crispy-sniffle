import "./LandingPage.css"
import LoginForm from "../components/LoginForm";
import { useState } from "react";
import ResetPasswordRequestForm from "../components/ResetPasswordRequest";

const LandingPage = () => {
    const [forgotPassword, setForgotPassword] = useState(false)
    return (
        <main className="landingPageMain">
            <h1>welcome</h1>
            {!forgotPassword && <LoginForm setForgotPassword={setForgotPassword} />}
            {forgotPassword && <ResetPasswordRequestForm setForgotPassword={setForgotPassword} />}
        </main>
    );
}

export default LandingPage;