const express = require("express");
const sequelize = require("./sequelize");
const Codeblock = require("./models/Codeblock");
// Define your models and associations

// Sync the models with the database
sequelize
  .sync()
  .then(() => {
    console.log("Models synced with the database.");
  })
  .catch((err) => {
    console.error("Error syncing models:", err);
  });

const app = express();
app.use(express.json());
app.post("/addnew", async (req, res) => {
  const { username, sourcecode, submissiontime } = req.body;

  try {
    const newCode = await Codeblock.create({
      username,
      sourcecode,
      submissiontime,
    });

    res.status(200).send("Added success");
  } catch (err) {
    res.statusCode(500).send(err);
  }
});
// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
