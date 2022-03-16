const express = require("express");
const https = require("https"); // nao precisa instalar
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
  var query = req.body.cityName;
  const apiKey = "API_KEY";
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=" + unit + "&appid=" + apiKey;
  https.get(url, function(response) {

    response.on("data", function(data) {
      var weatherData = JSON.parse(data); // desenpacotando um aquivo JSON
      var temperature = weatherData.main.temp; // Get the temperature
      var weatherDescription = weatherData.weather[0].description;
      var icon = "http://openweathermap.org/img/wn/" + weatherData.weather[0].icon + "@2x.png";

      res.write("<p>The weather is currently " + weatherDescription + "</p>");
      res.write("<h1>The temperature in " + query + " is " + temperature + " degrees Celcius</h1>")
      res.write("<img src=" + icon + "></img>");
      res.send();
    })
  })

})

app.listen(3000, function() {

})





      // const obj = {    PEGA UM OBJETO JS NORMAL E TORNA ELE EM UMA STRING JSON
      //   name: "pedro",
      //   age: 17
      // }
      // console.log(JSON.stringify(obj));
