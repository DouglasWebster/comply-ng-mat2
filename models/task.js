var ottoman = require("ottoman");
var couchbase = require('couchbase');
var validator = require("../validators/validators.js");
var bucket = require('../app').bucket;

ottoman.store = new ottoman.CbStoreAdapter(bucket, couchbase);

var TaskMdl = ottoman.model("Task", {
    createdON: { type: "Date", default: function() {return new Date() }},
    url: "string",
    name: "string",
    description: "string",
    type: "string",
    owner: {ref: "User"},
    assignedTo: {ref: "User"},
    users: [{ref: "User"}],
    priority: "string",
    status: "string",
    permalink: {type:"string", default: validator.permalinker},
    history: [
        {
            log: "string",
            photos: [{filename: "string",extension:"string"}],
            url: "string",
            user: {ref: "User"},
            createdAt: { type: "Date", default: function() { return new Date() }}
        }
    ]
}, {
    index: {
        findByName: {
            by: "name",
            type: "n1ql"
        },
        findByType: {
            by: "type",
            type: "n1ql"
        },
        findByStatus: {
            by: "status",
            type: "n1ql"
        },
        findByPriority: {
            by: "priority",
            type: "n1ql"
        },
        findByAssignedTo:
        {
            by: "assignedTo",
            type: "n1ql"
        },
        findByOwner:{
            by:"owner",
            type: "n1ql"
        },
        findByLink:{
            by:"permalink",
            type: "refdoc"
        }
    }
});

module.exports=TaskMdl;
