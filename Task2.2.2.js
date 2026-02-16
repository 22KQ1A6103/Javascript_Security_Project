const express = require("express");
const app = express();

app.use(express.json());

// ================= STUDENT ARRAY =================
var students = [
    { id: 1, name: "A", mobileno: 8978735498, address: "ABC", age: 20 },
    { id: 2, name: "B", mobileno: 7873547890, address: "BCD", age: 25 }
];


// ================= FUNCTIONS =================

// Add Student
function addStudent(student) {
    students.push(student);
    return student;
}

// Get All Students
function getStudents() {
    return students;
}

// Update Student
function updateStudent(id, newData) {
    for (var i = 0; i < students.length; i++) {
        if (students[i].id === id) {
            students[i].name = newData.name;
            students[i].mobileno = newData.mobileno;
            students[i].address = newData.address;
            students[i].age = newData.age;
            return students[i];
        }
    }
    return null;
}

// Delete Student
function deleteStudent(id) {
    var lengthBefore = students.length;
    students = students.filter(function(student) {
        return student.id !== id;
    });

    if (students.length < lengthBefore) {
        return true;
    }
    return false;
}

// Get Names using map
function getStudentNames() {
    return students.map(function(student) {
        return student.name;
    });
}

// Get Students Above 21 using filter
function getStudentsAbove21() {
    return students.filter(function(student) {
        return student.age > 21;
    });
}

// Find Student By Id using find
function findStudentById(id) {
    return students.find(function(student) {
        return student.id === id;
    });
}


// ================= ROUTES =================

// CREATE
app.post("/students", function(req, res) {
    var newStudent = {
        id: students.length + 1,
        name: req.body.name,
        mobileno: req.body.mobileno,
        address: req.body.address,
        age: req.body.age
    };

    res.send(addStudent(newStudent));
});


// READ - All Students
app.get("/students", function(req, res) {
    res.send(getStudents());
});


// READ - Names Only (map)
app.get("/students/names", function(req, res) {
    res.send(getStudentNames());
});


// READ - Students Above 21 (filter)
app.get("/students/above21", function(req, res) {
    res.send(getStudentsAbove21());
});


// READ - Find By ID (find)
app.get("/students/find/:id", function(req, res) {
    var student = findStudentById(Number(req.params.id));

    if (!student) {
        return res.status(404).send("Student Not Found");
    }

    res.send(student);
});


// UPDATE
app.put("/students/:id", function(req, res) {
    var updatedStudent = updateStudent(Number(req.params.id), req.body);

    if (!updatedStudent) {
        return res.status(404).send("Student Not Found");
    }

    res.send(updatedStudent);
});


// DELETE
app.delete("/students/:id", function(req, res) {
    var deleted = deleteStudent(Number(req.params.id));

    if (!deleted) {
        return res.status(404).send("Student Not Found");
    }

    res.send("Student Deleted Successfully");
});


// ================= SERVER =================
app.listen(8000, function() {
    console.log("Server running on port 8000");
});