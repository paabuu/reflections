const net = require('net');
const express = require('express');
const expressWs = require('express-ws');
const request = require('request');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const client = net.Socket();


expressWs(app);
app.use(bodyParser.json());

client.connect(8000, "127.0.0.1", function() {
    console.log('前端连接到服务器');
});

client.on('data', function(data) {
    console.log('前端收到消息', data.toString(), data.toString('hex'));
    // setTimeout(function() {
    //     client.write(Buffer.from([0x4f, 0x4b, 0x0d, 0x0a]));
    // }, 3000);
});

app.get(/\/overcook\/(?!reflection\/.*)/, function(req, res) {
    console.log(req.url);
    req.pipe(request(`http://localhost:5001${req.url}`)).pipe(res);
});

app.post('/overcook/reflection/send_songs', function(req, res) {
    const arr = req.body.data;
    const bufArr = arr.map(str => Buffer.from(str));
    client.write(Buffer.concat(bufArr));    
    console.log('前端发送消息', Buffer.concat(bufArr));
    
    res.json({
        code: 200
    });
});

app.get('/overcook/reflection/test', function(req, res) {
    res.sendFile(path.resolve(__dirname, 'test_tcp.html'))
});

app.get('/overcook/reflection/test-wss', function(req, res) {
    res.sendFile(path.resolve(__dirname, 'index.html'))
});

app.ws('/overcook-wss/reflection', function(ws, req) {
    ws.on('message', function incoming(message) {
        console.log('received: %s', message);
    });

    ws.send('something');
});

const PORT = 5000;

app.listen(PORT, function() {
    console.log(`Server is running on port ${PORT}`)
});