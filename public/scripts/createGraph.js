import { externalTooltipHandler } from "./tooltipHandler.js";
import { handleQuarterTab, handleTableTab } from "./enrollmentNav.js";
import { createSearchHistory } from "./searchHistory.js";
import * as Helper from "./enrollmentHelper.js";


// If "searchHistory" is not found in local storage or "searchHistory" is associated 
// with an empty array, then inform the user that their search history is empty
if (!localStorage.getItem("searchHistory") || JSON.parse(localStorage.getItem("searchHistory")).length === 0) {
  localStorage.setItem("searchHistory", JSON.stringify([]));
  $(".offcanvas-body").html("You haven't searched anything yet!");
} else {
  createSearchHistory();
}


$("#course-form").on("submit", function (event) {
  event.preventDefault();

  const dept = $("#dept").val();
  // This makes the course number case-insensitive and whitespace-insensitive
  const number = $("#course-num").val().toUpperCase().replace(/\ /g, "");
  const quarter = $("#quarter").val();
  const instructor = $("#instructor").val();
  const courseCode = $("#course-code").val();
  const courseType = $("#course-type").val();

  handleSearchRequest(dept, number, quarter, instructor, courseCode, courseType);
});


// This function handles the post request when the user submits a course to search
function handleSearchRequest(dept, number, quarter, instructor, courseCode, courseType) {
  $.ajax({
    url: "/",
    method: "POST",
    contentType: "application/json",
    data: JSON.stringify({
      dept: dept,
      number: number,
      quarter: quarter,
      instructor: instructor,
      courseCode: courseCode,
      courseType: courseType
    }),
    success: function (res) {
      // If we can find one course, update the search history with the query
      // the user used to get that course
      if (res.status === "FOUND") {
        let history = JSON.parse(localStorage.getItem("searchHistory"));
        history.unshift(res.originalQuery);
        localStorage.setItem("searchHistory", JSON.stringify(history));
      }
      createPage(res);
      // Scroll down to the enrollment data section
      $("html, body").animate({
        scrollTop: $("#enrollment-data").offset().top
      }, 250);
    }
  });
}


// This function creates the majority of the webpage; it displays the entire
// enrollment section
export function createPage(res) {
  if (res.status === "FOUND") {
    let numGraphs = 0;

    createSearchHistory();
    Helper.createEnrollmentTitle(res);
    $("#graphs-radio").attr("checked", "checked");
    handleTableTab(res);
    handleQuarterTab(res);

    res.courseData.courses.forEach((course) => {
      if ((res.courseType === "all" || res.courseType === course.type) && Helper.hasInstructor(course.instructor, res.instructor) &&
        Helper.hasCourseCode(course.course_code, res.courseCode)) {
        createCourse(course, numGraphs);
        // The number of graphs will be used to keep track of the index of each graph
        createGraph(`enrollment-chart-${numGraphs}`, Helper.formatDates(course.dates), course.max, course.enrolled, course.waitlist);
        numGraphs++;
      }
    });

    if (numGraphs === 0) {
      Helper.createError("No data could be generated. Double-check your Course Type!");
    }
  } else if (res.status === "EMPTY INPUT") {
    Helper.createError("You need to specify more information! To successfully submit a course, select a Department, " +
      "Course Number, and Quarter. Alternatively, you can just enter a Course Code and Quarter.");
  } else if (res.status === "NOT FOUND") {
    Helper.createError("That specific course does not exist. Please try again!");
  } else {
    Helper.createError("An error happened! Please try again!");
  }
}


// This function inserts the course summary and graph for a particular
// course section (e.g., one of a course's lectures, discussions, labs, etc.)
function createCourse(course, courseIndex) {
  Helper.createCourseSummary(course, courseIndex, true);

  $("#enrollment-data").append(
    `<div class="collapse" id="chart-collapse-${courseIndex}">
      <div class="chart-container">
        <div class="chart">
          <canvas id="enrollment-chart-${courseIndex}"></canvas>
        </div>
      </div>
    </div>`);
}


// This function creates a course section's graph by configuring the Chart.js graph
function createGraph(graphID, dates, max, enrolled, waitlist) {
  // To make a line, we need at least two data points; thus, if there is only one 
  // data, we have to duplicate data points
  if (dates.length === 1) {
    dates.push(dates[0]);
    max.push(max[0]);
    enrolled.push(enrolled[0]);
  }

  let data = {
    labels: dates,
    datasets: [{
        label: "Enrolled",
        data: enrolled,
        fill: false,
        borderColor: "rgb(71,185,200)",
        backgroundColor: "rgb(71,185,200)",
      },
      {
        label: "Max",
        data: max,
        fill: false,
        borderColor: "rgb(201,71,47)",
        backgroundColor: "rgb(201,71,47)",
      },
    ]
  };

  // If the waitlist array has at least one number, create a line on the graph that 
  // is dedicated to the waitlist; note that a null data point means the waitlist 
  // is n/a or nonexistent on a certain day
  if (waitlist && waitlist.some((item) => !isNaN(item) && !isNaN(parseFloat(item)))) {
    data.datasets.push({
      label: "Waitlist",
      data: waitlist.map((item) => (!isNaN(item) && !isNaN(parseFloat(item))) ? Number(item) : null),
      fill: false,
      borderColor: "gray",
      backgroundColor: "gray",
    });
  }

  const config = {
    type: 'line',
    data: data,
    options: {
      responsive: true,
      maintainAspectRatio: true,
      layout: {
        padding: 10
      },
      interaction: {
        mode: 'index',
        intersect: false,
      },
      plugins: {
        title: {
          display: false,
        },
        tooltip: {
          enabled: false,
          position: 'nearest',
          external: externalTooltipHandler
        }
      },
      scales: {
        x: {
          title: {
            display: true,
            text: "Date",
            font: {
              size: 12,
              weight: "bold",
              padding: 10
            }
          }
        },
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: "Number of Students",
            font: {
              size: 12,
              weight: "bold",
              padding: 10
            }
          }
        }
      }
    }
  };

  window[graphID] = new Chart(document.getElementById(graphID), config);

  if ($(window).width() < "576") {
    window[graphID].options.aspectRatio = 1;
  }

  // If the screen is small, use an aspect ratio where the height is the 
  // same as the width; otherwise, make the graph wider
  $(window).resize(function () {
    if ($(window).width() < "576") {
      window[graphID].options.aspectRatio = 1;
    } else {
      window[graphID].options.aspectRatio = 2;
    }
  });
}