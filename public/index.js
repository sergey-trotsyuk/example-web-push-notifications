if ('PushManager' in window && 'serviceWorker' in navigator) {
    // register service worker

    navigator.serviceWorker.register(
        '/sw.js',
        {
            scope: '/'
        }
    ).then((reg) => {
        if (reg.installing) {
            console.log('Service worker installing');
        } else if (reg.waiting) {
            console.log('Service worker installed');
        } else if (reg.active) {
            console.log('Service worker active');
        }
    }).catch((error) => {
        // registration failed
        console.log('Registration failed with ' + error);
    });


    const sendSubscriptionToServer = (subscription) => {
        const rawKey = subscription.getKey ? subscription.getKey('p256dh') : '';
        const userPublicKey = rawKey
            ? btoa(String.fromCharCode.apply(null, new Uint8Array(rawKey)))
            : '';

        const rawAuthSecret = subscription.getKey ? subscription.getKey('auth') : '';
        const userAuthSecret = rawAuthSecret
            ? btoa(String.fromCharCode.apply(null, new Uint8Array(rawAuthSecret)))
            : '';

        const endpoint = subscription.endpoint;

        const subscriptionData = {
            endpoint,
            userPublicKey,
            userAuthSecret
        };
        console.log('Save subscribtion data to server:', subscription.endpoint);

        fetch(
            '/save-registration-id',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(subscriptionData)
            }
        );
    };


    const init = () => {
        console.log('Init push notification...');

        navigator.serviceWorker.ready.then((serviceWorkerRegistration) => {
            console.log('Service worker ready...');

            serviceWorkerRegistration.pushManager.getSubscription()
                .then((subscription) => {
                    if (!subscription) {
                        console.log('Not subscribed push notification yet');
                        return;
                    }

                    console.log('Already subscribed to push notification');

                    sendSubscriptionToServer(subscription);
                })
                .catch((err) => {
                    console.warn('Error during getSubscription()', err);
                });
        });

    };

    const subscribe = () => {
        console.log('Subscribe to push notification...');

        navigator.serviceWorker.ready.then((serviceWorkerRegistration) => {

            console.log('Service worker ready...');

            // Already subscribed?
            serviceWorkerRegistration.pushManager.subscribe({
                userVisibleOnly: true
            }).then((subscription) => {
                if (!subscription) {
                    console.log('Already subscribed to push notification');
                }

                console.log('Subscribed to push notification', subscription);

                sendSubscriptionToServer(subscription);
            })
            .catch((err) => {
                console.warn('Error during subscribe()', err);
            });
        });
    };

    document.getElementsByClassName('subscribe')[0].addEventListener('click', () => {
        subscribe();
    });

    init();
}


