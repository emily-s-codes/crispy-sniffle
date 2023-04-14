import mongoose from "mongoose";

let DB_URL = process.env.DB_URL

export const connection = async () => {
    try {
        await mongoose.connect(DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            autoIndex: true
        }
        )
    } catch (error) { console.log(error.message) }
}