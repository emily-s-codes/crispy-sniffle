import nodemailer from 'nodemailer'
import Handlebars from 'handlebars'
import fs from 'fs'
import path from 'path'

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
        const compiledTemplate = Handlebars.compile(source)

        const options = () => {
            return {
                from: process.env.FROM_EMAIL,
                to: email,
                subject: subject,
                html: compiledTemplate(payload)
            }
        }

        transporter.sendMail(options(), (error, info) => {
            console.log(info)
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
        return error
    }
}