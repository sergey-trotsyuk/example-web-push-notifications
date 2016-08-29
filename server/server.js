const fs = require('fs');
const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use('/', express.static(path.resolve(__dirname, '..', 'public')));
app.use(bodyParser.json());

app.post('/save-registration-id', (req, res) => {
    res.setHeader('Content-Type', 'text/plain');

    const endpoint = req.body;

    if (endpoint) {
        fs.writeFile(path.resolve(__dirname, 'endpoint.json'), JSON.stringify(req.body), (err) => {
            if (err) {
                res.send('Not Saved! ' + JSON.stringify(req.body));
                return;
            }

            res.send('Saved! ' + JSON.stringify(req.body));
        });
    } else {
        res.send('Not Saved! ' + JSON.stringify(req.body));
    }
});

app.listen(3000, () => {
    console.log('Push app listening on port 3000!');
});