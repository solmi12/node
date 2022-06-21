const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const dbConfig = require("../config/db.config.js");

const db = {};

db.mongoose = mongoose;
db.url = dbConfig.url;
db.reunion = require("./reunion.model.js")(mongoose);

db.user = require("./user.model")(mongoose);
db.role = require("./role.model");

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;


