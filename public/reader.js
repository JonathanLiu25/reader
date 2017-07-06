const words = {
  ling: "spirit",
  ye: "grandfather",
  sanren: "roaming cultivator",
  zhenren: "spirit master",
  xianren: "daoist immortal",
  xiu: "cultivator",
  xiuzhe: "cultivator",
  yaomo: "spirit demon",
  jie: "world",
  jing: "realm",
  jinzhi: "restriction",
  jingshi: "crystal",
  dan: "pellet",
  lianqi: "first stage",
  zhuji: "second stage",
  ningmai: "third stage",
  jindan: "fourth stage",
  yuanying: "fifth stage",
  fanxu: "sixth stage",
  dasheng: "seventh stage",
  // relationships
  shixiong: "senior brother",
  shidi: "junior brother",
  shijie: "senior sister",
  shimei: "junior sister",
  shishu: "senior uncle",
  shibo: "senior uncle elder",
  shigu: "senior aunt"
};

const chapter = getChapter() || null;
const prevLink = `<a href="/?chapter=${chapter - 1}"><h3>Prev Chapter</h3></a>`;
const nextLink = `<a href="/?chapter=${chapter + 1}"><h3>Next Chapter</h3></a>`;
const chapterDisplay = `<h1> Chapter ${chapter} </h1>`;
const control = `<div class='control'>${prevLink + chapterDisplay + nextLink}</div>`;

const header = "<header class='header'></header>";
const article = "<article class='article'></article>";
const footer = "<footer class='footer'></footer>";
const loadingText = "<div class='loading'><p>Loading...</p></div>";

$("#main").append(header);
$("#main").append(article);
$("#main").append(footer);

if (chapter) {
  document.title = `Chapter ${chapter} - World of Cultivation`;
  $(".article").append(loadingText);

  $.ajax({
    type: "GET",
    url: `/chapter/${chapter}`
  })
    .then(entry => {
      $(".loading").remove();
      $(".header").append(control);
      $(".article").append(entry);
      $(".wpcnt").remove();
      $("#jp-post-flair").remove();
      $(".footer").append(control);
      wordReplacer();
    });
} else {
  document.title = "World of Cultivation";
  $.ajax({
    type: "GET",
    url: "/chapter/where"
  })
    .then(chapterNum => {
      $(".article").append(`<div class='where'><a href="/?chapter=${chapterNum}"><p>Go to chapter ${chapterNum}</p></a></div>`);
    });
}

function getUrlParameter(sParam) {
  const sPageURL = decodeURIComponent(window.location.search.substring(1)),
    sURLVariables = sPageURL.split("&");
  let sParameterName;

  for (let i = 0; i < sURLVariables.length; i++) {
    sParameterName = sURLVariables[i].split("=");

    if (sParameterName[0] === sParam) {
      return sParameterName[1] === undefined ? true : sParameterName[1];
    }
  }
}

function getChapter() {
  const chapterNum = getUrlParameter("chapter");
  return parseInt(chapterNum, 10);
}

function wordReplacer() {
  const elements = document.getElementsByTagName("*");
  const replace = replacementGenerator();

  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];

    for (let j = 0; j < element.childNodes.length; j++) {
      const node = element.childNodes[j];

      if (node.nodeType === 3) {
        const text = node.nodeValue;
        for (const oldWord in replace) {
          if (replace.hasOwnProperty(oldWord)) {
            const replacedText = text.replace(new RegExp(oldWord), replace[oldWord]);
            if (replacedText !== text) {
              element.title = replace[oldWord];
              element.replaceChild(document.createTextNode(replacedText), node);
            }
          }
        }
      }
    }
  }
}

function replacementGenerator() {
  const replacement = {};

  for (const oldWord in words) {
    if (words.hasOwnProperty(oldWord)) {
      const newWord = words[oldWord];
      replacement["^" + oldWord + "$"] = `${oldWord} (${newWord})`;
      replacement["^" + oldWord + " $"] = `${oldWord} (${newWord}) `;
      replacement["^" + capitalizeFirstLetter(oldWord) + "$"] = `${capitalizeFirstLetter(oldWord)} (${newWord})`;
      replacement["^" + capitalizeFirstLetter(oldWord) + " $"] = `${capitalizeFirstLetter(oldWord)} (${newWord}) `;
    }
  }

  return replacement;
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
