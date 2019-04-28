const net = require('net');
const express = require('express');
const expressWs = require('express-ws');
const request = require('request');
const path = require('path');
const app = express();
const WebSocket = require('ws');
const client = net.Socket();

expressWs(app);

client.connect(8001, "127.0.0.1", function() {
    console.log('connect server');
});

client.on('data', function(data) {
    console.log('data from server', data.toString(), data.toString('hex'));
    setTimeout(function() {
        client.write(Buffer.from([0x4f, 0x4b, 0x0d, 0x0a]));
    }, 3000);
});

app.get(/\/overcook\/(?!reflection\/.*)/, function(req, res) {
    console.log(req.url);
    req.pipe(request(`http://localhost:5001${req.url}`)).pipe(res);
});

app.get('/overcook/reflection/send_songs', function() {
    const arr = ['0A', '1C', '30', '4Z'];
    const bufArr = arr.map(str => Buffer.from(str));
    client.write(Buffer.concat(bufArr));
});

app.get('/overcook/reflection/test-wss', function(req, res) {
    res.sendFile(path.resolve(__dirname, 'index.html'))
});

app.ws('/overcook/reflection/wss', function(ws, req) {
    ws.on('message', function incoming(message) {
        console.log('received: %s', message);
    });

    ws.send('something');
});

const PORT = 5000;

app.listen(PORT, function() {
    console.log(`Server is running on port ${PORT}`)
});