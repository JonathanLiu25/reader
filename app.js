const express = require("express");
const { resolve } = require("path");
const request = require("request");
const app = express();

app.use(express.static(resolve(__dirname, "public")));

let latestChapter = 1;

app.get("/chapter/where", (req, res, next) => {
  res.send(String(latestChapter));
});

app.get("/chapter/:chapter", (req, res, next) => {
  const chapter = parseInt(req.params.chapter, 10);
  latestChapter = chapter;
  const url = `https://wwyxhqc.wordpress.com/%E4%BF%AE%E7%9C%9F%E4%B8%96%E7%95%8C-world-of-cultivation-chapter-${chapter}/`;
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

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log("Listening on port", server.address().port);
});

module.exports = app;
