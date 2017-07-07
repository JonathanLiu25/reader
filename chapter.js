const express = require("express");
const request = require("request");
const { JSDOM } = require("jsdom");
const Chapter = require("./models").Chapter;

const router = express.Router();

let options;
requestOptions();

router.get("/where", (req, res, next) => {
  Chapter.findOne({ where: { name: "world-of-cultivation" } })
    .then(foundChapter => res.send(String(foundChapter.chapter)))
    .catch(next);
});

router.get("/options", (req, res, next) => {
  requestOptions(res);
});

router.get("/:chapter", (req, res, next) => {
  const chapter = parseInt(req.params.chapter, 10);

  Chapter.findOrCreate({ where: { name: "world-of-cultivation" } })
    .then(foundChapter => foundChapter[0].update({ chapter }))
    .catch(next);

  if (!options) {
    requestOptions(res);
  } else {
    findChapter(res, chapter);
  }
});

function requestOptions(res) {
  const toc = "https://wwyxhqc.wordpress.com/%E4%BF%AE%E7%9C%9F%E4%B8%96%E7%95%8C-world-of-cultivation/table-of-contents/";
  request(toc, (tocErr, tocRes, tocBody) => {
    if (tocErr) {
      if (res) res.send(tocErr);
      else console.log("ToC error", tocErr);
    } else {
      options = new JSDOM(tocBody).window.document.getElementsByTagName("option");
      if (res) res.sendStatus(200);
    }
  });
}

function findChapter(res, chapter) {
  for (var i = 0; i < options.length; i++) {
    if (options[i].value.indexOf(`${chapter}`) !== -1 && options[i].value.indexOf("world-of-cultivation") !== -1) {
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

module.exports = router;
