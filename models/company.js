var ottoman = require("ottoman");
var couchbase = require('couchbase');
var validator = require("../validators/validators.js");
var bucket = require('../app').bucket;

ottoman.store = new ottoman.CbStoreAdapter(bucket, couchbase);

var CompanyMdl = ottoman.model("Company", {
    createdON: { type: "Date", default:new Date() },
    name: "string",
    address: {
        street: "string",
        city: "string",
        state: "string",
        zip: "integer",
        country: { type: "string", default: "USA" }
    },
    phone: { type:"string", validator: validator.PhoneValidator },
    website: "string",
    active: { type: "boolean", default:true }
}, {
    index: {
        findByCompanyName: {
            by: "name",
            type: "refdoc"
        }
    }
});

module.exports=CompanyMdl;
