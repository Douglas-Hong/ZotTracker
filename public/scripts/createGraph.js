import { externalTooltipHandler } from "./tooltipHandler.js";
import { handleGraphTableForm } from "./graphTableForm.js";
import * as Helper from "./enrollmentHelper.js";


if (!Cookies.get("searchHistory") || JSON.parse(Cookies.get("searchHistory")).length === 0) {
  Cookies.set("searchHistory", JSON.stringify([]));
  $(".offcanvas-body").html("You haven't searched anything yet!");
} else {
  createSearchHistory();
}


$(document).ready(function () {
  $("#course-form").on("submit", function (event) {
    event.preventDefault();

    const dept = $("#dept").val();
    const quarter = $("#quarter").val();
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
        if (res.status === "FOUND") {
          let oldHistory = JSON.parse(Cookies.get("searchHistory"));
          oldHistory.push(res.originalQuery);
          Cookies.set("searchHistory", JSON.stringify(oldHistory));
        }
        createPage(res);
      }
    });
  });
});


export function createPage(res) {
  if (res.status === "FOUND") {
    const courseData = res.courseData;
    const title = `${courseData.dept} ${courseData.number} - ${courseData.title} (${Helper.getQuarter(courseData.quarter)})`;
    let numGraphs = 0;

    createSearchHistory();
    Helper.createEnrollmentTitle(title, true);
    handleGraphTableForm(res);

    res.courseData.courses.forEach((course) => {
      if ((res.courseType === "all" || res.courseType === course.type) && Helper.hasInstructor(course.instructor, res.instructor) &&
        Helper.hasCourseCode(course.course_code, res.courseCode)) {
        createEnrollmentSection(course, numGraphs);
        createGraph(`enrollment-chart-${numGraphs}`, Helper.formatDates(course.dates), course.max, course.enrolled, course.waitlist);
        numGraphs++;
      }
    });

    if (numGraphs === 0) {
      Helper.createError("No graphs can be created because this instructor did not teach this specific course!");
    }
  } else if (res.status === "EMPTY INPUT") {
    Helper.createError("You need to specify more information! To successfully submit a course, select a Department, " +
      "Course Number, and Quarter. Alternatively, you can just enter a Course Code and Quarter.");
  } else {
    Helper.createError("That specific course does not exist. Please try again!");
  }
}

function createEnrollmentSection(course, courseIndex) {
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


function createSearchHistory() {
  $(".offcanvas-body").html("<p>Click a course below to see its enrollment data again!</p>");

  const history = JSON.parse(Cookies.get("searchHistory"));
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
      $("#history-item-" + index).append(
        `<p class="history-subheading">${item.instructor}, ${item.courseType === "all" ? "All Course Types" : item.courseType}</p>`
      );
    } else {
      $("#history-item-" + index).append(
        `<p class="history-subheading">${item.courseType === "all" ? "All Course Types" : item.courseType}</p>`
      );
    }

    $("#history-item-" + index).on("click", function() {
      $.ajax({
        url: "/",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(JSON.parse(Cookies.get("searchHistory"))[history.length - index - 1]),
        success: function (res) {
          createPage(res);
        }
      });
    });
  });
}


function createGraph(graphID, dates, max, enrolled, waitlist) {
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

  $(window).resize(function () {
    if ($(window).width() < "576") {
      window[graphID].options.aspectRatio = 1;
    } else {
      window[graphID].options.aspectRatio = 2;
    }
  });
}


function handleOneElementArrays(dates, max, enrolled) {
  dates.push(dates[0]);
  max.push(max[0]);
  enrolled.push(enrolled[0]);
}