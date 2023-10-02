var citySearchForm = document.querySelector('#search-form')
var searchText = document.querySelector('#city')
var apiKey = 'cd405cde850f10f65e79988b0936ac58'

var citySubmit = function (event) {
    event.preventDefault();

    var city = searchText.value.trim();
console.log(city);
    if (city) {
        getWeatherData(city);

        searchText.value = '';

    }
}

var getWeatherData = function (city) {
    var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apiKey + '&units=imperial'

    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                console.log(response);
                return response.json()
            }
            else {
                alert('Error: ' + response.statusText)
            }
        })
        .then(function (data) {
            console.log(data);
            getForecast(data.coord.lat, data.coord.lon)
            displayWeather(data);
        })
        .catch(function (error) {
            alert('Unable to retrieve weather data.')
        })
};

function displayWeather(data) {
    console.log(data)
    document.getElementById('name').textContent= data.name
}

function getForecast (latitude, longitude) {
    var apiUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + latitude + '&lon=' + longitude + '&appid=' + apiKey + '&units=imperial'

    fetch(apiUrl)
    .then(function (response) {
        if (response.ok) {
            console.log(response);
            return response.json()
        }
        else {
            alert('Error: ' + response.statusText)
        }
    })
    .then(function (data) {
        console.log(data);
        for (var i=0; i < data.list.length; i++) {
            if (data.list[i].dt_txt.includes('12:00:00')){
                console.log(data.list[i])
                var date = document.createElement('h4')
                date.textContent= 'date: ' + data.list[i].dt_txt
                document.getElementById('forecast').append(date)
                var temp =document.createElement('h4')
                temp.textContent= 'temp: ' + data.list[i].main.temp
                document.getElementById('forecast').append(temp)
            }
        }
    })
    .catch(function (error) {
        alert('Unable to retrieve weather data.')
    })
}

citySearchForm.addEventListener('submit', citySubmit)