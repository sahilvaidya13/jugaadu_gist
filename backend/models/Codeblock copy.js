// models/User.js

const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize"); // Assuming sequelize.js is in the parent directory

const Codeblock = sequelize.define("codeblocks", {
  // Define columns
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  sourcecode: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  stdin: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  submissiontime: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  stdout: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = Codeblock;
