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
            document.getElementById('current-weather').innerHTML = ''
            var card = document.createElement('div')
            card.classList.add('card-current')
            var cityName = document.createElement('h2')
            cityName.innerText = 'Current Weather in ' + data.name
            card.append(cityName)
            var date = document.createElement('h4')
            date.textContent = '(' + dayjs.unix(data.dt).format('MMM DD, hh:mm a') + ')'
            card.append(date)
            var icon = document.createElement('img')
            icon.src = 'https://openweathermap.org/img/wn/' + data.weather[0].icon + '.png'
            card.append(icon)
            var temp = document.createElement('h4')
            temp.textContent = 'Temp: ' + data.main.temp + '°F'
            card.append(temp)
            var humidity = document.createElement('h4')
            humidity.textContent = 'Humidity: ' + data.main.humidity + '%'
            card.append(humidity)
            var wind = document.createElement('h4')
            wind.textContent = 'Wind: ' + data.wind.speed + ' MPH'
            card.append(wind)
            document.getElementById('current-weather').append(card)
            getForecast(data.coord.lat, data.coord.lon)
            displayWeather(data);
        })
        .catch(function (error) {
            console.log(error)
            alert('Unable to retrieve weather data.')
        })
};

function displayWeather(data) {
    console.log(data)
}

function getForecast(latitude, longitude) {
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
            for (var i = 0; i < data.list.length; i++) {
                if (data.list[i].dt_txt.includes('12:00:00')) {
                    console.log(data.list[i])
                    // var text = document.createElement('h2')
                    // text.textContent= '5-Day Forecast:'
                    // document.append(text)
                    var card = document.createElement('div')
                    card.classList.add('card-forecast')
                    var date = document.createElement('h4')
                    date.textContent = dayjs(data.list[i].dt_txt).format('MMM DD, hh:mm a')
                    card.append(date)
                    var icon = document.createElement('img')
                    icon.src = 'https://openweathermap.org/img/wn/' + data.list[i].weather[0].icon + '.png'
                    card.append(icon)
                    var temp = document.createElement('h4')
                    temp.textContent = 'Temp: ' + data.list[i].main.temp + '°F'
                    card.append(temp)
                    var humidity = document.createElement('h4')
                    humidity.textContent = 'Humidity: ' + data.list[i].main.humidity + '%'
                    card.append(humidity)
                    var wind = document.createElement('h4')
                    wind.textContent = 'Wind: ' + data.list[i].wind.speed + ' MPH'
                    card.append(wind)
                    document.getElementById('forecast').append(card)
                }
            }
        })
        .catch(function (error) {
            alert('Unable to retrieve weather data.')
        })
}

citySearchForm.addEventListener('submit', citySubmit)