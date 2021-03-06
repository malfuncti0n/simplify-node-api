/*
* Angular 2 CRUD application using Nodejs
* @autthor Shashank Tiwari
*/
'use strict';
const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./utils/routes');
class Server{

	constructor(){
		this.port =  process.env.PORT || 3000;
		this.host = `localhost`;
		this.app = express();
	}

	appConfig(){
		this.app.use(bodyParser.json());
		this.app.use(
			cors()
		);
	}

	/* Including app Routes starts*/
	includeRoutes(){
		new routes(this.app).routesConfig();
	}
	/* Including app Routes ends*/

	appExecute(){

		this.appConfig();
		this.includeRoutes();

		var server = this.app.listen(this.port,() => {
			console.log(`Listening on ${server.address().port}`);
		});
	}
}

const app = new Server();
app.appExecute();
