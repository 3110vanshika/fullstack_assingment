const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: process.env.SERVICE,
    host: process.env.HOST,
    port: process.env.EMAIL_PORT,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
    tls:{
        rejectUnauthorized: true
    }
});

const sendEmail = async(email, text) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "OTP to verify your email address",
        text: text,
    }
    try {
        await transporter.sendMail(mailOptions);
        console.log("Email send successfully");
    } catch (error) {
        console.log("Error in sending email:", error);
    }
}

module.exports = {sendEmail}