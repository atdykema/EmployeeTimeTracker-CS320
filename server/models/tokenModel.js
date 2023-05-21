const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tokenSchema = new Schema({
    "employeeId": {type: Number, required: true},
    "companyId": {type: Number, required: true},
    "tokens": [{type: String, required: true}]
});
  
const TokenContainer = mongoose.model('tokens', tokenSchema);
module.exports = TokenContainer;

