var express=require("express")
var app=express()
app.get('/',function(req,resp){
    resp.send("Welcome to Rest API")
})
app.listen(9000,()=>console.log("API Started Listening"))