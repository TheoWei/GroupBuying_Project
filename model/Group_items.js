const mongoose = require('mongoose');
const ItemSchema = new mongoose.Schema({
    group_id: {type: Number, required: true},
    items: {type: [Object], default: undefined}
})
module.exports = mongoose.model('group_item', ItemSchema);