import { createPage } from "/js/createGraph.js";
import { createSearchHistory, addHistoryItem } from "/js/searchHistory.js";


export function handleRefresh(enrollment) {
  createSearchHistory();

  if (enrollment !== "{}") {
    enrollment = JSON.parse(enrollment);

    if (enrollment.status === "FOUND") {
      addHistoryItem(enrollment.originalQuery);
    }

    populateForm(enrollment.originalQuery);
    window.addEventListener("pageshow", () => {
      populateForm(enrollment.originalQuery);
    });

    createPage(enrollment);
  } else {
    // When the user navigates to the first time they open ZotTracker,
    // the form should have nothing in it
    window.addEventListener("pageshow", () => {
      $(".reset-button").click();
    });
  }
}


export function decodeHtml(html) {
  var txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}


function populateForm(query) {
  $("#dept").val(query.dept);
  $("#course-num").val(query.number);
  $("#quarter").val(query.quarter);
  $("#instructor").val(query.instructor);
  $("#course-title").val(query.courseTitle);
  $("#course-code").val(query.courseCode);
  $("#course-type").val(query.courseType);

  if ($("#quarter").val() !== "") {
    $("#quarter").css("color", "black");
  }
}
