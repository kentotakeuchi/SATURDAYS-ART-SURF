const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    accessionNumber: String,
    additionalImages: Array,
    artistBeginDate: String,
    artistDisplayName: String,
    artistEndDate: String,
    artistNationality: String,
    artistRole: String,
    city: String,
    classification: String,
    brand: String,
    department: String,
    dimensions: String,
    isPublicDomain: Boolean,
    medium: String,
    objectBeginDate: Number,
    objectEndDate: Number,
    objectID: Number,
    objectName: String,
    objectURL: String,
    primaryImage: String,
    primaryImageSmall: String,
    repository: String,
    title: String
});

ItemSchema.index({'$**': 'text'});

const Item = mongoose.model('Item', ItemSchema);

module.exports = Item;