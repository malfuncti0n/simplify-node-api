/*
* Angular 2 CRUD application using Nodejs
* @autthor Shashank Tiwari
*/

'use strict';
const helper = require("./helper");

class Routes{

	constructor(app){
		this.app = app;
	}


	/* creating app Routes starts */
	appRoutes(){


		/* Route to get all users starts*/
		this.app.get('/api/users',(request,response) =>{

			helper.getUsers( (result) => {
				if (result) {
					response.status(200).json({
						users:result
					});
				}else{
					response.status(404).json({
						message:`No usres found.`
					});
				}
			});
		});
		/* Route to get all users ends*/


		/* Route to add new user starts*/
		this.app.post('/api/users/',(request,response) =>{


				helper.addUser( request.body , (result)=>{

					if (result.error) {

						response.status(403).json({
							error : true,
							message : `Error.`
						});

					} else{

						helper.getUsers( (result) => {
							if (result) {
								response.status(200).json({
									error : false,
									users:result
								});
							}else{
								response.status(404).json({
									error : true,
									message:`No usres found.`
								});
							}
						});
					};
				});
		});
		/* Route to add new user ends*/


		/* Route to delete user starts*/
		this.app.delete('/api/users/:id',(request,response) =>{

			if (request.params.id && request.params.id!='') {

				helper.removeUsers( request.params.id, (result)=>{

					if (result.error) {

						response.status(403).json({
							error : true,
							message : `Error.`
						});

					} else{

						helper.getUsers( (result) => {
							if (result) {
								response.status(200).json({
									error : false,
									users:result
								});
							}else{
								response.status(404).json({
									error : true,
									message:`No usres found.`
								});
							}
						});


					};

				});

			}else{
				response.status(403).json({
					error : true,
					message : `Invalid user Id.`
				});
			}
		});
		/* Route to delete user ends*/


		/* Route to update user starts*/
		this.app.put('/api/users/:id',(request,response) =>{


			if (request.params.id && request.params.id!='') {

				helper.updateUser( request.params.id, request.body , (result)=>{

					if (result.error) {

						response.status(403).json({
							error : true,
							message : `Error.`
						});

					} else{


						helper.getUsers( (result) => {
							if (result) {
								response.status(200).json({
									error : false,
									users:result
								});
							}else{
								response.status(404).json({
									error : true,
									message:`No usres found.`
								});
							}
						});


					};

				});

			}else{
				response.status(403).json({
					error : true,
					message : `Invalid user Id.`
				});
			}
		});
		/* Route to update user ends*/

	}

	routesConfig(){
		this.appRoutes();
	}
}
module.exports = Routes;
