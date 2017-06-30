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

const chapter = parseInt(getUrlParameter("chapter"), 10);
const prevButton = `<button class='prevnext' onClick='window.open("/?chapter=${chapter - 1}")'><p>Prev Chapter</p></button>`;
const nextButton = `<button class='prevnext' onClick='window.open("/?chapter=${chapter + 1}")'><p>Next Chapter</p></button>`;
const chapterDisplay = `<p> Chapter ${chapter} </p>`;
const control = `<div class='control'>${prevButton + chapterDisplay + nextButton}</div>`;

$("#main").append("<div class='loading'><p>Loading...</p></div>");

if (chapter) {
  $.ajax({
    type: "GET",
    url: `/${chapter}`
  })
    .then(result => {
      $(".loading").remove();
      $("#main").append(control);
      $("#main").append(result);
      $(".wpcnt").remove();
      $("#jp-post-flair").remove();
      $("#main").append(control);
    });
} else {
  $("#main").append("<lp>Type '/?chapter=chapterid' in the url</p>");
}
