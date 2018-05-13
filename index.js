const express = require('express');
const bodyparser = require('body-parser');

const mailer = require('./mailer');



const app = express();
const port = process.env.PORT || 3000;
const transporter = mailer.transporter;

app.use(bodyparser.json()); //set bodyparser middleware for parsing incoming json data into a JavaScript object

app.post('/api/mailer', (req, res)=>{

    const sendTo = req.body.sendTo; // expects a "sendTo" property in the request body

    if(typeof sendTo !== 'string' || !sendTo){ // error handler 
        const error = new Error('invalid input')
        return res.status(400).send(error.message);
    }

    mailOptions = {
        from: 'User <user@gmail.com>', // sender's email
        to: sendTo,                                // recipient email
        subject: 'Testing nodemailer',
        text: "This is an automatic mail. Sent from nodejs server!"
    }
    
    transporter.sendMail(mailOptions, (error, info)=>{
        if(error){ // if something goes wrong we send back a 500 status response
            res.status(500).send(error.message)
        } else{    // if everything goes well we send back a 200 status response
            res.status(200).send(`Email sent: ${info.response}`);
        }
    });
});


app.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
});