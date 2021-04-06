var city="Austin";
fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=daa1ac9179b64017705840dffa558075`)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    });

