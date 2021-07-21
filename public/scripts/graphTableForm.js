import { createPage } from "./createGraph.js";
import * as Helper from "./enrollmentHelper.js";


export function handleGraphTableForm(res) {
  $("#graph-table-form").on("change", function () {
    $.ajax({
      url: "/graph-table-form",
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify({
        allData: res
      }),
      success: function (res) {
        const courseData = res.courseData;
        const title = `${courseData.dept} ${courseData.number} - ${courseData.title} (${Helper.getQuarter(courseData.quarter)})`;
        let numGraphs = 0;
        $("#enrollment-data").html(
          `<h1 class="heading">Enrollment Data</h1>
          <h4 class="enrollment-heading">${title}</h4>
          <form id="graph-table-form">
            <div class="text-center">
              <div class="btn-group graph-table-nav" role="group" aria-label="Basic radio toggle button group">
                <input type="radio" class="btn-check" name="btnradio" id="btnradio1" autocomplete="off">
                <label class="btn btn-outline-primary" for="btnradio1">Graphs</label>

                <input type="radio" class="btn-check" name="btnradio" id="btnradio2" autocomplete="off" checked>
                <label class="btn btn-outline-primary" for="btnradio2">Tables</label>
              </div>
            </div>
          </form>`);

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
            createEnrollmentSection(course, numGraphs);
            numGraphs++;
          }
        });
      }
    });
  });
}


function createEnrollmentSection(course, courseIndex) {
  $("#enrollment-data").append(
    `<div class="container-fluid">
      <div class="table-responsiveness enrollment-table">
        <table class="table table-sm table-light table-striped table-bordered">
          <thead>
            <tr>
              <th scope="col">Code</th>
              <th scope="col">Type</th>
              <th scope="col">Sec</th>
              <th scope="col">Instructor</th>
              <th scope="col">Time</th>
              <th scope="col">Place</th>
              <th scope="col">Table</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>${course["course_code"]}</td>
              <td>${course.type}</td>
              <td>${course.section}</td>
              <td class="table-list">${Helper.formatArray(course.instructor)}</td>
              <td class="table-list">${Helper.formatArray(course.time)}</td>
              <td class="table-list">${Helper.formatArray(course.place)}</td>
              <td class="text-center">
                <button class="btn btn-primary show-graph-button" id="show-graph-button-${courseIndex}"
                  type="button" data-bs-toggle="collapse" data-bs-target="#graph-collapse-${courseIndex}">Open</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="collapse" id="graph-collapse-${courseIndex}">
      <div class="graph-container">
        ${createTable(course)}
      </div>
    </div>`);

  $("#show-graph-button-" + courseIndex).on("click", function () {
    if ($(this).text().trim() === "Open") {
      $(this).text("Close");
    } else {
      $(this).text("Open");
    }
  });
}


function createTable(course) {
  return `<table class="table table-sm table-light table-striped table-bordered enrollment-table">
    <thead>
      <tr>
        <th scope="col">Date</th>
        <th scope="col">Enrolled</th>
        <th scope="col">Max</th>
        <th scope="col">Requested</th>
      </tr>
    </thead>
    <tbody>
      ${createTableBody(course)}
    </tbody>
  </table>`;
}


function createTableBody(course) {
  let body = "";
  let formattedDates = Helper.formatDates(course.dates);

  for (let i = 0; i < formattedDates.length; i++) {
    body += `<tr>
      <td>${formattedDates[i]}</td>
      <td>${course.enrolled[i]}</td>
      <td>${course.max[i]}</td>
      <td>${course.requested[i]}</td>
    </tr>`
  }

  return body;
}