const express=require("express");
const app=express();
app.use(express.json()); //to read JSON body
//In memeory array(acts like DB)
let students=[
    {id:1,name:"Mounika",mobileno:"7607097556",address:"1-10,Ongole,A.P,India",age:21},
    {id:2,name:"Sara",mobileno:"7607897556",address:"0-11,Podili,A.P,India",age:25}
];
//================CREATE==============
//POST USERS
app.post("/students",(req,res)=>{
    const newStudent={
        id:students.length+1,
        name:req.body.name,
        mobileno:req.body.mobileno,
        address:req.body.address,
        age:req.body.age
    };
students.push(newStudent);
res.send(newStudent);
});

//==========READ===============
//GET Users

app.get("/students",(req,res)=>{
    res.send(students);
});
//GET /users/:id
app.get("/students/:id",(req,res)=>{
    const student=students.find(u=>u.id==req.params.id);

    if(!student) return res.status(404).send("User not found");

    res.send(student);
});

//========UPDATE===============
//PUT /users/:id
app.put("/students/:id",(req,res)=>{
    const student=students.find(u=>u.id==req.params.id);
    if(!student) return res.status(404).send('User not found');
    student.name=req.body.name;
    student.mobileno=req.body.mobileno;
    student.address=req.body.address;
    student.age=req.body.age;
    res.send(student);
});

//============DELETE===========
//DELETE /users/:id
app.delete("/students/:id",(req,res)=>{
    students=students.filter(u=>u.id!=req.params.id);
    res.send("student Deleted");
});




// GET all student names
app.get("/students/names", (req, res) => {
    const names = students.map(student => student.name);
    res.send(names);
});

// GET students above age 21
app.get("/students/above21", (req, res) => {
    const above21 = students.filter(student => student.age > 21);
    res.send(above21);
});

// GET student by id using find
app.get("/students/find/:id", (req, res) => {
    const student = students.find(s => s.id === Number(req.params.id));
    if (!student) return res.status(404).send("Student not found");
    res.send(student);
});




app.listen(3000,()=>{
    console.log("Server running on port 3000");
});
