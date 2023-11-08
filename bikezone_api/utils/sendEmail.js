const nodeMailer = require("nodemailer");
const fs = require('fs');
const path = require('path');

const sendEmail = async (options, contentType = 'html') => {
    const transporter = nodeMailer.createTransport({
        // host: process.env.SMTP_HOST,
        // port: process.env.SMTP_PORT,
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        service: process.env.SMTP_SERVICE,
        auth: {
            user: process.env.SMTP_MAIL,
            pass: "hdammbrjnalvzwtg"
        },
    });

    const mailOptions = {
        from: process.env.SMTP_MAIL,
        to: options.email,
        subject: options.subject,
    };

    if (contentType === 'text') {
        mailOptions.text = options.message;
    } else if (contentType === 'html' && options.subject === 'Bikezone Registration') {
        // Load the HTML template and replace placeholders
        const templatePath = path.join(__dirname, 'templates', 'registrationEmail.html');
        const htmlTemplate = fs.readFileSync(templatePath, 'utf-8');
        const replacedHtml = htmlTemplate
            .replace('{{firstname}}', options.firstname)
            .replace('{{lastname}}', options.lastname);

        mailOptions.html = replacedHtml;
    } else if (contentType === 'html' && options.subject === 'Appointment Confirmation') {
        // Load the HTML template and replace placeholders
        const templatePath = path.join(__dirname, 'templates', 'slotConfirmation.html');
        const htmlTemplate = fs.readFileSync(templatePath, 'utf-8');
        const replacedHtml = htmlTemplate
            .replace('{{firstname}}', options.firstname)
            .replace('{{lastname}}', options.lastname)
            .replace('{{slot}}', options.slot)
            .replace('{{timing}}', options.timing)
            .replace('{{day}}', options.day)
            .replace('{{workshopName}}', options.workshopName)
            .replace('{{workshopContact}}', options.workshopContact)
            .replace('{{workshopContactLink}}', options.workshopContactLink)
            .replace('{{bookingSlot}}', options.bookingSlot)
        mailOptions.html = replacedHtml;
    } else if (contentType === 'html' && options.subject === 'OTP Verification') {
        // Load the HTML template and replace placeholders
        const templatePath = path.join(__dirname, 'templates', 'otpVerificarion.html');
        const htmlTemplate = fs.readFileSync(templatePath, 'utf-8');
        const replacedHtml = htmlTemplate
            .replace('{{message}}', options.message)
           

        mailOptions.html = replacedHtml;
    }


    await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;