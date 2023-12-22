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

            // passing city in for main forcast population
            oneSearch(city, lat, lon);
            // passing city into function to create previously searched cities buttons
            cityList(city);

        })
        // catches any fetch errors
        .catch(function (err) {
            console.log(err);
        });

};

// a second search function to search again when a city button is clicked
function searchRepeat(city) {
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

            // passing city in for main forcast population
            oneSearch(city, lat, lon);
            // cityList function removed from here because the button is already created for this search

        })
        // catches any fetch errors
        .catch(function (err) {
            console.log(err);
        });

};

// uses the lat and long variable to pull up complete information
// While the information is available through simply looking up the city via api
// it is both easier to navigate the information via lat and long vs just city, as well as
// the numeric units of measurement are converted into common units for readability with lat/long vs city
function oneSearch(city, lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=daa1ac9179b64017705840dffa558075`)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            // current
            var icons = data['current']['weather'][0]['icon'];
            var weath = data['current']['weather'][0]['description'];
            var temps = data['current']['temp'];
            var feels = data['current']['feels_like'];
            var humid = data['current']['humidity'];
            var wind = data['current']['wind_speed'];
            var uv = data['current']['uvi'];

            // main forcast
            mainForecast(city, icons, weath, temps, feels, humid, wind, uv);
            // future forecasts
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
function mainForecast(city, icons, weath, temps, feels, humid, wind, uv) {

    // capitalize the first char of the city for grammar
    var capitalizedCity = city.charAt(0).toUpperCase() + city.slice(1);

    // capitalize the first char of each word in weather for aesthetics
    var words = weath.split(" ");
    var capitalizedWeath = words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");

    // es5 version of the function above
    // var capitalizedWeath = words.map(function(word) {
    //     return word.charAt(0).toUpperCase() + word.slice(1);
    // }).join(" ");

    $(".mainweather").empty(".mainweather")

    $(".mainWeather").html(`
    <div class=currentCity>
<h class="cityHead">${capitalizedCity}</h>
<h class="mainDate">${todayDate}</h>
<h class="mainWeath">${capitalizedWeath}</h>
<img class="mainImage" src='http://openweathermap.org/img/wn/${icons}@2x.png' alt="weathericon">
<div class="currentBody">
<p class="currentel">Temperature: ${temps}°F</p>
<p class="currentel">Feels Like: ${feels}°F</p>
<p class="currentel">Humidity: ${humid}%</p>
<p class="currentel">Wind Speed: ${wind}MPH</p>
<p class="currentel">UV Index: ${uv}</p>
</div>
</div>

`)
};

// makes future forcast cards
function updateCards(data) {
    $(".forecast").empty();
    // creates cards for a 5 day forecast and fills it with data
    for (var i = 1; i < 6; i++) {
        var ficons = data[i]['weather'][0]['icon'];
        var fweath = data[i]['weather'][0]['description'];
        var ftempsh = data[i]['temp']['max'];
        var ftempsl = data[i]['temp']['min'];
        var fhumid = data[i]['humidity'];
        var fwind = data[i]['wind_speed'];
        var fuv = data[i]['uvi'];

        // capitalize the first char of each word in weather for aesthetics
        // splits the string into an array cutting them at each space (" ")
        // then maps over each item in the array and capitalizes the first char in each of the strings
        // then recombines them with a space (" ") in between
    var fwords = fweath.split(" ");
    var capitalizedfWeath = fwords.map(fword => fword.charAt(0).toUpperCase() + fword.slice(1)).join(" ");

        $(".forecast").append(`
        <div class="forecastCards card">
        <h class="dates">${moment().add(i, 'days').format('dddd M/D')}</h>
<img src='http://openweathermap.org/img/wn/${ficons}@2x.png' alt="weathericon">
<p class="futureWeath">${capitalizedfWeath}</p>
<p>Temperature High: ${ftempsh}°F</p>
<p>Temperature Low: ${ftempsl}°F</p>
<p>Humidity: ${fhumid}%</p>
<p>Wind Speed: ${fwind}MPH</p>
<p>UV Index: ${fuv}</p>
        </div>
        `)
    }
};


// creates a list of buttons from previously searched cities that when clicked search again for that city
function cityList(city) {

    // create unique identifier for button using city name
    var buttonId = city.replace(/\s+/g, ''); // Remove spaces for id

    // capitalize the first char of the city for grammar
    var capitalizedCity = city.charAt(0).toUpperCase() + city.slice(1);

    // Append a button and li element for the city
    $('.cityList').append(`
        <li class="cities list-group-item">
            <button id="${buttonId}" class="searchAgainBtn">${capitalizedCity}</button>
        </li>
    `);

    // add event listener for dynamically created button
    $(`#${buttonId}`).on("click", function () {
        // Call the searchRepeat function with the selected city
        searchRepeat(city);
    });

    // unhides the city search area for previous searches.
    document.querySelector('.cityListStage').style.display = 'block';
}

// when the search button is pressed on the main search box, run the search fucntion
$(".SearchBtn").on("click", search);