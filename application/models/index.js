'use strict';

var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize/types');
var basename  = path.basename(module.filename);
var env       = process.env.NODE_ENV || 'development';
var config    = require(__dirname + '/../config/config.json')[env];
var db        = {};

if (config.use_env_variable) {
  var sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
  var sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(function(file) {
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

/* 7. models/index.js

Index.js brings in the user model from models/user.js so that it can be compared by Sequelize before being exported into the database (module.exports = db). It also specifies proper paths (api routes) for the models to interact with the MySQL database

'use strict';		This forces index.js into a global ‘strict’ mode so that all js code must be 100% error proof. 
var fs        = require('fs');	This requires the fs.write module so that the app can access and interact with the file system.
var path      = require('path');					This requires the path module.
var Sequelize = require('sequelize/types');				This requires the sequelize module.
var basename  = path.basename(module.filename);			Returns the last portion of a path (in this case, file name).
var env       = process.env.NODE_ENV || 'development';		Allows for express to use the NOD_ENV variable (prod/devlt env).
var config    = require(__dirname + '/../config/config.json')[env];		NOD_ENV points toward the config folder (dvlt).
var db        = {};							var db is declared as an empty object.


 	if (config.use_env_variable) { var sequelize = new Sequelize(process.env[config.use_env_variable]); }
 	else { var sequelize = new Sequelize(config.database, config.username, config.password, config); }

		if/else conditional statements validates Sequelize in applying its Object-relational Mapping (ORM) onto the config items
		(database, username, password, config). Based on those, it logs into MySQL and imports the model.


fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');   })

	The fs.read dir(ectory) Sync(hronously) method points out in parallel the contents of a specified directory.
An array is being returned with all properties (file names, objects) from said directory

  .forEach(function(file) {
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model; });
  	The .forEach function fills a new variable (model) and imports it into the database (path.join).


 	 Object.keys(db).forEach(function(modelName) {
  	if (db[modelName].associate) { db[modelName].associate(db); } });
  	db.sequelize = sequelize;
  	db.Sequelize = Sequelize;

	Conditional statement: if the database model displays comparable keys across model tables, greenlights their interaction / connection.

module.exports = db;		Exports as database */