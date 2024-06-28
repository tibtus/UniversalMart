const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5050;

app.use(cors());
app.use(bodyParser.json());

let transporter = nodemailer.createTransport({
    host: 'smtp.ukr.net',
    port: 465,
    secure: true,
    auth: {
        user: 'tibtus@ukr.net',
        // pass: ''
    },
    logger: true,
    debug: true
});

app.post('/send', async (req, res) => {
    const {to, subject, text} = req.body;

    if (typeof text !== 'string') {
        return res.status(400).send('Invalid "text" format');
    }

    let mailOptions = {
        from: 'tibtus@ukr.net',
        to,
        subject,
        text
    };

    try {
        let info = await transporter.sendMail(mailOptions);
        res.status(200).send('Email sent: ' + info.response);
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send('Error sending email: ' + error.toString());
    }
});

app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).send('Server error');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
