// This script contains the functions that have broad uses (e.g., they are used for multiple enrollment tabs)


// This function creates the title of the "Enrollment Data" section; it inserts 
// the "Enrollment Data" heading, the title of the course, and the Graphs/Tables/Quarters buttons
export function createEnrollmentTitle(res) {
  const courseData = res.courseData;
  const query = res.originalQuery;

  if (query.courseCode !== "") {
    var title = `Course Code: ${query.courseCode} (${getQuarter(courseData.quarter)})`;
    var subtitle = `${courseData.dept} ${courseData.number} - ${courseData.title}`;
  } else if (query.courseTitle !== "") {
    var title = `${courseData.title} (${getQuarter(courseData.quarter)})`;
    var subtitle = `${query.instructor === "" ? "" : query.instructor.toUpperCase() + ", "}${getCourseType(query.courseType)}`;
  } else {
    var title = `${courseData.dept} ${courseData.number} (${getQuarter(courseData.quarter)})`;
    var subtitle = `${query.instructor === "" ? "" : query.instructor.toUpperCase() + ", "}${getCourseType(query.courseType)}`;
  }
  
  $("#enrollment-data").html(
    `<div class="container-fluid">
      <h1 class="heading">Enrollment Data</h1>
      <h4 class="enrollment-heading">${title}</h4>
      <p class="enrollment-subheading">${subtitle}</p>
    </div>
    <div class="text-center">
      <div class="btn-group tab-group" role="group">
        <input type="radio" class="btn-check" id="graphs-radio" autocomplete="off">
        <label class="btn btn-outline-secondary" id="graphs-button" for="graphs-radio">Graphs</label>
        <input type="radio" class="btn-check" id="tables-radio" autocomplete="off">
        <label class="btn btn-outline-secondary" id="tables-button" for="tables-radio">Tables</label>
        <input type="radio" class="btn-check" id="quarters-radio" autocomplete="off">
        <label class="btn btn-outline-secondary" id="quarters-button" for="quarters-radio">Quarters</label>
      </div>
    </div>`
  );
}


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


// This function translates the course type that WebSoc uses into something
// more readable
export function getCourseType(type) {
  switch (type) {
    case "all":
      return "All Course Types";
    case "LEC":
      return "Lecture";
    case "LAB":
      return "Lab";
    case "DIS":
      return "Discussion";
    case "SEM":
      return "Seminar";
    case "FLD":
      return "Field Work";
    case "RES":
      return "Research";
    case "ACT":
      return "Activity";
    case "TUT":
      return "Tutorial";
    case "COL":
      return "Colloquium";
    case "STU":
      return "Studio";
  }
}


// This function returns true if the course should be shown in the enrollment data section;
// a course will be shown if the course type is applicable, the instructor teaches the course,
// and/or the course code matches
export function isInterestingCourse(course, query) {
  const hasCourseType = query.courseType === "all" || query.courseType === course.type;
  const hasInstructor = query.instructor === "" || course.instructor.some((person) => person === query.instructor.toUpperCase());
  const hasCourseCode = query.courseCode === "" || course.course_code === query.courseCode;
  return hasCourseType && hasInstructor && hasCourseCode;
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
    if (day.startsWith("0")) {
      day = day.slice(1, 2);
    }
    return `${month}/${day}/${year}`;
  });
}


// This function uses the given string to create an error message
export function createError(message) {
  $("#enrollment-data").html(
    `<div class="container-fluid">
      <div class="alert alert-danger alert-dismissible fade show error-message" role="alert">${message}</div>
    </div>`
  );
}


// This function adds the course summary to the "Enrollment Data" section; it inserts
// a table with the course code, course type, course section, course instructor(s), course time
// course location, and a button that allows the user to switch between graphs and tables
export function createCourseSummary(course, courseIndex, isGraph) {
  $("#enrollment-data").append(
    `<div class="course-summary">
      <table class="data-table summary-table">
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
            <td class="text-center align-middle">
              <button class="btn btn-secondary show-data-button custom-button" id="show-data-button-${courseIndex}"
                type="button" data-bs-toggle="collapse" data-bs-target="#chart-collapse-${courseIndex}">Open
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>`
  );

  $("#show-data-button-" + courseIndex).on("click", function () {
    if ($(this).text().trim() === "Open") {
      $(this).text("Close");
    } else {
      $(this).text("Open");
    }
  });
}


// This function returns a string where each element in the given array is its own
// line; this is used for formatting multiple instructors/times/finals in a table cell
function formatArray(array) {
  let arrayHTML = "";

  array.forEach((item) => {
    arrayHTML += `<p>${item}</p>`;
  });

  return arrayHTML;
}


export function handleTabStyling(currentTabRadio, currentTabButton) {
  $(currentTabRadio).prop("checked", true);

  replaceClass("#graphs-button", "current-tab", "other-tab");
  replaceClass("#tables-button", "current-tab", "other-tab");
  replaceClass("#quarters-button", "current-tab", "other-tab");

  if (currentTabButton === "#graphs-button") {
    replaceClass(currentTabButton, "other-tab", "current-tab");
  } else if (currentTabButton === "#tables-button") {
    replaceClass(currentTabButton, "other-tab", "current-tab");
  } else {
    replaceClass(currentTabButton, "other-tab", "current-tab");  
  }
}


function replaceClass(id, classToRemove, classToAdd) {
  $(id).removeClass(classToRemove);
  $(id).addClass(classToAdd);
}
