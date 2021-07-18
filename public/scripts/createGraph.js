$(document).ready(function () {
    $("#course-form").on("submit", function (event) {
        event.preventDefault();

        const dept = $("#dept").val();
        const quarter = $("#quarter").val();
        const number = $("#course-num").val().toUpperCase().replace(/\ /g, "");
        const courseType = $("#course-type").val();
        const instructor = $("#instructor").val();
        const courseCode = $("#course-code").val();

        $.ajax({
            url: "/",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify({
                dept: dept,
                quarter: quarter,
                number: number,
                courseType: courseType,
                instructor: instructor,
                courseCode: courseCode
            }),
            success: function (res) {
                if (res.status === "FOUND") {
                    const courseData = res.courseData;
                    const title = `${courseData.dept} ${courseData.number} - ${courseData.title} (${getQuarter(courseData.quarter)})`;
                    let numGraphs = 0;
                    $("#enrollment-data").html(`<h1 class="heading">Enrollment Data</h1>
                      <h4 class="enrollment-heading">${title}</h4>`);

                    res.courseData.courses.forEach((course) => {
                        if ((res.courseType === "all" || res.courseType === course.type) && hasInstructor(course.instructor, res.instructor) 
                            && hasCourseCode(course.course_code, res.courseCode)) {
                            createEnrollmentSection(course, numGraphs);
                            createGraph(`enrollment-chart${numGraphs}`, formatDates(course.dates), course.max, course.enrolled);
                            numGraphs++;
                        }
                    });

                    if (numGraphs === 0) {
                        createError("No graphs can be created because this instructor did not teach this specific course!");
                    }

                } else if (res.status === "EMPTY INPUT") {
                    createError("You need to specify more information! To successfully submit a course, select a Department, " 
                        + "Course Number, and Quarter. Alternatively, you can just enter a Course Code and Quarter.");
                } else {
                    createError("That specific course does not exist. Please try again!");
                }
            }
        });
    });
});


function getQuarter(quarter) {
    const year = quarter.slice(0, 4);

    switch (quarter.slice(5, 7)) {
        case "92":
            return `Fall ${year}`;
        case "03":
            return `Winter ${year}`;
        case "14":
            return `Spring ${year}`;
        case "25":
            return `SS1 ${year}`;
        case "39":
            return `10-wk Summer ${year}`;
        case "51":
            return `Summer COM ${year}`;
        case "76":
            return `SS2 ${year}`;
        case "8F":
            return `Law Fall ${year}`;
    }
}


function hasInstructor(instructors, instructor) {
    return instructor === "" || instructors.some((person) => person === instructor);
}


function hasCourseCode(currentCourseCode, courseCode) {
    return courseCode === "" || currentCourseCode === courseCode;
}


function formatArray(array) {
    let arrayHTML = "";

    array.forEach((item) => {
        arrayHTML += `<p>${item}</p>`;
    });

    return arrayHTML;
}


function formatDates(dates) {
    let newDates = [];

    dates.forEach((date) => {
        let year = date.slice(2, 4);
        let month = date.slice(5, 7);
        if (month.startsWith("0")) {
            month = month.slice(1, 2);
        }
        let day = date.slice(8, 10);

        newDates.push(`${month}/${day}/${year}`);
    });

    return newDates;
}


function createError(message) {
    $("#enrollment-data").html(`<div class="container-fluid">
                                  <div class="alert alert-danger alert-dismissible fade show error-message" role="alert">${message}</div>
                                </div>`);
}


function createEnrollmentSection(course, courseIndex) {
    $("#enrollment-data").append(
        `<div class="container-fluid">
           <div class="table-responsiveness enrollment-table">
            <table class="table table-sm table-light table-striped table-bordered">
              <thead>
                <tr>
                  <th scope="col">Code</th>
                  <th scope="col">Type</th>
                  <th scope="col">Sec</th>
                  <th scope="col">Units</th>
                  <th scope="col">Instructor</th>
                  <th scope="col">Time</th>
                  <th scope="col">Place</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>${course["course_code"]}</td>
                  <td>${course.type}</td>
                  <td>${course.section}</td>
                  <td>${course.units}</td>
                  <td class="table-list">${formatArray(course.instructor)}</td>
                  <td class="table-list">${formatArray(course.time)}</td>
                  <td class="table-list">${formatArray(course.place)}</td>
                </tr>
              </tbody>
            </table>
           </div>
         </div>
         <div class="graph-container">
           <canvas id="enrollment-chart${courseIndex}" class="chart"></canvas>
         </div>`);
}


function createGraph(graphID, dates, max, enrolled) {
    if (dates.length === 1) {
        handleOneElementArrays(dates, max, enrolled);
    }

    const labels = dates;
    
    const data = {
        labels: labels,
        datasets: [{
                label: "Enrolled",
                backgroundColor: "rgb(71,185,200)",
                borderColor: "rgb(71,185,200)",
                data: enrolled
            },
            {
                label: "Max",
                backgroundColor: "rgb(201,71,47)",
                borderColor: "rgb(201,71,47)",
                data: max,
            }
        ]
    };

    const config = {
        type: "line",
        data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: false
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: "Date",
                        font: {
                            size: 12,
                            weight: "bold",
                            padding: 10
                        },
                    }
                },
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: "Number of Students",
                        font: {
                            size: 12,
                            weight: "bold",
                            padding: 10
                        },
                    }
                }
            },
            tooltips: {
                enabled: true
            }
        }
    };

    return new Chart(document.getElementById(graphID), config);
}


function handleOneElementArrays(dates, max, enrolled) {
    dates.push(dates[0]);
    max.push(max[0]);
    enrolled.push(enrolled[0]);
}
