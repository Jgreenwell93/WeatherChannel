var previousCities=[];
var todayDate=moment().format("MMMM Do, YYYY");

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
        });
};

// puts fetched data into the main forcast
function mainForecast(){

};

// function updateCards(){
//     for (var i = 0; i < 4; i++){
//         $(".forecast").add()
//     }
// };

$(".btn").on("click", search);