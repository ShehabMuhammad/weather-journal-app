const apiKey = "&your-api-key-here";
const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
// Setup empty JS object to act as endpoint for all routes
// It should include all data..
const projectData = {};

// Require Express to run server and routes
const express = require('express');
const cors = require('cors');

// Start up an instance of app
const app = express();

/* Middleware*/
const bodyParser = require('body-parser');
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 8080;

function listen() {
  console.log(`listening at ${port}`);
}
app.listen(port, listen);
//app.get("/", indexPage );
// So Now what?
app.post("/", function (req, res) {
    console.log(`Posted : req ${req}, res ${res}`);
})


//async function getWeather(zipCode){ 
//    //zip code ? country
//    const result = await fetch(baseURL + zipCode + apiKey);
//    try {
//        
//        const res = await result.json();
//        console.log(res["main"]["temp"])
//        return res["main"]["temp"];
//        
//    } catch(err) {
//        
//        console.error(err);
//    }
//}


app.post("/getInfo", async function (req, res) {
   
    let val = req.body;
    projectData[val["zipCode"]] = val["feelings"];
    console.log(val);
    res.send(val);
    return val;
//    let temp = await getWeather(val["zipCode"]);
//     
//        projectData[val["zipCode"]] = temp;
//    let obj = {
//      zipCode:  val["zipCode"],
//      feelings: val["feelings"],
//        temp
//    };
//    res.send(obj)
//    return obj;
});
app.get("/getInfo", function (req, res) {
    res.send("Hello");
});

app.get("/all", function (req, res) {
    res.send(projectData);
});

