"use strict";
/*requiring mongodb node modules */
const  mongodb=require('mongodb');
const MongoClient = mongodb.MongoClient;
const ObjectID = mongodb.ObjectID;
const assert = require('assert');
const MongoUrl=process.env.ONGODB_URI;



module.exports.onConnect = (callback) => {

	MongoClient.connect(MongoUrl, (err, db) => {
		assert.equal(null, err);
		callback(db,ObjectID);
	});

}
