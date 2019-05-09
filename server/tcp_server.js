const net = require('net');

let cacheBuf;
let client; // 

const server = net.createServer((socket) => {
    log(`cacheBuf ${cacheBuf}`);
    client = socket;

    if (cacheBuf) {
        client && client.write(cacheBuf);
        cacheBuf = null;
    }

    socket.on('data', function(buf) {
        log(`data from client" ${buf.toString()}  ${buf.toString('hex')}`)
        const head = Buffer.from([0xAA]);
        const tail = Buffer.from([0xBB]);
        const final = Buffer.concat([head, buf, tail]);
        cacheBuf = final;
        // socket.write(final);
        client && client.write(final);
    });

    socket.on('connect', function() {
        log('connect');
    });

    socket.on('close', function() {
        log('close');
        cacheBuf = null;
        client = null;
    });

    socket.on('timeout', function() {
        log('timeout');
        socket.destroy();
        client.destroy();
    });

    socket.on('error', function(err) {
        log(`error ${err}`);
    });
});

server.on('connection', function(c) {
    log('connection event');
});

server.listen(8000, () => {
    log('create server on port 8000');
});

function log(msg) {
    console.log(`> ${ Date().slice(0, 24) }  ${msg}`);
}

setInterval(() => {
    client && client.write(Buffer.from([0x54, 0x45, 0x53, 0x54]));
}, 60000);