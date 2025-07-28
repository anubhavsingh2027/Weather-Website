const apiKey = "8d1d95649aea4355811122210251201"; // Your WeatherAPI Key
const apiUrl = "https://api.weatherapi.com/v1/"; // WeatherAPI Base URL

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const weatherSection = document.querySelector(".weather");
const errorSection = document.querySelector(".error");
const loadingSection = document.querySelector(".loading");

async function fetchWeather(city) {
    // Show loading
    loadingSection.style.display = "block";
    weatherSection.style.display = "none";
    errorSection.style.display = "none";

    try {
        const response = await fetch(`${apiUrl}forecast.json?key=${apiKey}&q=${city}&days=10`);
        const data = await response.json();

        if (response.status !== 200) {
            throw new Error('City not found');
        }

        // Weather details
        document.querySelector(".city").textContent = data.location.name;
        document.querySelector(".temp").textContent = `${Math.round(data.current.temp_c)}°C`;
        document.querySelector(".humidity").textContent = `${data.current.humidity}%`;
        document.querySelector(".wind").textContent = `${data.current.wind_kph} km/h`;
        document.querySelector(".snow").textContent = `${data.current.precip_mm} mm`;

        // Weather icon
        weatherIcon.src = `https:${data.current.condition.icon}`;

        // Forecast details
        const forecastDays = data.forecast.forecastday;
        const firstFiveDays = forecastDays.slice(0, 5);  // First 5 days
        const nextFiveDays = forecastDays.slice(5, 10); // Next 5 days

        // Clear previous forecast
        document.getElementById('forecast-top').innerHTML = '';
        document.getElementById('forecast-bottom').innerHTML = '';

        // Populate forecast for the first 5 days (forecast-top)
        firstFiveDays.forEach(day => {
            document.getElementById('forecast-top').innerHTML += `
                <div class="forecast-item">
                    <img src="https:${day.day.condition.icon}" alt="Weather Icon">
                    <span>${day.date}</span>
                    <span>${Math.round(day.day.mintemp_c)}°C / ${Math.round(day.day.maxtemp_c)}°C</span>
                </div>
            `;
        });

        // Populate forecast for the next 5 days (forecast-bottom)
        nextFiveDays.forEach(day => {
            document.getElementById('forecast-bottom').innerHTML += `
                <div class="forecast-item">
                    <img src="https:${day.day.condition.icon}" alt="Weather Icon">
                    <span>${day.date}</span>
                    <span>${Math.round(day.day.mintemp_c)}°C / ${Math.round(day.day.maxtemp_c)}°C</span>
                </div>
            `;
        });

        // Show weather
        weatherSection.style.display = "block";
        errorSection.style.display = "none";
    } catch (error) {
        errorSection.style.display = "block";
        weatherSection.style.display = "none";
    } finally {
        loadingSection.style.display = "none";
    }
}

searchBtn.addEventListener("click", () => fetchWeather(searchBox.value));
searchBox.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        fetchWeather(searchBox.value);
    }
});
