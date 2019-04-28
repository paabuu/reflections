const net = require('net');
const express = require('express');
const request = require('request');
const app = express();
const client = net.Socket();

client.connect(8000, "127.0.0.1", function() {
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

const PORT = 5000;

app.listen(PORT, function() {
    console.log(`Server is running on port ${PORT}`)
});