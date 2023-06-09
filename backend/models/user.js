import mongoose from "mongoose";
import bcrypt from 'bcrypt'

const { Schema, model } = mongoose
const bcryptSalt = process.env.BCRYPT_SALT

const userSchema = new Schema({
    firstName: {
        type: String,
        // trim: true,
        required: true,
        // unique: true I FIND THIS UNNECESSARY
    },
    lastName: {
        type: String,
        // trim: true,
        required: false,
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },
    password: { type: String }
},
    { timestamps: true })

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next()
    }
    const hash = await bcrypt.hash(this.password, Number(bcryptSalt))
    this.password = hash
    next()
})

const User = model('user', userSchema)
export default User