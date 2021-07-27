import { externalTooltipHandler } from "./tooltipHandler.js";
import { handleQuarterTab, handleTableTab } from "./graphTableForm.js";
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


$(document).ready(function () {
  $("#course-form").on("submit", function (event) {
    event.preventDefault();

    const dept = $("#dept").val();
    const quarter = $("#quarter").val();
    // This makes the course number case-insensitive and whitespace-insensitive
    const number = $("#course-num").val().toUpperCase().replace(/\ /g, "");
    const courseType = $("#course-type").val();
    const instructor = $("#instructor").val();
    const courseCode = $("#course-code").val();

    $.ajax({
      url: "/",
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify({
        dept: dept,
        quarter: quarter,
        number: number,
        courseType: courseType,
        instructor: instructor,
        courseCode: courseCode
      }),
      success: function (res) {
        createPage(res);
      }
    });
  });
});


// This function creates the majority of the webpage; it displays the entire
// enrollment section
export function createPage(res) {
  if (res.status === "FOUND") {
    let numGraphs = 0;

    createSearchHistory();
    Helper.createEnrollmentTitle(res);
    $("#graph-radio").attr("checked", "checked");
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

    // If no graphs can be generated, display an error; otherwise, scroll to the "Enrollment Data" section
    if (numGraphs === 0) {
      Helper.createError("No graphs can be created because this instructor did not teach this specific course!");
    } else {
      let history = JSON.parse(localStorage.getItem("searchHistory"));
      history.push(res.originalQuery);
      localStorage.setItem("searchHistory", JSON.stringify(history));

      $("html, body").animate({
        scrollTop: $("#enrollment-data").offset().top
      }, 250);
    }
  } else if (res.status === "EMPTY INPUT") {
    Helper.createError("You need to specify more information! To successfully submit a course, select a Department, " +
      "Course Number, and Quarter. Alternatively, you can just enter a Course Code and Quarter.");
  } else {
    Helper.createError("That specific course does not exist. Please try again!");
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
    handleOneElementArrays(dates, max, enrolled);
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
  // is dedicated to the waitlist
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


// This function duplicates the first element of the array and appends
// it to the end
function handleOneElementArrays(dates, max, enrolled) {
  dates.push(dates[0]);
  max.push(max[0]);
  enrolled.push(enrolled[0]);
}