# Web Push Notifications Example

There is web push notifications example with actions. 

## Table of Contents

1. [Install](#install)
1. [Test server](#test-server)
1. [Send push](#send-push)


## <a name="install"></a>Install
To install the example, run the following commands:
```
$ npm install
```

## <a name="test-server"></a>Test server

- ```node server/server.js``` - run test server

## <a name="tests"></a>Send push

To run tests chose command:
- ```node server/push.js``` - send push notification with fetch API (only for Chrome)
- ```node server/push-with-web-push.js``` - send push notification with web-push package (cross browser way - Chrome, Firefox)
