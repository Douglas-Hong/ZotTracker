import { createPage } from "./createGraph.js";
import * as Helper from "./enrollmentHelper.js";


// This function creates the search history offcanvas tab; it uses the "searchHistory" key
// from local storage in order to get the user's previous queries
export function createSearchHistory() {
  createHistoryHeader();

  // If "searchHistory" is not found in local storage or "searchHistory" is associated 
  // with an empty array, then inform the user that their search history is empty
  if (!localStorage.getItem("searchHistory") || JSON.parse(localStorage.getItem("searchHistory")).length === 0) {
    localStorage.setItem("searchHistory", JSON.stringify([]));
    $(".offcanvas-body").html("You haven't searched anything yet!");
  } else {
    let history = JSON.parse(localStorage.getItem("searchHistory"));
    history.forEach((item, index) => {
      createHistoryItem(item, index);
      handleHistoryItemRequest(history, item, index);
    });
  }
}


// This function creates the top of the offcanvas tab, i.e. the clear history button
// and the directions
function createHistoryHeader() {
  $(".offcanvas-body").html(
    `<div class="text-center">
      <button type="button" class="btn btn-danger clear-history-button">Clear History</button>
    </div> 
    <p>Click a course below to see its enrollment data again!</p>`
  );

  $(".clear-history-button").on("click", function() {
    localStorage.setItem("searchHistory", JSON.stringify([]));
    $(".offcanvas-body").html("You haven't searched anything yet!");
  });
}


// This function creates the history item, i.e. the heading and subheading that describes
// the original query
function createHistoryItem(item, index) {
    if (item.courseCode) {
      $(".offcanvas-body").append(
        `<div class="history-item" id="history-item-${index}">
          <h5>Course Code: ${item.courseCode} (${Helper.getQuarter(item.quarter)})</h5>
        </div>`
      );
    } else if (item.courseTitle) {
      $(".offcanvas-body").append(
        `<div class="history-item" id="history-item-${index}">
          <h5>${item.courseTitle} (${Helper.getQuarter(item.quarter)})</h5>
        </div>`
      );
    } else {
      $(".offcanvas-body").append(
        `<div class="history-item" id="history-item-${index}">
          <h5>${item.dept} ${item.number} (${Helper.getQuarter(item.quarter)})</h5>
        </div>`
      );
    }

    $("#history-item-" + index).append(`<p class="history-subheading">${item.instructor === "" ? "" : item.instructor + ", "}${Helper.getCourseType(item.courseType)}</p>`);
}


// This function handles the post request when the user clicks on a course
// to see its enrollment data again
function handleHistoryItemRequest(history, item, index) {
  // Note: the data key stores the query that the user clicked on
  $("#history-item-" + index).on("click", function() {
    $.ajax({
      url: "/",
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify(item),
      success: function (res) {
        // Move the course to the beginning of the history array
        history.splice(index, 1);
        history.unshift(item);
        localStorage.setItem("searchHistory", JSON.stringify(history));

        // Render the new page
        createPage(res);
        $("#close-history-button").trigger("click");
        $("html, body").animate({
          scrollTop: $("#enrollment-data").offset().top
        }, 250);
      }
    });
  });
}