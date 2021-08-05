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
app.set("view engine", "ejs");


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
  res.render("index.ejs", {
    enrollment: JSON.stringify({})
  });
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
    res.render("index.ejs", {
      enrollment: JSON.stringify({
        status: "EMPTY INPUT",
        originalQuery: req.body
      })
    });
  } else {
    let query = {};

    for (let key in req.body) {
      if (req.body.hasOwnProperty(key) && req.body[key] && key !== "courseType") {
        if (key === "courseCode") {
          query.course_codes = {
            $in: req.body.courseCode
          };
        } else if (key === "courseTitle") {
          query.title = req.body.courseTitle;
        } else if (key === "instructor") {
          query.instructors = {
            $in: req.body.instructor
          };
        } else if (key === "number") {
          query.number = req.body.number.toUpperCase().replace(/\ /g, "");
        } else {
          query[key] = req.body[key];
        }
      }
    }

    Course.findOne(query, function (err, course) {
      if (err) {
        res.render("index.ejs", {
          enrollment: JSON.stringify({
            status: "ERROR",
            originalQuery: req.body
          })
        });
      } else if (!course) {
        res.render("index.ejs", {
          enrollment: JSON.stringify({
            status: "NOT FOUND",
            originalQuery: req.body
          })
        });
      } else {
        let quartersQuery = JSON.parse(JSON.stringify(query));
        delete quartersQuery.quarter;

        Course.find(quartersQuery, function (err, courses) {
          if (err) {
            res.render("index.ejs", {
              enrollment: JSON.stringify({
                status: "ERROR",
                originalQuery: req.body
              })
            });
          } else {
            const uniqueQuarters = courses.map((c) => c.quarter).filter((quar, index, arr) => arr.indexOf(quar) === index);
            // We store the original query in case the user clicks on this course in their search history
            res.render("index.ejs", {
              enrollment: JSON.stringify({
                status: "FOUND",
                originalQuery: req.body,
                courseData: course,
                courseType: req.body.courseType,
                instructor: req.body.instructor,
                courseCode: req.body.courseCode,
                quarters: uniqueQuarters
              })
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
// Navigation to other quarters when no quarter is specified
// Add better animations to graphs