var getUrlParameter = function getUrlParameter(sParam) {
  var sPageURL = decodeURIComponent(window.location.search.substring(1)),
    sURLVariables = sPageURL.split("&"),
    sParameterName,
    i;

  for (i = 0; i < sURLVariables.length; i++) {
    sParameterName = sURLVariables[i].split("=");

    if (sParameterName[0] === sParam) {
      return sParameterName[1] === undefined ? true : sParameterName[1];
    }
  }
};

const chapter = parseInt(getUrlParameter("chapter"), 10) || null;
const prevLink = `<a href="/?chapter=${chapter - 1}"><p>Prev Chapter</p></a>`;
const nextLink = `<a href="/?chapter=${chapter + 1}"><p>Next Chapter</p></a>`;
const chapterDisplay = `<h1> Chapter ${chapter} </h1>`;
const control = `<div class='control'>${prevLink + chapterDisplay + nextLink}</div>`;

if (chapter) {
  $("#main").append("<div class='loading'><p>Loading...</p></div>");
  $.ajax({
    type: "GET",
    url: `/${chapter}`
  })
    .then(content => {
      $(".loading").remove();
      $("#main").append(control);
      $("#main").append(content);
      $(".wpcnt").remove();
      $("#jp-post-flair").remove();
      $("#main").append(control);
    });
} else {
  $.ajax({
    type: "GET",
    url: "/where"
  })
    .then(chapterNum => {
      $("#main").append(`<a href="/?chapter=${chapterNum}"><p>Click to go to Chapter ${chapterNum}</p></a>`);
    });
}
