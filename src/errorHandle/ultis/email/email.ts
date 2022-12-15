import nodemailer from "nodemailer";
import opTranspoter from "./interface";

export default async function sendEmail({email , message, subject} : {
    email: string | undefined, message: string, subject: string
}) {
    const transporter = nodemailer.createTransport({
        host: process.env.HOST_MAIL,
        port: 2525,
        secure: false,
        auth: {
            user: process.env.USER_MAIL,
            pass: process.env.PASS_MAIL
        },
    });

    return await transporter.sendMail({
        from: 'Nguyễn Tuấn Thành <thanhjobb@gmail.com>',
        to: email,
        subject: 'Send to mail reset token password! (Invalid for 10 minute)',
        text: message 
    });
};