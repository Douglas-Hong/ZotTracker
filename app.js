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


app.get("/", (req, res) => {
  res.render("index.ejs", {
    enrollment: "{}"
  });
});


app.get("/about", (req, res) => {
  res.render("about.ejs");
});


app.get("/announcements", (req, res) => {
  res.render("announcements.ejs");
});


app.get("/feedback", (req, res) => {
  res.render("feedback.ejs");
});


app.post("/", (req, res) => {
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
      if (req.body.hasOwnProperty(key) && req.body[key] && !(key === "courseType" && req.body.courseType === "all")) {
        if (key === "courseCode") {
          query["courses.course_code"] = req.body.courseCode;
        } else if (key === "courseTitle") {
          // All course titles in WebSoc are uppercase
          query.title = req.body.courseTitle.toUpperCase();
        } else if (key === "instructor") {
          query["courses.instructor"] = req.body.instructor;
        } else if (key === "number") {
          // The course number should be case-insensitive and whitespace-insensitive
          query.number = req.body.number.toUpperCase().replace(/\ /g, "");
        } else if (key === "courseType") {
          query["courses.type"] = req.body.courseType;
        } else {
          query[key] = req.body[key];
        }
      }
    }

    Course.findOne(query, (err, course) => {
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

        Course.find(quartersQuery, (err, courses) => {
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
                quarters: uniqueQuarters
              })
            });
          }
        });
      }
    });
  }
});


app.listen(process.env.PORT || 3000, () => {
  console.log("Server started on port 3000.");
});


// TODO:
// Navigation to other quarters when no quarter is specified
// Add better animations to graphs
// Update search history subheadings
// Quarter search does not work with course type (try ICS 31 Lecture in 2018)
// Note: test what happens if the instructor of a course changes from STAFF to a real name; try 33303