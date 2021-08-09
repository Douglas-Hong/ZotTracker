import * as Helper from "./enrollmentHelper.js";


// This function creates the search history offcanvas tab; it uses the "searchHistory" key
// from local storage in order to get the user's previous queries
export function createSearchHistory() {
  createHistorySticky();

  // If "searchHistory" is not found in local storage or "searchHistory" is associated 
  // with an empty array, then inform the user that their search history is empty
  if (!localStorage.getItem("searchHistory") || JSON.parse(localStorage.getItem("searchHistory")).length === 0) {
    clearHistory();
  } else {
    $(".offcanvas-body").empty();
    let history = JSON.parse(localStorage.getItem("searchHistory"));
    history.forEach((item, index) => {
      createHistoryItem(item, index);
      createHiddenForm(item, index);
      handleHistoryItemRequest(history, index);
    });
  }
}


// This function creates the sticky part of the offcanvas tab, which is the clear history button
// and the directions
function createHistorySticky() {
  $(".offcanvas-sticky").html(
    `<div class="text-center">
      <button type="button" class="btn btn-danger clear-history-button">Clear History</button>
      </div> 
    <p>Click a course below to see its enrollment data again!</p>`
  );

  $(".clear-history-button").on("click", () => {
    clearHistory();
  });
}


// This function properly clears the search history by setting the "searchHistory" key to an empty
// array and updating the offcanvas tab
function clearHistory() {
  localStorage.setItem("searchHistory", JSON.stringify([]));
  $(".offcanvas-sticky").empty();
  $(".offcanvas-body").html("You haven't searched anything yet!");
}


// This function creates the history item, i.e. the heading and subheading that describes
// the original query
function createHistoryItem(item, index) {
  if (item.courseCode) {
    var heading = `Course Code: ${item.courseCode} (${Helper.getQuarter(item.quarter)})`;
  } else if (item.courseTitle) {
    var heading = `${item.courseTitle.toUpperCase()} (${Helper.getQuarter(item.quarter)})`;
  } else {
    var heading = `${item.dept} ${item.number.toUpperCase().replace(/\ /g, "")} (${Helper.getQuarter(item.quarter)})`;
  }

  $(".offcanvas-body").append(
    `<div class="history-item" id="history-item-${index}">
      <h5>${heading}</h5>
      <p class="history-subheading">${item.instructor === "" ? "" : item.instructor + ", "}${Helper.getCourseType(item.courseType)}</p>
    </div>`
  );
}


// This function creates a hidden form for a history item; if the user clicks on a course,
// that course's corresponding form will be submitted
function createHiddenForm(item, index) {
  $(".offcanvas-body").append(
    `<form id="history-form-${index}" method="post" action="/" style="display:none;">
      <input name="dept" value="${item.dept}">
      <input name="number" value="${item.number}">
      <input name="quarter" value="${item.quarter}">
      <input name="instructor" value="${item.instructor}">
      <input name="courseTitle" value="${item.courseTitle}">
      <input name="courseCode" value="${item.courseCode}">
      <input name="courseType" value="${item.courseType}">
    </form>`
  );
}


// This function handles the post request when the user clicks on a course
// to see its enrollment data again
function handleHistoryItemRequest(history, index) {
  $("#history-item-" + index).on("click", () => {
    // Delete the item because it will be moved to the beginning of the search history
    history.splice(index, 1);
    localStorage.setItem("searchHistory", JSON.stringify(history));
    $(`#history-form-${index}`).submit();
  });
}


// Given the user's query/input, this function inserts the query into the beginning of the
// search history array; after adding the item, we will delete all duplicate items
export function addHistoryItem(query) {
  let history = JSON.parse(localStorage.getItem("searchHistory"));
  history.unshift(query);
  history = history.filter((item, index) => JSON.stringify(item) !== JSON.stringify(history[0]) || index === 0);
  localStorage.setItem("searchHistory", JSON.stringify(history));
}


// This function deletes the first element of the search history array
export function popHistoryItem() {
  let history = JSON.parse(localStorage.getItem("searchHistory"));
  history.shift();
  localStorage.setItem("searchHistory", JSON.stringify(history));
}