const webPush = require('web-push');

webPush.setGCMAPIKey(process.env.GCM_API_KEY);

const endpoint = require('./endpoint.json');

webPush.sendNotification(endpoint.endpoint, {
    TTL: 2 * 7 * 24 * 60  * 60 /* 2 weeks */,
    payload: JSON.stringify({
        title: 'My Title!',
        body: 'My Body!!!',
        icon: 'http://www.iconres.com/android/res/material_icons/external-assets/v4/icons/png/ic_star_border_black_48dp.png'
    }),
    userPublicKey: endpoint.userPublicKey,
    userAuth: endpoint.userAuthSecret
});