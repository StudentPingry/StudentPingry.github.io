const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'yourEmail@gmail.com',
        pass: 'yourPassword'
    }
});

app.post('/send-email', (req, res) => {
    const { studentName, requestType, requestDetails } = req.body;

    const mailOptions = {
        from: 'yourEmail@gmail.com',
        to: 'adminEmail@example.com',
        subject: 'New Student Request',
        text: `Student Name: ${studentName}\nRequest Type: ${requestType}\nRequest Details: ${requestDetails}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('Failed to send email');
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send('Email sent successfully');
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
