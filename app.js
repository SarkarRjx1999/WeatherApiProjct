const express = require("express");
const https = require("https");
const bodyParser =require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
  res.sendFile(__dirname +"/index.html");
});

app.post("/" ,function(req,res){
  const key="c98e721e9769eb75b2cf4f198746ca29";
  const unit = "metric";
  const query = req.body.cityName;
  
  const url= "https://api.openweathermap.org/data/2.5/weather?q="+query+"&units="+ unit +"&appid="+key;

https.get(url , function(response){
   console.log(response.statusCode); 
   

response.on("data",function(data){
  const weatherData = JSON.parse(data)
 // console.log(weatherData);
  const temp =weatherData.main.temp;
  const desc = weatherData.weather[0].description;
  const icon = weatherData.weather[0].icon;
  console.log(desc);
  const imgURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

  res.write("<p>the weather is "+ desc + "</p>");
  res.write("<h1>The temperature in "+query+" is : "+ temp + " degrees Celcius</h1>");
  res.write("<img src=" + imgURL +">");
  res.send()
     });
});


});


app.listen(4200 , function(req,res){
  console.log("Server 4200 started");
});