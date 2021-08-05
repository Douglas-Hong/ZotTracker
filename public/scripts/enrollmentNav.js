// This script handles the other parts of the enrollment data section:
// the tables and quarters tab


import { createPage } from "./createGraph.js";
import * as Helper from "./enrollmentHelper.js";


const years = ["2021", "2020", "2019", "2018", "2017", "2016"];


// This function handles the event where the Tables button is clicked
export function handleTableTab(res) {
  $("#tables-radio").on("click", function () {
    let numTables = 0;

    Helper.createEnrollmentTitle(res);
    $("#tables-radio").attr("checked", "checked");
    $("#graphs-radio").on("click", function () {
      createPage(res);
    });
    handleQuarterTab(res);

    res.courseData.courses.forEach((course) => {
      if ((res.courseType === "all" || res.courseType === course.type) && Helper.hasInstructor(course.instructor, res.instructor) &&
        Helper.hasCourseCode(course.course_code, res.courseCode)) {
        createCourse(course, numTables);
        numTables++;
      }
    });
  });
}


// This function handles the event where the Quarters button is clicked
export function handleQuarterTab(res) {
  $("#quarters-radio").on("click", function() {    
    Helper.createEnrollmentTitle(res);
    $("#quarters-radio").attr("checked", "checked");
    $("#graphs-radio").on("click", function () {
      createPage(res);
    });
    handleTableTab(res);
    
    res.quarters.forEach((quarter) => {
      createHiddenForm(JSON.parse(JSON.stringify(res.originalQuery)), quarter);
    });

    $("#enrollment-data").append(createQuarterTable(res.quarters));

    res.quarters.forEach((quarter) => {
      $("#" + quarter).on("click", function() {
        $(`#form-${quarter}`).submit();
      });
    });
  });
}


// This function inserts the given course into the "Enrollment Data" section
function createCourse(course, courseIndex) {
  Helper.createCourseSummary(course, courseIndex, false);

  $("#enrollment-data").append(
    `<div class="collapse" id="chart-collapse-${courseIndex}">
      <div class="chart-container">
        ${createTable(course)}
      </div>
    </div>`);
}


// This function  creates the table associated with the given course section; it will
// include all the recorded dates, enrolled/max/req/waitlist/nor statistics, and statuses
function createTable(course) {
  return `<table class="table table-sm table-light table-striped table-bordered enrollment-table">
    <thead>
      <tr>
        <th scope="col">Date</th>
        <th scope="col">Enrolled</th>
        <th scope="col">Max</th>
        ${course.waitlist ? '<th scope="col">Waitlist</th>' : ""}
        <th scope="col">Req</th>
        ${course.nor ? '<th scope="col">Nor</th>' : ""}
        ${course.status ? '<th scope="col">Status</th>' : ""}
      </tr>
    </thead>
    <tbody>
      ${createTableBody(course)}
    </tbody>
  </table>`;
}


// This function generates the table body for a certain course section; each row contains
// all the enrollment data for one day
function createTableBody(course) {
  let body = "";
  let formattedDates = Helper.formatDates(course.dates);

  for (let i = 0; i < formattedDates.length; i++) {
    body += 
    `<tr>
      <td>${formattedDates[i]}</td>
      <td>${course.enrolled[i]}</td>
      <td>${course.max[i]}</td>
      ${course.waitlist ? `<td>${course.waitlist[i]}</td>` : ''}
      <td>${course.requested[i]}</td>
      ${course.nor ? `<td>${course.nor[i]}</td>` : ''}
      ${course.status ? `<td class="course-status" style="color: ${getStatusColor(course.status[i])}">${course.status[i]}</td>` : ''}
    </tr>`
  }

  return body;
}


// This function returns the color of the given status (according to WebSoc)
function getStatusColor(status) {
  if (status === "OPEN") {
    return "green";
  } else if (status === "Waitl") {
    return "red";
  } else if (status === "NewOnly") {
    return "blue";
  } else {
    return "black";
  }
}


// This function creates the table that shows which quarters offered
// a specific course
function createQuarterTable(quarters) {
  return `<div class="container-fluid">
    <div class="table-responsiveness quarter-table">
      <table class="table table-sm table-light table-striped table-bordered">
        <thead>
          <tr class="text-center">
            <th scope="col">Year</th>
            <th scope="col">Quarters Offered</th>
          </tr>
        </thead>
        <tbody>
          ${createQuarterBody(quarters)}
        </tbody>
      </table>
    </div>
  </div>`;
}


// This function iterates through the quarters a specific course is available and
// inserts them into the proper table cell
function createQuarterBody(quarters) {
  let body = "";

  years.forEach((year) => {
    body +=
      `<tr>
        <td scope="row">${year}</td>
        <td>`;

    const currYearQuarters = quarters.filter((quarter) => quarter.startsWith(year)).sort();
    currYearQuarters.forEach((quarter, index) => {
      if (index === currYearQuarters.length - 1) {
        body += `<a class="quarter-link" id="${quarter}">${getSimpleQuarter(quarter)}</a>`
      } else {
        body += `<a class="quarter-link" id="${quarter}">${getSimpleQuarter(quarter)}</a>, `
      }
    });
    
    body += 
      `</td>
      </tr>`;
  });

  return body;
}


function createHiddenForm(query, quarter) {
  $("#enrollment-data").append(
    `<form id="form-${quarter}" method="post" action="/" style="display:none;">
      <input name="dept" value="${query.dept}">
      <input name="number" value="${query.number}">
      <input name="quarter" value="${quarter}">
      <input name="instructor" value="${query.instructor}">
      <input name="courseTitle" value="${query.courseTitle}">
      <input name="courseCode" value="${query.courseCode}">
      <input name="courseType" value="${query.courseType}">
    </form>`
  );
}


// This functions converts the given WebSoc quarter value into its proper name (excluding the year)
function getSimpleQuarter(quarter) {
  switch (quarter.slice(5, 7)) {
    case "92":
      return `Fall`;
    case "03":
      return `Winter`;
    case "14":
      return `Spring`;
    case "25":
      return `Summer Session 1`;
    case "39":
      return `10-wk Summer`;
    case "51":
      return `Summer COM`;
    case "76":
      return `Summer Session 2`;
    case "8F":
      return `Law Fall`;
  }
}