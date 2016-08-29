console.log('Listen "push"');
addEventListener('push', function(event) {
    console.log('Received a push message', event);

    const notificationData = event.data? event.data.json(): {
        title: 'Title from event without payload!',
        body: 'Body from event without payload!',
        icon: 'http://www.iconres.com/android/res/material_icons/external-assets/v4/icons/png/ic_star_border_black_48dp.png'
    };

    console.log('Notification data', notificationData);

    event.waitUntil(
        registration.showNotification(notificationData.title, {
            body: notificationData.body,
            icon: notificationData.icon,
            requireInteraction: true,
            tag: 'sample-tag',
            vibrate: [300, 100, 400],
            actions: [
                {
                    action: 'action-name',
                    title: 'Action Title',
                    icon: 'http://truepundit.com/wp-content/uploads/2016/06/cropped-True-Pundit-Icon.fw_-192x192.png'
                }
            ]
        })
    );
});

console.log('Listen "notificationclick"');
addEventListener('notificationclick', (event) => {
    console.log('On notification click', event.notification.tag);
    event.notification.close();

    // This looks to see if the current is already open and
    // focuses if it is
    event.waitUntil(clients.matchAll({
        type: 'window'
    }).then(function(clientList) {
        console.log(`Found ${clientList.length} client(s):`, clientList.map(c => c.url));
        for (let client of clientList) {
            if ('focus' in client) {
                return client.focus();
            }
        }
        
        if (clients.openWindow) {
            const action = event.action? '?action=' + event.action: '';
            return clients.openWindow('/' + action);
        }
    }));
});