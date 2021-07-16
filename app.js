require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const uri = process.env.MONGODB_URI;


const app = express();
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.set("view engine", "ejs");
app.use(express.static("public"));


mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});
const courseSchema = new mongoose.Schema({
    quarter: String,
    dept: String,
    number: String,
    title: String,
    date: String,
    courses: {}
});
var Course = mongoose.model("Course", courseSchema, "enrollments");


app.get("/", function (req, res) {
    res.render("index.ejs");
});


app.post("/", function (req, res) {
    Course.findOne({
            quarter: req.body.quarter,
            dept: req.body.dept,
            number: req.body.number
        },
        function (err, course) {
            if (err) {
                console.log(err);
            } else if (!course) {
                res.send({success: false});
            } else {
                res.send({success: true, courseData: course, courseType: req.body.courseType});
            }
        });
});


app.listen(process.env.PORT || 3000, function () {
    console.log("Server started on port 3000.");
});