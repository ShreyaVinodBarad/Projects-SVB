/*
1) We will use the API to get weather information when ever we type any city name.

2) What is API?
- An API is a bridge that allows different apps or software to communicate and work together.
- In tech terms:
a) An API allows one program to talk to another program.
b) It defines a set of rules for how programs can request and send information to each other.
c) It hides the complex details and lets you get what you need easily.

3) Procedure:
a) Go to Open Weather Map
b) Create an Account
c) Verify your email
d) Go to API section
e) Go to current weather Data
f) In this section scroll down and copy API Call's first option and paste it in the Chrome.
g) There will a link something like this here you have to write the name of city in the city name and enter API Key in it's part.
https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
h) The API key takes some couple of hours to Activate then you will get the Weather information in JSON Format.
*/

const apiKey = "d4c4d289ec44bf44d8ac7c6021704aeb";
const apiURL = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
/*
👆
We need to use metric to get temp in Celcius format.
*/
const searchBox = document.getElementById("searchBox");
const searchBtn = document.getElementById("searchBtn");
const weatherImg = document.getElementById("weatherImg");
async function checkWeather(city) {
    /*
    👆
    This asynchronous function fetches weather data for the provided city
    */
    const response = await fetch(apiURL + city + `&appid=${apiKey}`);
    /*
    👆
    Makes a GET request to the API
    */
    if (response.status == 404) {
        document.getElementById("error").style.display = "block";
        document.getElementById("weather").style.display = "none";
    }
    else {
        let data = await response.json();
        /*
        👆
        Convert response to JSON.
        */
        console.log(data);
        document.getElementById("city").innerHTML = data.name;
        document.getElementById("temp").innerHTML = Math.round(data.main.temp) + "°c";
        document.getElementById("humidity").innerHTML = data.main.humidity + "%";
        document.getElementById("wind").innerHTML = data.wind.speed + " km/h";

        if (data.weather[0].main == "Clouds") {
            weatherImg.src = "./Assets/CloudsImg.png"
        }
        else if (data.weather[0].main == "Clear") {
            weatherImg.src = "./Assets/ClearImg.png"
        }
        else if (data.weather[0].main == "Rain") {
            weatherImg.src = "./Assets/RainImg.png"
        }
        else if (data.weather[0].main == "Drizzle") {
            weatherImg.src = "./Assets/DrizzleImg.png"
        }
        else if (data.weather[0].main == "Mist") {
            weatherImg.src = "./Assets/MistImg.png"
        }
        else if (data.weather[0].main == "Snow") {
            weatherImg.src = "./Assets/SnowImg.png"
        }
        document.getElementById("weather").style.display = "block";
        document.getElementById("error").style.display = "none";
    }
}
searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
})