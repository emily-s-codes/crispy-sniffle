import nodemailer from 'nodemailer'
import Handlebars from 'handlebars'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url';

const _filename = fileURLToPath(import.meta.url)
const _dirname = path.dirname(_filename)

export const sendEmail = async (email, subject, payload, template) => {
    console.log('sending email')
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD
            }
        })

        const source = fs.readFileSync(path.join(_dirname, template), "utf8")
        console.log(source)
        const compiledTemplate = Handlebars.compile(source)

        const message = {
            from: process.env.FROM_EMAIL,
            to: email,
            subject: subject,
            html: compiledTemplate(payload)
        }


        transporter.sendMail(message, (error, _) => {
            if (error) {
                return error
            } else {
                console.log('email sent')
                return res.status(200).json({
                    success: true
                })
            }
        })

    } catch (error) {
        console.log(error.message)
        return error
    }
}