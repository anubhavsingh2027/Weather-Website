const apikey = "53f765c24cc068e9215e8f8bc3ed66d1";
const apiurl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const weatherSection = document.querySelector(".weather");
const errorSection = document.querySelector(".error");
const loadingSection = document.querySelector(".loading");

async function checkWeather(city) {
    // Show loading
    loadingSection.style.display = "block";
    weatherSection.style.display = "none";
    errorSection.style.display = "none";

    try {
        const response = await fetch(apiurl + city + `&appid=${apikey}`);

        if (response.status == 404) {
            errorSection.style.display = "block";
            weatherSection.style.display = "none";
        } else {
            const data = await response.json();

            document.querySelector(".city").innerHTML = data.name;
            document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
            document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
            document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
            document.querySelector(".snow").innerHTML = data.snow ? data.snow["1h"] + " cm" : "0 cm";  // Snow condition

            // Update weather icon based on weather condition
            switch (data.weather[0].main) {
                case "Clear":
                    weatherIcon.src = "clear.png";
                    break;
                case "Clouds":
                    weatherIcon.src = "clouds.png";
                    break;
                case "Rain":
                    weatherIcon.src = "rain.png";
                    break;
                case "Drizzle":
                    weatherIcon.src = "drizzle.png";
                    break;
                case "Mist":
                    weatherIcon.src = "mist.png";
                    break;
                case "Snow":
                    weatherIcon.src = "snow.png";
                    break;
                default:
                    weatherIcon.src = "clouds.png";
            }

            weatherSection.style.display = "block";
            errorSection.style.display = "none";
        }
    } catch (error) {
        errorSection.style.display = "block";
        weatherSection.style.display = "none";
    } finally {
        loadingSection.style.display = "none";
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});

searchBox.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        checkWeather(searchBox.value);
    }
});
