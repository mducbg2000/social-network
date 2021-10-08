const nodemailer = require('nodemailer');
require('dotenv').config()

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.USER,
        pass: process.env.PASS
    }
})

module.exports = {
    sendMail: (toMail, param) => {
        try {
            let host = `http://localhost:${process.env.PORT}`;
            if (process.env.NODE_ENV === 'production') host = 'https://bk-social-network.herokuapp.com'
            const link = host + '/changePwd/' + param;
            const mailOption = {
                from: process.env.USER,
                to: toMail,
                subject: 'Reset password',
                html: '<a href="' + link + '">Click here to reset password</a>'
            }
            transporter.sendMail(mailOption);
        } catch (e) {
            throw e
        }

    }
}


