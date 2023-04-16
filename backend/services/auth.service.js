import JWT from 'jsonwebtoken'
import crypto from 'crypto'
import bcrypt from 'bcrypt'

import User from '../models/user.js'
import Token from '../models/token.js'
import { sendEmail } from '../utils/emails/sendEmail.js'

const JWTSecret = process.env.JWT_SECRET
const bcryptSalt = process.env.BCRYPT_SALT
const clientURL = process.env.CLIENT_URL

export const signup = async (data) => {
    let user = await User.findOne({ email: data.email })
    if (user) {
        throw new Error("Email already exists")
    }
    user = new User(data)
    const token = JWT.sign({ id: user._id }, JWTSecret)
    await user.save()
    return (data = {
        userId: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        token: token
    })
}
export const signin = async (data) => {
    let user = await User.findOne({ email: data.email })
    if (user.password = data.password) {
        return user
    }
    else throw new Error('problem with sign in ')
}

export const requestPasswordReset = async (email) => {
    const dbUser = await User.findOne({ email })

    if (!dbUser) throw new Error("Email does not exist")

    let token = await Token.findOne({ userId: dbUser._id })
    if (token) await token.deleteOne()

    let resetToken = crypto.randomBytes(32).toString("hex")

    const hash = await bcrypt.hash(resetToken, Number(bcryptSalt))

    await new Token({
        userId: dbUser._id,
        token: hash,
        createdAt: Date.now()
    }).save()
    console.log('dbuser', dbUser.firstName)
    const link = `${clientURL}/passwordReset?token=${resetToken}&id=${dbUser._id}`

    sendEmail(
        dbUser.email,
        "Password Reset Request",
        { name: dbUser.firstName, link: link },
        "./template/requestResetPassword.handlebars")
    return link
}

export const resetPassword = async (userId, token, password) => {
    let passwordResetToken = await Token.findOne({ userId })

    if (!passwordResetToken) {
        throw new Error("Invalid or expired password reset token")
    }

    console.log(requestPasswordReset.token, token)

    const isValid = await bcrypt.compare(token, passwordResetToken.token)

    if (!isValid) {
        throw new Error("Invalid or expired password reset token")
    }

    const hash = await bcrypt.hash(password, Number(bcryptSalt))

    await User.updateOne(
        { _id: userId },
        { $set: { password: hash } },
        { new: true }
    )

    const user = await User.findById({ _id: userId })

    sendEmail(
        user.email,
        "Password successfully reset",
        { name: user.name },
        "./template/resetPassword.handlebars"
    )

    await passwordResetToken.deleteOne()

    return { message: "Password reset was successful" }
}