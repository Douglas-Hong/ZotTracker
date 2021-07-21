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