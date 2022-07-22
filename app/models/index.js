const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const dbConfig = require("../config/db.config.js");

const db = {};

db.mongoose = mongoose;
db.url = dbConfig.url;
db.reunion = require("./reunion.model.js")(mongoose);

db.user = require("./user.model")(mongoose);
db.role = require("./role.model");
db.vote = require ("./vote.model")(mongoose);
db.carte = require ("./carte.model");
db.CARTES =  ["carte1","carte2","carte3","carte4","carte5","carte6","carte7","carte8","carte9","carte10","carte11","carte12"];

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;


