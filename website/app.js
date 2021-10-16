/* Global Variables */
const apiKey = "&your-api-key-here";
const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
/* Function to POST data */

const postData = async ( url = '', data = {})=>{
  console.log(data)
    const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header        
  });

    try {
    
      const newData = await response.json();
      console.log("newData is : " + (JSON.stringify(newData)) );
      return newData;
    } catch(error) {
    console.log("error", error);
    // appropriately handle the error
    }
}

async function getWeather(zipCode){ 
    //zip code ? country
    let obj = {}
    console.log("Reached getWeather..")
    const result = await fetch(baseURL + zipCode + apiKey);
    console.log("Passed getWeather..")
    try {
        
        const res = await result.json();
        console.log(res["main"]["temp"])
        let temp =  res["main"]["temp"];
       
     
     obj = {
      zipCode,
      feelings,
      temp
    };

        
    } catch(err) {
        
        console.error(err);
    }
    return obj;
}

async function generate(ev) {

    let zipCode = document.getElementById("zip").value, 
        feelings = document.getElementById("feelings").value;
    // post?
    if ( !(/^\d{5}$/gim.test(zipCode)) || !(/[a-z]+/gim.test(feelings) ) ) {
       return false;    
    }
    try {
   let result = await postData('/getInfo', 
                               {zipCode:zipCode, feelings:feelings});
    console.log("result is : " + result);
    let returnedObj = await getWeather(zipCode);
    
    document.getElementById("date").textContent = newDate;
    document.getElementById("temp").textContent = `Temperature is: ${returnedObj["temp"]}\n`;
 document.getElementById("content").textContent = (`Temperature is: ${returnedObj["temp"]},\n` +
                              `zipCode is: ${zipCode},\n` +
                               `feelings are : ${feelings}`);
    } catch(err) {
        console.error("OMG!, There was an Error!, which was: "+ err);
    }
} 

document.getElementById("generate").addEventListener('click', generate);


async function getEndpoint(){
   let response =  await fetch('/all');
    let ret = await response.json();
    return ret;
}
