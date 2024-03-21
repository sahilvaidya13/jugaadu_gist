const express = require("express");
const cors = require("cors");
const sequelize = require("./sequelize");
const Codeblock = require("./models/Codeblock");
const axios = require("axios");
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

app.use(
  cors({
    origin: "*",
  })
);

function formatDate(date) {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}

function getCurrentDate() {
  const currentDate = new Date(Date.now());
  return formatDate(currentDate);
}

const createSubmission = async (code, input, language, id) => {
  const options = {
    method: "POST",
    url: "https://judge0-ce.p.rapidapi.com/submissions",
    params: {
      base64_encoded: "false",
      fields: "*",
    },
    headers: {
      "content-type": "application/json",
      "Content-Type": "application/json",
      "X-RapidAPI-Key": "044a1ef50amshf4fbec5a86cb52fp14f4d0jsne10397f0a678",
      "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
    },
    data: {
      language_id: language,
      source_code: code,
      stdin: input,
    },
  };
  try {
    axios.request(options).then((dt) => {
      console.log(dt.data.token);
      console.log(id);
      setTimeout(() => {
        getSubmission(dt.data.token, id);
      }, 2000);
    });
  } catch (error) {
    console.error("RROROROOOOOOOOOOOOOOOOOOOOOO", error);
  }
};

const getSubmission = async (token, id) => {
  const options2 = {
    method: "GET",
    url: `https://judge0-ce.p.rapidapi.com/submissions/${token}`,
    params: {
      base64_encoded: "false",
      fields: "*",
    },
    headers: {
      "X-RapidAPI-Key": "044a1ef50amshf4fbec5a86cb52fp14f4d0jsne10397f0a678",
      "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
    },
  };

  // try {
  //   axios.request(options2).then((kk) => {
  //     console.log(kk.data.stdout);
  //     const val = kk.data.stdout;
  //   });
  //   try {
  //     const codeblock = await Codeblock.findByPk(id);
  //     if (codeblock) {
  //       codeblock.stdout = val;
  //       await codeblock.save();
  //       return true; // Success
  //     } else {
  //       return false; // Row not found
  //     }
  //   } catch (error) {
  //     console.error("Error updating stdout:", error);
  //     return false; // Error occurred
  //   }
  // } catch (error) {
  //   console.error("STDOUT finding error", error);
  // }
  try {
    axios.request(options2).then(async (kk) => {
      console.log("RESPPPPP", kk.data.stdout);
      const val = kk.data.stdout;

      try {
        const codeblock = await Codeblock.findByPk(id);
        if (codeblock) {
          codeblock.stdout = val;
          await codeblock.save();
          return true;
        } else {
          return false;
        }
      } catch (error) {
        console.error("Error updating stdout:", error);
        return false;
      }
    });
  } catch (error) {
    console.error("STDOUT finding error", error);
  }
};

// const options = {
//   method: "POST",
//   url: "https://judge0-ce.p.rapidapi.com/submissions",
//   params: {
//     base64_encoded: "false",
//     fields: "*",
//   },
//   headers: {
//     "content-type": "application/json",
//     "Content-Type": "application/json",
//     "X-RapidAPI-Key": "044a1ef50amshf4fbec5a86cb52fp14f4d0jsne10397f0a678",
//     "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
//   },
//   data: {
//     language_id: language,
//     source_code: code,
//     stdin: input,
//   },
// };
app.get("/judge", async (req, res) => {
  try {
    axios.request(options).then((dt) => console.log(dt.data));

    res.send("rep done");
  } catch (error) {
    console.error(error);
  }
});

const options2 = {
  method: "GET",
  url: "https://judge0-ce.p.rapidapi.com/submissions/a787759a-e524-42c4-af96-a508051ab832",
  params: {
    base64_encoded: "false",
    fields: "*",
  },
  headers: {
    "X-RapidAPI-Key": "044a1ef50amshf4fbec5a86cb52fp14f4d0jsne10397f0a678",
    "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
  },
};
app.post("/api/newcode", async (req, res) => {
  const { username, sourcecode, stdin, lang } = req.body;

  try {
    const submissiontime = getCurrentDate();
    const newCode = await Codeblock.create({
      username,
      sourcecode,
      submissiontime,
      stdin,
    });

    res.status(200).json({ message: true, resp: newCode });
    console.log(sourcecode, stdin, lang, newCode.id);
    createSubmission(sourcecode, stdin, lang, newCode.id);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get("/judge_resp", async (req, res) => {
  try {
    axios
      .request(options2)
      // .then((dd) => atob(dd.data.compile_output))
      .then((kk) => console.log(kk));

    res.send("rep done");
  } catch (error) {
    console.error(error);
  }
});
app.get("/api/fetchall", async (req, res) => {
  try {
    const allblocks = await Codeblock.findAll({});
    res.send(allblocks);
  } catch (err) {
    console.log(err);
  }
});
app.get("/api/fetch/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const block = await Codeblock.findOne({ where: { id: id } });
    res.send(block);
  } catch (err) {
    console.log(err);
  }
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
