const net = require('net');
const uuid = require('uuid/v4');
let cacheBuf; // 缓存的数据，连接断开保存下来，恢复后重新发送
let client; // 最新加入的设备
let throttle = false; // 节流
let sockets = [];

const server = net.createServer((socket) => {
    log(`cacheBuf ${cacheBuf}`);
    // client = socket;
    // socket.push(socket);
    socket.id = uuid();
    sockets.push(socket);

    if (cacheBuf) {
        // client && client.write(cacheBuf);
        push(cacheBuf);
        cacheBuf = null;
    }

    socket.on('data', function(buf) {
        log(`data from client" ${buf.toString()}  ${buf.toString('hex')}`)
        const sendSongsToClient = () => {
            const head = Buffer.from([0xAA]);
            const tail = Buffer.from([0xBB]);
            const final = Buffer.concat([head, buf, tail]);
            cacheBuf = final;
            // client && client.write(final);
            push(final);
            log('已发送歌单');
        };

        if (throttle) {
            setTimeout(() => {
                sendSongsToClient();
                throttle = false;
            }, 2000);
        } else {
            throttle = true;
            sendSongsToClient();
            setTimeout(() => {
                throttle = false;
            }, 1000);
        }
    });

    socket.on('connect', function() {
        log('connect');
    });

    socket.on('close', function() {
        log('close');
        cacheBuf = null;
        // client = null;
        sockets = sockets.filter(s => s.id !== socket.id);
        log(`sockets length: ${sockets.length}`)
    });

    socket.on('timeout', function() {
        log('timeout');
        sockets = sockets.filter(s => s.id !== socket.id);
        socket.destroy();
        // client.destroy();
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
    if (throttle) {
        setTimeout(() => {
            // client && client.write(Buffer.from([0x54, 0x45, 0x53, 0x54]));
            push(Buffer.from([0x54, 0x45, 0x53, 0x54]));
            throttle = false;
        }, 2000);
    } else {
        // client && client.write(Buffer.from([0x54, 0x45, 0x53, 0x54]));
        push(Buffer.from([0x54, 0x45, 0x53, 0x54]));
        throttle = true;
        setTimeout(() => {
            throttle = false;
        }, 1000);
    }
}, 60000);

function push(data) {
    log(`共${sockets.length}个socket`);
    sockets.forEach(s => {
        try {
            s.write(data);
        } catch (e) {
            log(`${s.id}推送时出错了`)
        }
    });
}