var express=require("express");
var app=express()
app.get('/',function(req,resp){
    resp.send("Hello from API");
});
app.get('/time',function(req,resp){
    var time=new Date().toLocaleTimeString();
    resp.send(`Time is:${time}`);
});
app.get('/date',function(req,resp){
    var date=new Date().toLocaleDateString();
    resp.send(`Date is:${date}`)
})

app.listen(9000,()=>console.log("API Started Listening............"))