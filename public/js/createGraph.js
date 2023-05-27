import * as Helper from './enrollmentHelper.js';
import { handleQuarterTab, handleTableTab } from './enrollmentNav.js';
import { createSearchHistory, popHistoryItem } from './searchHistory.js';
import { externalTooltipHandler } from './tooltipHandler.js';

const earliestQuarterTracked = '2021-76';

// This function creates the majority of the webpage; it displays the entire
// enrollment section
export function createPage(res) {
  if (res.status === 'FOUND') {
    let numGraphs = 0;

    Helper.createEnrollmentTitle(res);
    Helper.handleTabStyling('#graphs-radio', '#graphs-button');
    handleTableTab(res);
    handleQuarterTab(res);

    if (res.courseData.quarter < earliestQuarterTracked) {
      Helper.createWarning(
        'Warning: ZotTracker currently does not have the complete enrollment data for any quarter before 2021 Summer Session 2.'
      );
    }

    res.courseData.courses.forEach((course) => {
      if (Helper.isInterestingCourse(course, res.originalQuery)) {
        createCourse(course, numGraphs, res.openLec);
        numGraphs++;
      }
    });

    if (numGraphs === 0) {
      Helper.createError('No data could be generated. Double-check your Course Type!');
      popHistoryItem();
    }

    createSearchHistory();
  } else if (res.status === 'EMPTY INPUT') {
    Helper.createError(`You need to specify more information! To successfully submit a course, select a Department and Course Number. 
      For more help, check out the <a class="link" href="about" target="_blank">About</a> page!`);
  } else if (res.status === 'NOT FOUND') {
    Helper.createError('That specific course does not exist. Please try again!');
  } else {
    Helper.createError('An error happened! Please try again!');
  }
}

// This function inserts the course summary and graph for a particular
// course section (e.g., one of a course's lectures, discussions, labs, etc.)
function createCourse(course, courseIndex) {
  Helper.createCourseSummary(course, courseIndex, true);

  $('#enrollment-data').append(
    `<div class="collapse" id="chart-collapse-${courseIndex}">
      <div class="chart-container">
        <div class="chart">
          <canvas id="enrollment-chart-${courseIndex}"></canvas>
        </div>
      </div>
    </div>`
  );

  createGraph(
    `enrollment-chart-${courseIndex}`,
    courseIndex,
    Helper.formatDates(course.dates),
    course.max,
    course.enrolled,
    course.waitlist
  );

  if (course.type === 'LEC') {
    $(`#show-data-button-${courseIndex}`).click();
  }
}

// This function creates a course section's graph by configuring the Chart.js graph
function createGraph(graphID, numGraphs, dates, max, enrolled, waitlist) {
  // To make a line, we need at least two data points; thus, if there is only one
  // data, we have to duplicate data points
  if (dates.length === 1) {
    dates.push(dates[0]);
    max.push(max[0]);
    enrolled.push(enrolled[0]);
  }

  let data = {
    labels: dates,
    datasets: [
      {
        label: 'Enrolled',
        data: enrolled,
        fill: false,
        borderColor: '#607eaa',
        backgroundColor: '#607eaa',
      },
      {
        label: 'Max',
        data: max,
        fill: false,
        borderColor: '#E63946',
        backgroundColor: '#E63946',
      },
    ],
  };

  // If the waitlist array has at least one number, create a line on the graph that
  // is dedicated to the waitlist; note that a null data point means the waitlist
  // is n/a or nonexistent on a certain day
  if (waitlist && waitlist.some((item) => !isNaN(item) && !isNaN(parseFloat(item)))) {
    data.datasets.push({
      label: 'Waitlist',
      data: waitlist.map((item) => (!isNaN(item) && !isNaN(parseFloat(item)) ? Number(item) : null)),
      fill: false,
      borderColor: 'gray',
      backgroundColor: 'gray',
    });
  }

  Chart.defaults.font.family = 'Inter';
  const config = {
    type: 'line',
    data: data,
    options: {
      responsive: true,
      maintainAspectRatio: true,
      animation: {
        duration: 2000,
      },
      layout: {
        padding: 10,
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
          external: externalTooltipHandler,
        },
      },
      scales: {
        x: {
          title: {
            display: true,
            text: 'Date',
            font: {
              size: 12,
              weight: 'bold',
              padding: 10,
            },
          },
        },
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Number of Students',
            font: {
              size: 12,
              weight: 'bold',
              padding: 10,
            },
          },
        },
      },
    },
  };

  window[graphID] = new Chart(document.getElementById(graphID), config);

  if ($(window).width() < '576') {
    window[graphID].options.aspectRatio = 1;
  }

  // If the screen is small, use an aspect ratio where the height is the
  // same as the width; otherwise, make the graph wider
  $(window).resize(() => {
    if ($(window).width() < '576') {
      window[graphID].options.aspectRatio = 1;
    } else {
      window[graphID].options.aspectRatio = 2;
    }
  });

  $('#show-data-button-' + numGraphs).on('click', function () {
    if ($(this).text() === 'Close') {
      window[graphID].destroy();
      window[graphID] = new Chart(document.getElementById(graphID), config);
    }
  });
}
