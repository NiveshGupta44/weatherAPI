document.addEventListener("DOMContentLoaded", () => {
    const description = document.getElementById("description");
    const temperatureDisplay = document.getElementById("temperature");
    const cityNameDisplay = document.getElementById("city-name");
    const weatherInfo = document.getElementById("weather-info");
    const errorMessage = document.getElementById("error-message");
    const getWeatherBtn = document.getElementById("get-weather-btn");
    const cityInput = document.getElementById("city-input");

    const API_Key = "process.env.OPENWEATHER_API_KEY"; //use your own API_KEY


    getWeatherBtn.addEventListener('click', async () => {
        const City = cityInput.value.trim();
        if (!City) return;

        try {
            const weatherData = await fetchWeatherData(City);
            displayWeatherData(weatherData);
        } catch (error) {
            showError()
        }
    })

    async function fetchWeatherData(city) {
        //get the data
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_Key}`;

        const response = await fetch(url)
        console.log(typeof response);
        console.log("Response", response);

        if (!response.ok) {
            throw new Error("City not found");

        }
        const data = await response.json()
        return data
    }

    function displayWeatherData(Data) {
        //display the data
        console.log(Data);
        const { name, main, weather } = Data;
        cityNameDisplay.textContent = name;
        //unlock the display
        weatherInfo.classList.remove("hidden");
        errorMessage.classList.add("hidden");
        temperatureDisplay.textContent = `Temperature : ${main.temp}`;
        description.textContent = `Weather  : ${weather[0].description}`;


    }

    function showError() {
        weatherInfo.classList.remove('hidden');
        errorMessage.classList.add('hidden');
    }

});