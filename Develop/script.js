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

        })
        // catches any fetch errors
        .catch(function (err) {
            console.log(err);
        });


};

// uses the lat and long variable to pull up complete information
function oneSearch(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=daa1ac9179b64017705840dffa558075`)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
        })

};





// puts fetched data into the main forcast
// function mainForecast(){

// };

// function updateCards(){
//     for (var i = 0; i < 4; i++){
//         $(".forecast").add()
//     }
// };

$(".btn").on("click", search);