const AJV = require('ajv');
const addFormats = require('./add-formats');

const ajv = new AJV();
addFormats(ajv);
module.exports = ajv;
