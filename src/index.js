
const fs = require("fs");
const express = require("express");
const bodyParser = require("body-parser");
const hash = require("object-hash");
const justify = require("./justifyText");
const app = express();

app.use(bodyParser.text());

app.post('/api/justify', (req, res) => {
    const reqText = req.body;
    if (req.headers['content-type'] === "text/plain;charset=UTF-8") {
        fs.readFile('./database', (err, data) => {
            const token = req.headers['token'];
            let json = JSON.parse(data.toString());
            const user = json.findIndex(i => i.token === token);
            if (json[user].length !== -1) {
                if (json[user].words.date === Math.round(Date.now()/(1000*60*60*24)) && json[user].words.count >= 600) {
                    res.status(402).send('402 Payment Required');
                    return;
                } else {
                    if (json[user].words.date === Math.round(Date.now()/(1000*60*60*24))) {
                        json[user].words.count += reqText.split(" ").map((i) => i.trim()).filter(i => i !== "").length;
                    } else {
                        json[user].words.date = Math.round(Date.now()/(1000*60*60*24));
                        json[user].words.count = reqText.split(" ").map((i) => i.trim()).filter(i => i !== "").length;
                    }
                    fs.writeFile('./database', JSON.stringify(json), 'utf8', () => {
                        res.setHeader('content-type', 'text/plain');
                        res.send(justify(reqText));
                    });
                }
            } else {
                res.setHeader('content-type', 'text/plain');
                res.send("token missing");
            }
        });
    }
});

app.get('/api/token', (req, res) => {
    res.send("yoww");
})

app.post('/api/token', (req, res) => {
    const { email } = JSON.parse(req.body);
    res.setHeader('content-type', 'text/plain');
    fs.readFile('./database', (err, data) => {
        try {
            const token = hash(email);
            if (!data) {
                fs.writeFile('./database', JSON.stringify([{ token, registerDate: Date.now(), words: { count: 0, date: Math.round(Date.now()/(1000*60*60*24)) } }]), 'utf8', (err, data) => {
                    res.send(JSON.stringify({ token }));
                });
            } else {
                const json = JSON.parse(data.toString());
                if (json.findIndex((i) => i.token === hash(email)) === -1) {
                    fs.writeFile('./database', JSON.stringify([...json, { token, registerDate: Date.now(), words: { count: 0, date: Math.round(Date.now()/(1000*60*60*24)) } }]), 'utf8', (err, data) => {
                        res.send(JSON.stringify({ token }));
                    });
                } else
                    res.send("already exists");
            }
        } catch {
            res.send("wrong format");
            return;
        }
    });
});

app.listen(5000, () => {
    console.log("server is launched on :5000 myman");
});