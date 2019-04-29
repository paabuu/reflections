const net = require('net');

let cacheBuf;
let client; // 

const server = net.createServer((socket) => {
    console.log('cacheBuf', cacheBuf);
    client = socket;

    if (cacheBuf) {
        client && client.write(cacheBuf);
        cacheBuf = null;
    }

    socket.on('data', function(buf) {
        console.log('data from client', buf.toString(), buf.toString('hex'));
        const head = Buffer.from([0xAA]);
        const tail = Buffer.from([0xBB]);
        const final = Buffer.concat([head, buf, tail]);
        cacheBuf = final;
        // socket.write(final);
        client && client.write(final);
    });

    socket.on('connect', function() {
        console.log('connected')
    });

    socket.on('close', function() {
        console.log('close');
        cacheBuf = null;
        client = null;
    });

    socket.on('error', function(err) {
        console.log('error', err);
    });
});

server.on('connection', function(c) {
    console.log('connection event');
});

server.listen(8000, () => {
    console.log('create server on port 8000')
});