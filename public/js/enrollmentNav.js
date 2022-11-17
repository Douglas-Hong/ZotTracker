// This script handles the other parts of the enrollment data section:
// the tables and quarters tab

import { createPage } from './createGraph.js';
import * as Helper from './enrollmentHelper.js';

const years = ['2023', '2022', '2021', '2020', '2019', '2018', '2017', '2016'];

// This function handles the event where the Tables button is clicked
export function handleTableTab(res) {
  $('#tables-radio').on('click', () => {
    let numTables = 0;
    const query = res.originalQuery;

    Helper.createEnrollmentTitle(res);
    Helper.handleTabStyling('#tables-radio', '#tables-button');
    $('#graphs-radio').on('click', () => {
      createPage(res);
    });
    handleQuarterTab(res);

    res.courseData.courses.forEach((course) => {
      if (Helper.isInterestingCourse(course, query)) {
        createCourse(course, numTables);
        numTables++;
      }
    });
  });
}

// This function handles the event where the Quarters button is clicked
export function handleQuarterTab(res) {
  $('#quarters-radio').on('click', () => {
    Helper.createEnrollmentTitle(res);
    Helper.handleTabStyling('#quarters-radio', '#quarters-button');
    $('#graphs-radio').on('click', () => {
      createPage(res);
    });
    handleTableTab(res);
    $('#enrollment-data').append(createQuarterTable(res.quarters));

    res.quarters.forEach((quarter) => {
      createHiddenForm(JSON.parse(JSON.stringify(res.originalQuery)), quarter);
      $('#' + quarter).on('click', () => {
        $(`#form-${quarter}`).submit();
      });
    });
  });
}

// This function inserts the given course into the 'Enrollment Data' section; this includes
// the course's summary and all the relevant enrollment data
function createCourse(course, courseIndex) {
  Helper.createCourseSummary(course, courseIndex, false);

  $('#enrollment-data').append(
    `<div class="collapse" id="chart-collapse-${courseIndex}">
      ${createCollapsibleTable(course, courseIndex, 1)}
    </div>`
  );

  $('body').on('click', `#show-day-button-${courseIndex}`, () => {
    $(`#chart-collapse-${courseIndex}`).html(createCollapsibleTable(course, courseIndex, 1));
  });

  $('body').on('click', `#show-week-button-${courseIndex}`, () => {
    $(`#chart-collapse-${courseIndex}`).html(createCollapsibleTable(course, courseIndex, 7));
  });

  $('body').on('click', `#show-month-button-${courseIndex}`, () => {
    $(`#chart-collapse-${courseIndex}`).html(createCollapsibleTable(course, courseIndex, 30));
  });
}

function createCollapsibleTable(course, courseIndex, dayIncrement) {
  return `<div class="chart-container">${createTable(course, courseIndex, dayIncrement)}</div>`;
}

// This function  creates the table associated with the given course section; it will
// include all the recorded dates, enrolled/max/req/waitlist/nor statistics, and statuses
function createTable(course, courseIndex, dayIncrement) {
  return `<table class="data-table enrollment-table table table-bordered">
      <thead>
        <tr>
          <th scope="col" class="date-col">
            Date
            <div class="dropdown">
              <button class="btn btn-secondary dropdown-toggle date-col-button" type="button" id="date-dropdown-${courseIndex}" data-bs-toggle="dropdown" aria-expanded="false"></button>
              <ul class="dropdown-menu" aria-labelledby="date-dropdown-${courseIndex}">
                <li><a class="dropdown-item date-col-item" id="show-day-button-${courseIndex}">Show every day</a></li>
                <li><a class="dropdown-item date-col-item" id="show-week-button-${courseIndex}">Show every week</a></li>
                <li><a class="dropdown-item date-col-item" id="show-month-button-${courseIndex}">Show every month</a></li>
              </ul>
            </div>
          </th>
          <th scope="col">Enrolled</th>
          <th scope="col">Max</th>
          ${course.waitlist ? '<th scope="col">Waitlist</th>' : ''}
          <th scope="col">Req</th>
          ${course.nor ? '<th scope="col">Nor</th>' : ''}
          ${course.status ? '<th scope="col">Status</th>' : ''}
        </tr>
      </thead>
      <tbody>
        ${createTableBody(course, dayIncrement)}
      </tbody>
    </table>`;
}

// This function generates the table body for a certain course section; each row contains
// all the enrollment data for one day
function createTableBody(course, dayIncrement) {
  let body = '';
  let formattedDates = Helper.formatDates(course.dates);

  for (let i = 0; i < formattedDates.length; i += dayIncrement) {
    body += `<tr>
        <td>${formattedDates[i]}</td>
        <td>${course.enrolled[i]}</td>
        <td>${course.max[i]}</td>
        ${course.waitlist ? `<td>${course.waitlist[i]}</td>` : ''}
        <td>${course.requested[i]}</td>
        ${course.nor ? `<td>${course.nor[i] == null ? 'N/A' : course.nor[i]}</td>` : ''}
        ${
          course.status
            ? `<td class="course-status" style="color: ${getStatusColor(course.status[i])}">${course.status[i]}</td>`
            : ''
        }
      </tr>`;
  }

  return body;
}

// This function returns the color of the given status (according to WebSoc)
function getStatusColor(status) {
  if (status === 'OPEN') {
    return 'green';
  } else if (status === 'Waitl') {
    return 'red';
  } else if (status === 'NewOnly') {
    return 'blue';
  } else {
    return 'black';
  }
}

// This function creates the table that shows which quarters offered a specific course
function createQuarterTable(quarters) {
  return `<div class="container-fluid">
      <table class="data-table quarter-table table table-bordered">
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
    </div>`;
}

// This function iterates through the quarters a specific course is available and
// inserts them into the proper table cell
function createQuarterBody(quarters) {
  let body = '';

  years.forEach((year) => {
    body += `<tr>
        <td scope="row">${year}</td>
        <td>`;

    const currYearQuarters = quarters.filter((quarter) => quarter.startsWith(year)).sort();
    currYearQuarters.forEach((quarter, index) => {
      if (index === currYearQuarters.length - 1) {
        body += `<a class="quarter-link" id="${quarter}">${getSimpleQuarter(quarter)}</a>`;
      } else {
        body += `<a class="quarter-link" id="${quarter}">${getSimpleQuarter(quarter)}</a>, `;
      }
    });

    body += `  </td>
      </tr>`;
  });

  return body;
}

// This function creates a hidden form; if the specific quarter is clicked, this form
// will be submitted and the new enrollment data will be displayed
function createHiddenForm(query, quarter) {
  $('#enrollment-data').append(
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
    case '92':
      return `Fall`;
    case '03':
      return `Winter`;
    case '14':
      return `Spring`;
    case '25':
      return `Summer Session 1`;
    case '39':
      return `10-wk Summer`;
    case '51':
      return `Summer COM`;
    case '76':
      return `Summer Session 2`;
    case '8F':
      return `Law Fall`;
  }
}
