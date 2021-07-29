import * as Helper from "./enrollmentHelper.js";
import { createPage } from "./createGraph.js";


// This function creates the search history offcanvas tab; it uses the "searchHistory" key
// from local storage in order to get the user's previous queries
export function createSearchHistory() {
    $(".offcanvas-body").html(
      `<div class="text-center">
        <button type="button" class="btn btn-danger clear-history-button">Clear History</button>
      </div> 
      <p>Click a course below to see its enrollment data again!</p>`);
  
    $(".clear-history-button").on("click", function() {
      localStorage.setItem("searchHistory", JSON.stringify([]));
      $(".offcanvas-body").html("You haven't searched anything yet!");
    });
  
    const history = JSON.parse(localStorage.getItem("searchHistory"));
    history.reverse().forEach((item, index) => {
      if (item.courseCode !== "") {
        $(".offcanvas-body").append(
          `<div class="history-item" id="history-item-${index}">
            <h5>Course Code: ${item.courseCode} (${Helper.getQuarter(item.quarter)})</h5>
          </div>`
        );
      } else {
        $(".offcanvas-body").append(
          `<div class="history-item" id="history-item-${index}">
            <h5>${item.dept} ${item.number} (${Helper.getQuarter(item.quarter)})</h5>
          </div>`
        );
      }
  
      if (item.instructor !== "") {
        $("#history-item-" + index).append(`<p class="history-subheading">${item.instructor}, ${item.courseType === "all" ? "All Course Types" : item.courseType}</p>`);
      } else {
        $("#history-item-" + index).append(`<p class="history-subheading">${item.courseType === "all" ? "All Course Types" : item.courseType}</p>`);
      }
  
      $("#history-item-" + index).on("click", function() {
        $.ajax({
          url: "/",
          method: "POST",
          contentType: "application/json",
          data: JSON.stringify(JSON.parse(localStorage.getItem("searchHistory"))[history.length - index - 1]),
          success: function (res) {
            // Move the course to the end of the history array, and then render the new page
            let history = JSON.parse(localStorage.getItem("searchHistory"));
            const originalItem = history[history.length - index - 1];
            history.splice(history.length - index - 1, 1);
            history.push(originalItem);
            localStorage.setItem("searchHistory", JSON.stringify(history));
            createPage(res);
            $("#close-history-button").trigger("click");
          }
        });
      });
    });
  }