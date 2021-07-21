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


export function hasInstructor(instructors, instructor) {
  return instructor === "" || instructors.some((person) => person === instructor);
}


export function hasCourseCode(currentCourseCode, courseCode) {
  return courseCode === "" || currentCourseCode === courseCode;
}


export function formatArray(array) {
  let arrayHTML = "";

  array.forEach((item) => {
    arrayHTML += `<p>${item}</p>`;
  });

  return arrayHTML;
}


export function createError(message) {
  $("#enrollment-data").html(
    `<div class="container-fluid">
      <div class="alert alert-danger alert-dismissible fade show error-message" role="alert">${message}</div>
    </div>`);
}


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


export function createEnrollmentTitle(title, hasGraph) {
  $("#enrollment-data").html(
    `<h1 class="heading">Enrollment Data</h1>
    <h4 class="enrollment-heading">${title}</h4>
    <form id="graph-table-form">
      <div class="text-center">
        <div class="btn-group graph-table-nav" role="group" aria-label="Basic radio toggle button group">
          <input type="radio" class="btn-check" name="btnradio" id="btnradio1" autocomplete="off" ${hasGraph ? "checked" : ""}>
          <label class="btn btn-outline-primary" for="btnradio1">Graphs</label>

          <input type="radio" class="btn-check" name="btnradio" id="btnradio2" autocomplete="off" ${hasGraph ? "" : "checked"}>
          <label class="btn btn-outline-primary" for="btnradio2">Tables</label>
        </div>
      </div>
    </form>`);
}


export function createCourseSummary(course, courseIndex, isGraph) {
  return `<div class="container-fluid">
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
                type="button" data-bs-toggle="collapse" data-bs-target="#chart-collapse-${courseIndex}">Open</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>`;
}