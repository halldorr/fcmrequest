const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
// Automatically allow cross-origin requests
app.use(cors({ origin: true }));

app.post("/", async (req, res) => {
    try {
        let resp = await axios.post("https://fcm.googleapis.com/fcm/send", req.body, {
            headers: {
                authorization: "Bearer " + req.body.serverId,
                "content-type": "application/json"
            }
        });
        res.status(200).json(resp.data)
    } catch (error) {
        res.status(400).send(error);
    }
});
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.sendCloudMessage = functions.https.onRequest(app);
