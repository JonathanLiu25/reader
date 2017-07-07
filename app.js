const express = require("express");
const { resolve } = require("path");

const chapterRouter = require("./chapter.js");
const db = require("./db.js");

const app = express();

app.use(express.static(resolve(__dirname, "public")));

app.use("/chapter", chapterRouter);

const port = process.env.PORT || 3000;

if (module === require.main) {
  const server = app.listen(port, () => {
    console.log("Listening on port", server.address().port);

    require("./models");
    const force = false;
    db.sync({ force })
      .then(() => {
        console.log("Database synced");
      });
  });
}

module.exports = app;
