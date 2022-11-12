require("dotenv").config();
var express = require('express');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');

var app = express();
var port = 9887;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.post('/mail', function(req, res){

    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL_SENDER,
            pass: process.env.PASSWORD
        }
    });

    var html = `<h1>Olá! ${req.body.name}(${req.body.from}) lhe enviou a mensagem: ${req.body.message} </h1>`;
    
    var mailOptions = {
        from: `${req.body.from}`,
        to: process.env.EMAIL_TO,
        subject: `${req.body.subject}`,
        html: html
    };


    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            res.json({yo: 'error'});
        }else{
            res.json({yo: info.response});
        };
    });
});

app.listen(port, function(req, res){
    console.log('Listening on: ', port);
})