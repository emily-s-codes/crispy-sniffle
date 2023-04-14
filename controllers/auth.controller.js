import { requestPasswordReset, resetPassword, signup } from "../services/auth.service.js";


export const signUpController = async (req, res) => {
    const signupService = await signup(req.body);
    return res.json(signupService);
};

export const resetPasswordRequestController = async (req, res) => {
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