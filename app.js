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


mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});
const courseSchema = new mongoose.Schema({
    quarter: String,
    dept: String,
    number: String,
    title: String,
    course_codes: [String],
    courses: {}
});
var Course = mongoose.model("Course", courseSchema, "enrollments");


app.get("/", function (req, res) {
    res.sendFile(__dirname + "/views/index.html");
});


app.post("/", function (req, res) {
    if ((req.body.quarter === "" || req.body.dept === "" || req.body.number === "") && (req.body.quarter === "" || req.body.courseCode === "")) {
        res.send({status: "EMPTY INPUT"});
    } else {
        let query = {            
            quarter: req.body.quarter,
            dept: req.body.dept,
            number: req.body.number
        };
    
        if (req.body.courseCode !== "" && req.body.quarter !== "") {
            query = {
                quarter: req.body.quarter,
                course_codes: {$in: req.body.courseCode}
            };
        }
    
        Course.findOne(query, function (err, course) {
            if (err) {
                console.log(err);
            } else if (!course) {
                res.send({status: "NOT FOUND"});
            } else {
                res.send({
                    status: "FOUND", 
                    courseData: course, 
                    courseType: req.body.courseType, 
                    instructor: req.body.instructor, 
                    courseCode: req.body.courseCode
                });
            }
        });
    }
});


app.listen(process.env.PORT || 3000, function () {
    console.log("Server started on port 3000.");
});