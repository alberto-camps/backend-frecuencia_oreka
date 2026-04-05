require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,       
    port: process.env.EMAIL_PORT,       
    secure: false,                      
    auth: {
        user: process.env.EMAIL_USER,   
        pass: process.env.EMAIL_PASS 
    }
});

const sendEmail = async ({name, email, phone, message}) => {
    const mailOptions = {
        from: email,                     
        to: process.env.EMAIL_RECEIVER,
        subject: `Nuevo mensaje de ${name}`,
        html: `
            <h3>Nuevo mensaje de contacto</h3>
            <p><strong>Nombre:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Teléfono:</strong> ${phone}</p>
            <p><strong>Mensaje:</strong> ${message}</p>
        `
    };

    await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;