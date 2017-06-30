const express = require("express");
const { resolve } = require("path");
const request = require("request");
const app = express();

app.use(express.static(resolve(__dirname, "public")));

app.get("/:chapter", (req, res, next) => {
  const url = `https://wwyxhqc.wordpress.com/%E4%BF%AE%E7%9C%9F%E4%B8%96%E7%95%8C-world-of-cultivation-chapter-${req.params.chapter}/`;
  request(url, (err, response, body) => {
    if (err) {
      res.send(err);
    } else {
      const begin = body.indexOf("<!-- .entry-header -->");
      const end = body.indexOf("<!-- .entry-content -->");
      const text = body.slice(begin, end);
      res.send(text);
    }
  });
});

const port = 3000;
const server = app.listen(port, () => {
  console.log("Listening on port", server.address().port);
});

module.exports = app;
