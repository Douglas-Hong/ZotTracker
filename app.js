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
let Course = mongoose.model('Course', courseSchema, 'enrollments');


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


function processQuery(res, queryBody) {
  if ((queryBody.quarter === '' || queryBody.dept === '' || queryBody.number === '') && (queryBody.quarter === '' || queryBody.courseCode === '') 
    && (queryBody.courseTitle === '' || queryBody.quarter === '')) {
    res.render('index.ejs', {
      enrollment: JSON.stringify({
        status: 'EMPTY INPUT',
        originalQuery: queryBody
      })
    });
  } else {
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

    Course.findOne(query, (err, course) => {
      if (err) {
        res.render('index.ejs', {
          enrollment: JSON.stringify({
            status: 'ERROR',
            originalQuery: queryBody
          })
        });
      } else if (!course) {
        res.render('index.ejs', {
          enrollment: JSON.stringify({
            status: 'NOT FOUND',
            originalQuery: queryBody
          })
        });
      } else {
        let quartersQuery = JSON.parse(JSON.stringify(query));
        delete quartersQuery.quarter;

        Course.find(quartersQuery, (err, courses) => {
          if (err) {
            res.render('index.ejs', {
              enrollment: JSON.stringify({
                status: 'ERROR',
                originalQuery: queryBody
              })
            });
          } else {
            const uniqueQuarters = courses.map((c) => c.quarter).filter((quar, index, arr) => arr.indexOf(quar) === index);
            // We store the original query in case the user clicks on this course in their search history
            res.render('index.ejs', {
              enrollment: JSON.stringify({
                status: 'FOUND',
                originalQuery: queryBody,
                courseData: course,
                quarters: uniqueQuarters
              })
            });
          }
        });
      }
    });
  }
}

// TODO:
// Navigation to other quarters when no quarter is specified
// Add better animations to graphs
// Update search history subheadings
// Quarter search does not work with course type (try ICS 31 Lecture in 2018)
// Note: test what happens if the instructor of a course changes from STAFF to a real name; try 33303

// Redo Google Analytics, and make query paramters less restrictive/able to leave out certain inputs/keys
// If quarter is not immediately found, just search for the latest quarter the class is in
// Move to Vercel