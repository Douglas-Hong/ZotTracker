// This scripts contains the functions that are used for each course's graphs
// and tables sections


const years = ["2021", "2020", "2019", "2018", "2017", "2016"];


// This functions converts the given WebSoc quarter value into its proper name
export function getQuarter(quarter) {
  const year = quarter.slice(0, 4);

  switch (quarter.slice(5, 7)) {
    case "92":
      return `Fall ${year}`;
    case "03":
      return `Winter ${year}`;
    case "14":
      return `Spring ${year}`;
    case "25":
      return `SS1 ${year}`;
    case "39":
      return `10-wk Summer ${year}`;
    case "51":
      return `Summer COM ${year}`;
    case "76":
      return `SS2 ${year}`;
    case "8F":
      return `Law Fall ${year}`;
  }
}


// This function determines if a certain course section has the given instructor;
// if the instructor is empty, true will still be returned
export function hasInstructor(instructors, instructor) {
  return instructor === "" || instructors.some((person) => person === instructor);
}


// This function determines if a certain course section has the given course code;
// if the course code is empty, true will still be returned
export function hasCourseCode(currentCourseCode, courseCode) {
  return courseCode === "" || currentCourseCode === courseCode;
}


// This function returns a string where each element in the given array is its own
// line; this is used for formatting multiple instructors/times/finals in a table cell
export function formatArray(array) {
  let arrayHTML = "";

  array.forEach((item) => {
    arrayHTML += `<p>${item}</p>`;
  });

  return arrayHTML;
}


// This function uses the given string to create an error message
export function createError(message) {
  $("#enrollment-data").html(
    `<div class="container-fluid">
      <div class="alert alert-danger alert-dismissible fade show error-message" role="alert">${message}</div>
    </div>`);
}


// This function translates each date in the given array of strings
// to a more readable form (month/day/year)
export function formatDates(dates) {
  return dates.map((date) => {
    let year = date.slice(2, 4);

    let month = date.slice(5, 7);
    if (month.startsWith("0")) {
      month = month.slice(1, 2);
    }

    let day = date.slice(8, 10);
    return `${month}/${day}/${year}`;
  });
}


// This function creates the title of the "Enrollment Data" section; it inserts 
// the "Enrollment Data" heading, title of the course, and the "Graphs" and "Tables" buttons
export function createEnrollmentTitle(res) {
  const courseData = res.courseData;
  const title = res.courseCode === "" ? `${courseData.dept} ${courseData.number} - ${courseData.title} (${getQuarter(courseData.quarter)})`
    : `Course Code: ${res.courseCode} (${getQuarter(courseData.quarter)})`;

  if (res.courseCode === "") {
    var subtitle = `<p class="enrollment-subheading">${res.instructor === "" ? "" : res.instructor + ", "}${res.courseType === "all" ? "All Course Types" : res.courseType}`;
  } else {
    var subtitle = `<p class="enrollment-subheading">${courseData.dept} ${courseData.number} - ${courseData.title}</p>`;
  }
  
  $("#enrollment-data").html(
    `<div class="container-fluid">
      <h1 class="heading">Enrollment Data</h1>
      <h4 class="enrollment-heading">${title}</h4>
      ${subtitle}
    </div>
    <div class="text-center">
      <div class="btn-group graph-table-nav" role="group">
        <input type="radio" class="btn-check" id="graph-radio" autocomplete="off">
        <label class="btn btn-outline-primary" for="graph-radio">Graphs</label>
        <input type="radio" class="btn-check" id="table-radio" autocomplete="off">
        <label class="btn btn-outline-primary" for="table-radio">Tables</label>
        <input type="radio" class="btn-check" id="quarters-radio" autocomplete="off">
        <label class="btn btn-outline-primary" for="quarters-radio">Quarters</label>
      </div>
    </div>`);
}


export function createQuarterTable(quarters) {
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


// This function adds the course summary to the "Enrollment Data" section; it inserts
// a table with the course code, course type, course section, course instructor(s), course time
// course location, and a button that allows the user to switch between graphs and tables
export function createCourseSummary(course, courseIndex, isGraph) {
  $("#enrollment-data").append(
    `<div class="container-fluid">
      <div class="table-responsiveness summary-table">
        <table class="table table-sm table-light table-striped table-bordered">
          <thead>
            <tr>
              <th scope="col">Code</th>
              <th scope="col">Type</th>
              <th scope="col">Sec</th>
              <th scope="col">Instructor</th>
              <th scope="col">Time</th>
              <th scope="col">Place</th>
              <th scope="col">${isGraph ? "Graph" : "Table"}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>${course["course_code"]}</td>
              <td>${course.type}</td>
              <td>${course.section}</td>
              <td class="table-list">${formatArray(course.instructor)}</td>
              <td class="table-list">${formatArray(course.time)}</td>
              <td class="table-list">${formatArray(course.place)}</td>
              <td class="text-center">
                <button class="btn btn-primary show-data-button" id="show-data-button-${courseIndex}"
                  type="button" data-bs-toggle="collapse" data-bs-target="#chart-collapse-${courseIndex}">Open
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>`);

  $("#show-data-button-" + courseIndex).on("click", function () {
    if ($(this).text().trim() === "Open") {
      $(this).text("Close");
    } else {
      $(this).text("Open");
    }
  });
}