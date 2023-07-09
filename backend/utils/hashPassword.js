const bcrypt = require("bcryptjs");

const salt = bcrypt.genSaltSync(10); // password will be additionally secured with random Salt

const hashPassword = password => bcrypt.hashSync(password, salt);

module.exports = { hashPassword }
