require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// Endpoint to send emergency message
app.post('/send-emergency-message', (req, res) => {
    const { message, phoneNumber } = req.body;

    if (!message || !phoneNumber) {
        return res.status(400).send('Message and phone number are required.');
    }

    client.messages
        .create({
            body: message,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: "+919381534195" 
        })
        .then(() => res.send('Emergency message sent!'))
        .catch((err) => res.status(500).send(err));
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
