const express = require('express');
const next = require('next');
const cors = require('cors');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const db = require('./db');

app
    .prepare()
    .then(() => {
        const server = express();
        server.use(cors());
        server.get('/api/records', (req, res) => {
            db.getAllRecords((err, data) => {
                if (err) {
                    console.log(err)
                    res.json({
                        meta: {
                            code: 400,
                            errorMessage: err
                        }
                    });
                } else {
                    // console.log(data, 'data');
                    res.json({
                        meta: {
                            code: 200
                        },
                        data
                    });
                }
            });
        });

        server.get('*', (req, res) => {
            return handle(req, res);
        });

        server.listen(5002, err => {
            if (err) throw err;
            console.log('> Ready on port 5002');
        });
    })
    .catch(ex => {
        console.error(ex.stack)
        process.exit(1)
    })