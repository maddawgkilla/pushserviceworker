const express = require("express");
const webpush = require("web-push");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, '/client')));

app.use(bodyParser.json());

const publicVapidKey = 'BL9VMWM64kvKX_VH3RJHKQ9MHpevF_w0ZDX4mQOt2n6wfJnVJahy5W6vdlFOWcdI3M6_yikn-Lh_p0sTShq4s6I';
const privateVapidKey = "mVViBU_b6EKxcc9bReY3fuoMZFFsEt_6nVn2OZPM4k8";

webpush.setVapidDetails('mailto:test@test.com', publicVapidKey, privateVapidKey);

// Subscribe Route
app.post('/subscribe', (req,res) => {
    // Get pushSubscription object
    const subscription = req.body;
    // Send 201 Status - Resource Created
    res.status(201).json({});

    // Create Payload
    const payload = JSON.stringify({title: 'Sending to Waleed'});

    // Pass object into the sendNotification function
    webpush.sendNotification(subscription, payload).catch(err => console.log(err));
});

const port = 5000;

app.listen(port, () => {
    console.log("Server started on port "+port); 
});