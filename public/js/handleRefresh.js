import { createPage } from '/js/createGraph.js';
import { createSearchHistory, addHistoryItem } from '/js/searchHistory.js';

// This function handles the page after the POST request; it renders the
// search history, displays the new enrollment data, and makes sure the form
// does not change when the user refreshes or clicks the back/forward button
export function handleRefresh(enrollment) {
  enrollment = decodeHtml(enrollment);
  createSearchHistory();

  if (enrollment !== '{}') {
    enrollment = JSON.parse(enrollment);

    if (enrollment.status === 'FOUND') {
      addHistoryItem(enrollment.originalQuery);
    }

    populateForm(enrollment.originalQuery);
    window.addEventListener('pageshow', () => {
      populateForm(enrollment.originalQuery);
    });

    createPage(enrollment);
  } else {
    // When the user navigates to the first time they open ZotTracker,
    // the form should have nothing in it
    window.addEventListener('pageshow', () => {
      $('.reset-button').click();
    });
  }
}

// This function decodes the HTML-encoded EJS object
function decodeHtml(html) {
  let txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
}

// This function fills in the user's query; this is used when the user
// refreshes the page or clicks the back/forward button
function populateForm(query) {
  $('#dept').val(query.dept);
  $('#course-num').val(query.number);
  $('#quarter').val(query.quarter);
  $('#instructor').val(query.instructor);
  $('#course-title').val(query.courseTitle);
  $('#course-code').val(query.courseCode);
  $('#course-type').val(query.courseType);

  if ($('#quarter').val() !== '') {
    $('#quarter').css('color', 'black');
  }
}
