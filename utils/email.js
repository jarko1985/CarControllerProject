const nodemailer  = require('nodemailer');

const sendEmail = async options => {
    const transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 25,
    auth: {
        user:"35a0b00d113f9e",
        pass:"4534189f5430e1"
    }
    });

    const mailOptions = {
        from:'Hassan Jarko <hassan@yahoo.com>',
        to: options.email,
        subject:options.subject,
        text:options.message
    };


  await  transporter.sendEmail(mailOptions)
}


module.exports = sendEmail;