// var previousCities=[];
var todayDate = moment().format("MMMM Do, YYYY");


// a fetch that takes in a city from input as a search query
function search() {
    var city = $(this).parent().siblings(".searchCity").val();
    console.log(city);
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=daa1ac9179b64017705840dffa558075`)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            // stores the lat and lon into a variable then calls the one search function while passing in the vars
            var lat = data['city']['coord']['lat'];
            var lon = data['city']['coord']['lon'];
            oneSearch(lat, lon);
            cityList(city);

        })
        // catches any fetch errors
        .catch(function (err) {
            console.log(err);
        });

};

// a second search function to search again when a city button is clicked
function searchRepeat(city) {
    // var city = $(this).parent().siblings(".searchCity").val();
    console.log(city);
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=daa1ac9179b64017705840dffa558075`)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            // stores the lat and lon into a variable then calls the one search function while passing in the vars
            var lat = data['city']['coord']['lat'];
            var lon = data['city']['coord']['lon'];
            oneSearch(lat, lon);

        })
        // catches any fetch errors
        .catch(function (err) {
            console.log(err);
        });

};

// uses the lat and long variable to pull up complete information
function oneSearch(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=daa1ac9179b64017705840dffa558075`)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            // current
            var icons = data['current']['weather'][0]['icon'];
            var temps = data['current']['temp'];
            var humid = data['current']['humidity'];
            var wind = data['current']['wind_speed'];
            var uv = data['current']['uvi'];

            // future forecasts
            mainForecast(icons, temps, humid, wind, uv);
            updateCards(data["daily"]);
        })
        .then(function () {
            // Set the display of the element with class .currentCity to 'block'
            document.querySelector('.currentCity').style.display = 'block';
        })
        .catch(function (error) {
            console.error('Error fetching weather data:', error);
        });
}



// puts fetched data into the main forcast
function mainForecast(icons, temps, humid, wind, uv) {
    $(".mainweather").empty(".mainweather")

    $(".mainWeather").html(`
    <div class=currentCity>
<h class="mainDate">${todayDate}</h>
<img class="mainImage" src='http://openweathermap.org/img/wn/${icons}@2x.png' alt="weathericon">
<div class="currentBody">
<p class="currentel">Temperature:${temps}°F</p>
<p class="currentel">Humidity:${humid}%</p>
<p class="currentel">Wind Speed:${wind}MPH</p>
<p class="currentel">UV Index:${uv}</p>
</div>
</div>

`)
};

function updateCards(data) {
    $(".forecast").empty();
    // creates cards for a 5 day forecast and fills it with data
    for (var i = 1; i < 6; i++) {
        var ficons = data[i]['weather'][0]['icon'];
        var ftempsh = data[i]['temp']['max'];
        var ftempsl = data[i]['temp']['min'];
        var fhumid = data[i]['humidity'];
        var fwind = data[i]['wind_speed'];
        var fuv = data[i]['uvi'];
        $(".forecast").append(`
        <div class="forecastCards card">
        <h class="dates">${moment().add(i, 'days').format('dddd M/D')}</h>
<img src='http://openweathermap.org/img/wn/${ficons}@2x.png' alt="weathericon">
<p>Temperature High:${ftempsh}°F</p>
<p>Temperature Low:${ftempsl}°F</p>
<p>Humidity:${fhumid}%</p>
<p>Wind Speed:${fwind}MPH</p>
<p>UV Index:${fuv}</p>
        </div>
        `)
    }
};


// creates a list of buttons from previously searched cities that when clicked search again for that city
function cityList(city) {
    // Create a unique identifier for the button using the city name
    var buttonId = city.replace(/\s+/g, ''); // Remove spaces for id
    // Append a button and li element for the city
    $('.cityList').append(`
        <li class="cities list-group-item">
            <button id="${buttonId}" class="searchAgainBtn">${city}</button>
        </li>
    `);

    // Add an event listener for the dynamically created button
    $(`#${buttonId}`).on("click", function () {
        // Call the searchRepeat function with the selected city
        searchRepeat(city);
    });
}

// when the search button is pressed on the main search box, run the search fucntion
$(".SearchBtn").on("click", search);