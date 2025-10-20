"use server"

import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { promisify } from "util";
const fs = require('fs');
// import dateFormat from "dateformat";

const readFile = promisify(fs.readFile);

export async function POST(req: Request){

    const {email} = await req.json();

    // Create a transporter for SMTP
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.NODEMAILER_GOOGLE_APP_USER,
            pass: process.env.NODEMAILER_GOOGLE_APP_PASSWORD,
        },
    });

    await transporter.verify();
    console.log("Server is ready to take our messages");

    // (async () => {
        try {
            const info = await transporter.sendMail({
                from: '"SPACEMATCH PROPERTIES LTD" <noreply@spacematch.com.ng>', // sender address
                to: email, // list of receivers
                subject: `Password Reset`, // Subject line
                text: `Hello there,`, // plain text body
                html: `
                        <!DOCTYPE html>
                        <html lang="en">
                        <head>
                            <meta charset="UTF-8">
                            <meta name="viewport" content="width=device-width, initial-scale=1.0">
                            <title>Document</title>
                            <link rel="stylesheet" href="style.css">
                        </head>
                        <body>
                            <h4>Dear Esteemed Partner,</h4>

                            This email is to provide you with access to reset your password. Kindly click the link below to reset your password.<br/>
                            <a href="http://127.0.0.1:3000/forgot-password/${email}">Proceed to reset password</a><br/><br/>

                            Best regards,<br/><br/>
                            Administrator.<br/>
                            SPACEMATCH PROPERTIES LTD., <br/>
                            +234 810 0000 0000<br/><br/>
                        </body>
                        </html>
                `, // html body
            });

            return NextResponse.json({
                    status: 200,
                    "Message sent: %s": info.messageId,
                    "Preview URL: %s": nodemailer.getTestMessageUrl(info)
                })
        } catch (err) {
            console.log(err);
            return NextResponse.json(
                {"Error while sending mail": err}
            );
        }
    // })();
}