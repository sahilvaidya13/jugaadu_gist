// models/User.js

const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize"); // Assuming sequelize.js is in the parent directory

const Codeblock = sequelize.define("Codeblock", {
  // Define columns
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  sourcecode: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  submissiontime: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Codeblock;
