import { createPage } from "./createGraph.js";
import * as Helper from "./enrollmentHelper.js";


export function handleGraphTableForm(res) {
  $("#graph-table-form").on("change", function () {
    $.ajax({
      url: "/graph-table-form",
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify(res),
      success: function (res) {
        const courseData = res.courseData;
        const title = `${courseData.dept} ${courseData.number} - ${courseData.title} (${Helper.getQuarter(courseData.quarter)})`;
        let numTables = 0;

        Helper.createEnrollmentTitle(title, false);

        // This post request deals with changing back to the graphs tab
        $("#graph-table-form").on("change", function () {
          $.ajax({
            url: "/",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify({
              status: "PREVIOUS",
              allData: res
            }),
            success: function (res) {
              createPage(res);
            }
          });
        });

        res.courseData.courses.forEach((course) => {
          if ((res.courseType === "all" || res.courseType === course.type) && Helper.hasInstructor(course.instructor, res.instructor) &&
            Helper.hasCourseCode(course.course_code, res.courseCode)) {
            createCourse(course, numTables);
            numTables++;
          }
        });
      }
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
        ${course.waitlist ? '<th scope="col">Waitlist</th>' : ''}
        <th scope="col">Req</th>
        ${course.nor ? '<th scope="col">Nor</th>' : ''}
        ${course.status ? '<th scope="col">Status</th>' : ''}
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