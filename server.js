const express = require('express');
const app = express();
const path = require('path');


app.use(express.static(__dirname + '/dist/angular-fcm-push-notification'));

app.listen(process.env.PORT || 8080);

//pathLocationStrategy

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/angular-fcm-push-notification/index.html'));
});

console.log('console listening');