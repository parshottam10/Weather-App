const apiKey = '3fcb500e0897419db9f73745241608';


window.addEventListener('load', () => {
    fetchWeather('Indore');
});

document.getElementById('search-btn').addEventListener('click', () => {
    const city = document.getElementById('city-input').value;
    if (city) {
        fetchWeather(city);
    } else {
        alert('Please enter a city name.');
    }
});

async function fetchWeather(city) {
    try {
        const currentResponse = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`);
        const forecastResponse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=7&aqi=no`);

        const currentData = await currentResponse.json();
        const forecastData = await forecastResponse.json();

        
        document.getElementById('city-name').textContent = currentData.location.name;
        document.getElementById('current-temp').textContent = `Temperature: ${currentData.current.temp_c}°C`;
        document.getElementById('weather-description').textContent = `Description: ${currentData.current.condition.text}`;
        document.getElementById('humidity').textContent = `Humidity: ${currentData.current.humidity}%`;
        document.getElementById('wind-speed').textContent = `Wind Speed: ${currentData.current.wind_kph} km/h`;

        
        const forecastContainer = document.getElementById('forecast');
        forecastContainer.innerHTML = ''; 

        forecastData.forecast.forecastday.forEach(day => {
            const forecastItem = document.createElement('div');
            forecastItem.classList.add('forecast-item');

            const date = new Date(day.date).toLocaleDateString();
            forecastItem.innerHTML = `
                <p>${date}</p>
                <img src="${day.day.condition.icon}" alt="${day.day.condition.text}" />
                <p>${day.day.avgtemp_c}°C</p>
                <p>${day.day.condition.text}</p>
            `;
            forecastContainer.appendChild(forecastItem);
        });
    } catch (error) {
        console.error("Error fetching weather data:", error);
        alert('City not found, please try again.');
    }
}
