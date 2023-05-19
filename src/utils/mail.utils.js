import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

export const smtpTransport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST, 
    port: process.env.EMAIL_PORT,
    secure: true,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
    }
});

