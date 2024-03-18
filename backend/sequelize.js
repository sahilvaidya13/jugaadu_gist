const Sequelize = require("sequelize");

// Define the connection parameters
const sequelize = new Sequelize(
  "defaultdb",
  "avnadmin",
  "AVNS_z8Xb1UAIHq78R0pooXJ",
  {
    host: "sahil-sql-intern-project.a.aivencloud.com",

    port: 24239,
    dialect: "mysql",
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log(
      "Connection to the database has been established successfully."
    );
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

module.exports = sequelize;
