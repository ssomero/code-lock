const _ = require('lodash');
const cors = require('cors');
const express = require('express');
const app = express();

app.use(cors());
app.use(express.json());

let code = "";

app.post('/codecheck', function (req, res) {
    if (req.body.length === 0 || !req.body.code) {
        return res.send('please add code');
    }
    if (!code) {
        if (req.body.code.length === 4) {
            code = req.body.code;
            return res.send({ locked: true }).end();
        } else {
            return res.send('code must be 4 digits').end();
        }
    } else {
        if (req.body.code === code) {
            code = "";
            return res.send({ locked: false }).end();
        } else {
            return res.send({ locked: true }).end();
        }
    }
});

app.listen(process.env.PORT || 8080);