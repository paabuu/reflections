const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/record', {useNewUrlParser: true}).catch(err => console.log(err));
mongoose.Promise = Promise;

const Record = mongoose.model('Record', { 
    time: String,
    orders: Array,
    songs: Array
});

const save = function(record, callback) {
    const r = new Record({ ...record });
    r.save()
        .then(() => callback())
        .catch(err => console.log(err));
};

const getAllRecords = function(callback) {
    Record.find({}, callback)
};

module.exports = {
    save,
    getAllRecords
}