const net = require('net');

const server = net.createServer((socket) => {
    console.log('someone connected!');
    // setInterval(function() {
    //     const buf1 = Buffer.from('0A');
    //     const buf2 = Buffer.from('1C');
    //     const aa = Buffer.from([0xAA]);
    //     const bb = Buffer.from([0xBB]);
    //     const data = Buffer.concat([aa, buf1, buf2, bb]);
    //     socket.write(data);
    // }, 1000);

    socket.on('data', function(buf) {
        console.log('data from client', buf.toString(), buf.toString('hex'));
        const signal = buf.toString('hex');
        if (signal == '4f4b0d0a') {
            console.log('client receive success!');
        } else {
            const head = Buffer.from([0xAA]);
            const tail = Buffer.from([0xBB]);
            socket.write(Buffer.concat([head, buf, tail]));
        }
    });

    socket.on('error', function(err) {
        console.log(err);
    });
});

server.listen(8000, () => {
    console.log('create server on port 8000')
});