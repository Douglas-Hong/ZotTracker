require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const uri = process.env.MONGODB_URI;


const app = express();
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(express.static('public'));
app.set('view engine', 'ejs');


mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const courseSchema = new mongoose.Schema({
  quarter: String,
  dept: String,
  number: String,
  title: String,
  courses: {}
});
let Enrollment = mongoose.model('Course', courseSchema, 'enrollments');
const quarterBeingTracked = '2022-25';


app.get('/', (req, res) => {
  if (JSON.stringify(req.query) !== JSON.stringify({})) {
    processQuery(res, fillQuery(req.query));
  } else {
    res.render('index.ejs', {
      enrollment: '{}'
    });
  }
});


app.get('/about', (req, res) => {
  res.render('about.ejs');
});


app.get('/announcements', (req, res) => {
  res.render('announcements.ejs');
});


app.get('/feedback', (req, res) => {
  res.render('feedback.ejs');
});


app.post('/', (req, res) => {
  processQuery(res, req.body);
});


app.listen(process.env.PORT || 3000, () => {
  console.log('Server started on port 3000.');
});


function fillQuery(query) {
  const parameters = ['dept', 'number', 'quarter', 'instructor', 'courseTitle', 'courseCode', 'courseType'];

  parameters.forEach((param) => {
    if (!(param in query)) {
      query[param] = '';
    }
  })

  return query;
}


function formatQuery(queryBody) {
  let query = {};

  for (let key in queryBody) {
    if (queryBody.hasOwnProperty(key) && queryBody[key] && !(key === 'courseType' && queryBody.courseType === 'all')) {
      if (key === 'courseCode') {
        query['courses.course_code'] = queryBody.courseCode;
      } else if (key === 'courseTitle') {
        // All course titles in WebSoc are uppercase
        query.title = queryBody.courseTitle.toUpperCase();
      } else if (key === 'instructor') {
        query['courses.instructor'] = queryBody.instructor.toUpperCase();
      } else if (key === 'number') {
        // The course number should be case-insensitive and whitespace-insensitive
        query.number = queryBody.number.toUpperCase().replace(/\ /g, '');
      } else if (key === 'courseType') {
        query['courses.type'] = queryBody.courseType;
      } else {
        query[key] = queryBody[key];
      }
    }
  }

  return query;
}


function renderError(errorMessage, res, queryBody) {
  res.render('index.ejs', {
    enrollment: JSON.stringify({
      status: errorMessage,
      originalQuery: queryBody
    })
  });
}


function renderResults(course, quarters, res, queryBody) {
  // We store the original query in case the user clicks on this course in their search history
  res.render('index.ejs', {
    enrollment: JSON.stringify({
      status: 'FOUND',
      originalQuery: queryBody,
      courseData: course,
      quarters: quarters
    })
  });
}


function processQuery(res, queryBody) {
  // Valid minimum input combinations: dept/course number, course code, course title, instructor/course number
  if ((queryBody.dept === '' || queryBody.number === '') && (queryBody.courseCode === '') && (queryBody.courseTitle === '') && (queryBody.instructor === '' || queryBody.number === '')) {
    renderError('EMPTY INPUT', res, queryBody);
  } else {
    let query = formatQuery(queryBody);

    Enrollment.find(query, (err, courses) => {
      if (err) {
        renderError('ERROR', res, queryBody);
      } else if (courses.length === 0) {
        renderError('NOT FOUND', res, queryBody);
      } else {
        if ('quarter' in query) {
          // If the user specified a quarter, delete it to get a broader query
          let quartersQuery = JSON.parse(JSON.stringify(query));
          delete quartersQuery.quarter;
  
          Enrollment.find(quartersQuery, (err, quarterCourses) => {
            if (err) {
              renderError('NOT FOUND', res, queryBody);
            } else {
              const uniqueQuarters = quarterCourses.map((c) => c.quarter).filter((quar, index, arr) => arr.indexOf(quar) === index);
              renderResults(courses[courses.length - 1], uniqueQuarters, res, queryBody);
            }
          });
        } else {
          const uniqueQuarters = courses.map((c) => c.quarter).filter((quar, index, arr) => arr.indexOf(quar) === index);

          // If the quarter isn't specified and the course is being offered in the quarter that
          // is currently being tracked, render the results for the next most recent quarter because
          // that quarter has a complete set of data
          if (courses[courses.length - 1].quarter >= quarterBeingTracked) {
            const notTrackedCourse = courses.slice().reverse().find((course) => course.quarter < quarterBeingTracked);

            if (notTrackedCourse === undefined) {
              renderResults(courses[courses.length - 1], uniqueQuarters, res, queryBody);
            } else {
              renderResults(notTrackedCourse, uniqueQuarters, res, queryBody);
            }
          } else {
            renderResults(courses[courses.length - 1], uniqueQuarters, res, queryBody);
          }
        }
      }
    });
  }
}

// TODO:
// If quarter is not immediately found, just search for the latest quarter the class is in
// Update possible departments