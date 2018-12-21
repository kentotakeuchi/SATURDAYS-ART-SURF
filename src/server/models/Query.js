const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuerySchema = new Schema({

    objQueries: Array,
    geoQueries: Array,
    dateQueries: Array,
    deptQueries: Array
});

const Query = mongoose.model('Query', QuerySchema);

module.exports = Query;