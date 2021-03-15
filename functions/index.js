const functions = require("firebase-functions");
const express = require('express');
const admin = require("firebase-admin");

const app = express();
// const plcbox = require("./plcbox.json");
const basicMessenger = require("./basic-messenger.json");

var plcboxFunc = admin.initializeApp();

var bsicMessFunc = admin.initializeApp({
    credential: admin.credential.cert(basicMessenger),
    databaseURL: "https://plcbox.firebaseio.com"
},
'second'
);

app.post('/greeting', (req, res) => {
    res.send("Hello, my name's Đăng, post")
})

app.post('/register', (req, res) => {
    if(req.body.project == "plcboxFunc") {
        plcboxFunc.auth().createUser({
            email: req.body.email,
            password: req.body.password
        })
            .then((userRecord) => {
                res.send(userRecord)
            })
            .catch((error) => {
                res.send(error)
            });
    }else if(req.body.project == "bsicMessFunc") {
        bsicMessFunc.auth().createUser({
            email: req.body.email,
            password: req.body.password
        })
            .then((userRecord) => {
                res.send(userRecord)
            })
            .catch((error) => {
                res.send(error)
            });
    }
})

exports.app = functions.https.onRequest(app);
