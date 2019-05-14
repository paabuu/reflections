const net = require('net');
const express = require('express');
const expressWs = require('express-ws');
const request = require('request');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const client = net.Socket();
const db = require('./db');

expressWs(app);
app.use(bodyParser.json());
app.use('/overcook/reflection/assets', express.static('assets'));

client.connect(8000, "127.0.0.1", function() {
    console.log('前端连接到服务器');
});

client.on('data', function(data) {
    console.log('前端收到消息', data.toString(), data.toString('hex'));
});

app.get(/\/overcook\/(?!reflection\/.*)/, function(req, res) {
    console.log(req.url);
    req.pipe(request(`http://localhost:5001${req.url}`)).pipe(res);
});

// 管理后台页面
// app.get('/overcook/reflection/admin/*', function(req, res) {
//     req.pipe(request(`http://localhost:5002${req.url}`)).pipe(res);
// });

// 访问记录
app.post('/overcook/reflection/record', (req, res) => {
    const { data } = req.body;
    db.save(data, () => {
        console.log(`> ${data.time} 新增一条访问记录`);
        res.json({
            meta: {
                code: 200
            }
        });
    });
});

// 发送歌单
app.post('/overcook/reflection/send_songs', function(req, res) {
    const arr = req.body.data;
    const bufArr = arr.map(str => Buffer.from(str));
    client.write(Buffer.concat(bufArr));    
    console.log('前端发送消息', Buffer.concat(bufArr));
    
    res.json({
        code: 200
    });
});
// 临时测试页面
app.get('/overcook/reflection/test', function(req, res) {
    res.sendFile(path.resolve(__dirname, 'test_tcp.html'))
});

app.get('/overcook/reflection/test-wss', function(req, res) {
    res.sendFile(path.resolve(__dirname, 'index.html'))
});

// websocket
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