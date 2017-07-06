const express = require("express");
const { resolve } = require("path");
const request = require("request");
const { JSDOM } = require("jsdom");

const app = express();

app.use(express.static(resolve(__dirname, "public")));

let latestChapter = 1;

app.get("/chapter/where", (req, res, next) => {
  res.send(String(latestChapter));
});

app.get("/chapter/:chapter", (req, res, next) => {
  const chapter = parseInt(req.params.chapter, 10);
  latestChapter = chapter;
  const toc = "https://wwyxhqc.wordpress.com/%E4%BF%AE%E7%9C%9F%E4%B8%96%E7%95%8C-world-of-cultivation/table-of-contents/";
  // request to table of contents
  request(toc, (tocErr, tocRes, tocBody) => {
    if (tocErr) {
      res.send(tocErr);
    } else {
      // goes through all the options to find the selected chapter
      const options = new JSDOM(tocBody).window.document.getElementsByTagName("option");
      for (var i = 0; i < options.length; i++) {
        if (options[i].value.indexOf(`world-of-cultivation-chapter-${chapter}`) !== -1) {
          // requests chapter url if chapter is found
          request(options[i].value, (err, response, body) => {
            if (err) {
              res.send(err);
            } else {
              const text = new JSDOM(body).window.document.getElementsByClassName("entry-content")[0].innerHTML;
              res.send(text);
            }
          });
          break;
        }
      }
    }
  });
});

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log("Listening on port", server.address().port);
});

module.exports = app;
