const path = require('path');
const fs = require('fs');

const fetch = require('node-fetch');

const gcmApiKey = process.env.GCM_API_KEY;

const endpoint = require('./endpoint.json');
const id = endpoint.endpoint.replace(new RegExp('^.+?([^/]+)$'), '$1');

fetch(
    'https://android.googleapis.com/gcm/send',
    {
        method: 'POST',
        headers: {
            'Authorization': 'key=' + gcmApiKey,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            registration_ids: [
                id
            ]
        })
    }
).then((res) => {
    return res.json();
}).then((resObj) => {
    if (resObj.results[0].error) {
        console.log('Error:', resObj);
        return;
    }

    console.log('Success:', resObj);
}).catch((err) => {
    console.log('Error:', err);
});