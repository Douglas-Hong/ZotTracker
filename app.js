require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const uri = process.env.MONGODB_URI;


const app = express();
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(express.static("public"));


mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const courseSchema = new mongoose.Schema({
  quarter: String,
  dept: String,
  number: String,
  title: String,
  course_codes: [String],
  instructors: [String],
  courses: {}
});
let Course = mongoose.model("Course", courseSchema, "enrollments");


app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});


app.get("/about", function (req, res) {
  res.sendFile(__dirname + "/views/about.html");
});


app.get("/announcements", function (req, res) {
  res.sendFile(__dirname + "/views/announcements.html");
});


app.get("/feedback", function (req, res) {
  res.sendFile(__dirname + "/views/feedback.html");
});


app.post("/", function (req, res) {
  if ((req.body.quarter === "" || req.body.dept === "" || req.body.number === "") && (req.body.quarter === "" || req.body.courseCode === "") 
    && (req.body.courseTitle === "" || req.body.quarter === "")) {
    res.send({
      status: "EMPTY INPUT"
    });
  } else {
    let query = {
      quarter: req.body.quarter,
      dept: req.body.dept,
      number: req.body.number
    };

    // If the user specified a course code and quarter, then we should use those
    // inputs instead; if a user specified a course title, then we should also use
    // that input instead
    if (req.body.courseCode && req.body.quarter) {
      query = {
        quarter: req.body.quarter,
        course_codes: {
          $in: req.body.courseCode
        }
      };
    } else if (req.body.courseTitle && req.body.quarter) {
      query = {
        quarter: req.body.quarter,
        title: req.body.courseTitle
      }
    }

    if (req.body.instructor) {
      query.instructors = {
        $in: req.body.instructor
      };
    }

    Course.findOne(query, function (err, course) {
      if (err) {
        res.send({
          status: "ERROR"
        });
      } else if (!course) {
        res.send({
          status: "NOT FOUND"
        });
      } else {
        const quarterQuery = query;
        delete quarterQuery.quarter;

        Course.find(quarterQuery, function (err, courses) {
          if (err) {
            res.send({
              status: "ERROR"
            });
          } else {
            const uniqueQuarters = courses.map((c) => c.quarter).filter((quar, index, arr) => arr.indexOf(quar) === index);
            
            // We store the original query in case the user clicks on this course in their search history
            res.send({
              status: "FOUND",
              originalQuery: req.body,
              courseData: course,
              courseType: req.body.courseType,
              instructor: req.body.instructor,
              courseCode: req.body.courseCode,
              quarters: uniqueQuarters
            });
          }
        });
      }
    });
  }
});


app.listen(process.env.PORT || 3000, function () {
  console.log("Server started on port 3000.");
});


// TODO:
// Google Analytics
// Navigation to other quarters when no quarter is specified