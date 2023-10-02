var citySearchForm = document.querySelector
var searchText = document.querySelector

var citySubmit = function (event) {
    event.preventDefault();

    var city = searchText.value.trim();

    if (city) {
        getWeatherData(city);

        cityContainer.textContent = '';
        
    }
}

var getWeatherData = function () {
    var apiUrl = 

    fetch(apiUrl)
    .then(function (response) {
        if (response.ok) {
            console.log(response);
            response.json().then(function (data) {
                console.log(data);
                displayWeather (data); }
    )} else {
        alert('Error: ' + response.statusText)
    }
    })
    .catch(function (error) {
        alert('Unable to retrieve weather data.')
    })
};

