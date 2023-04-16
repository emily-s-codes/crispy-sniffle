import { requestPasswordReset, resetPassword, signin, signup } from "../services/auth.service.js";


export const signUpController = async (req, res) => {
    const signupService = await signup(req.body);
    return res.json(signupService);
};

export const signInController = async (req, res) => {
    const signinService = await signin(req.body)
    return res.json(signinService);
};

export const resetPasswordRequestController = async (req, res) => {
    console.log(req.body)
    const requestPasswordResetService = await requestPasswordReset(
        req.body.email
    );
    return res.json(requestPasswordResetService);
};

export const resetPasswordController = async (req, res) => {
    const resetPasswordService = await resetPassword(
        req.body.userId,
        req.body.token,
        req.body.password
    );
    return res.json(resetPasswordService);
};