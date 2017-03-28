/*
* Angular 2 CRUD application using Nodejs
* @autthor Shashank Tiwari
*/

'use strict';

class Helper{

	constructor(){

		this.Mongodb = require("./db");
	}

	getUsers(callback){
		this.Mongodb.onConnect( (db,ObjectID) => {
			db.collection('users').find().toArray( (err, result) => {
				callback(result);
				db.close();
			});
		});
	}

    getUser(data,callback){

		db.collection('users').findOne(data,function(err, result){

				if(err){

					response.error = true;
					response.isUserExists = false;
					response.message = `Something went Wrong,try after sometime.`;
					callback(response);

				}else{

					if(result == null ){

						response.error = true;
						response.isUserExists = false;
						response.message = `User not found.`;

						callback(response);

					}else{
                        //user found
                        callback(result);


					}
				}
			});
	}



	addUser(data,callback){

		var response = {};

		delete data['_id'];

		console.log(data);

		this.Mongodb.onConnect( (db,ObjectID) => {

			/* Checking if users Existsin DB starts */

			db.collection('users').findOne(data,function(err, result){

				if(err){

					response.error = true;
					response.isUserExists = false;
					response.message = `Something went Wrong,try after sometime.`;
					callback(response);

				}else{

					if(result != null ){

						response.error = true;
						response.isUserExists = true;
						response.message = `User already exists.`;

						callback(response);

					}else{

						/* Inserting data into DB starts */

						db.collection('users').insertOne(data, (err, result) => {

							if(err){
								response.error = true;
								response.isUserExists = false;
								response.message = `Something went Wrong,try after sometime.`;
							}else{
								response.error = false;
								response.isUserExists = false;
								response.isUserAdded = true;
								response.id=result.ops[0]._id;
								response.message = `User added.`;
							}

							callback(response);
						});

						/* Inserting data into DB ends */

					}
				}
			});

			/* Checking if users Existsin DB ends */
		});
	}



	removeUsers( userID, callback ){

		this.Mongodb.onConnect( (db,ObjectID) => {

			db.collection('users').deleteOne(
				{
					_id : new ObjectID(userID)
				},
				(err, results) => {
					if(err){
						callback({
							error : true
						});
					}else{
						callback({
							error : false
						});
					}
				}
			);

		});

	}

	updateUser( userID , data , callback){

		this.Mongodb.onConnect( (db,ObjectID) => {

			db.collection('users').updateOne(
				{
					_id: new ObjectID(userID)
				},
				{
					$set : {
						email:data.email,
                        username:data.username,
                        firstname:data.firstname,
                        lastname:data.lastname,
                        password:data.password,
						gender:data.gender,
						country:data.country
					}
				}, (err, results) => {


					if(err){
						callback({
							error : true
						});
					}else{
						callback({
							error : false
						});
					}

				}
			);
		});
	}
}

module.exports = new Helper();
