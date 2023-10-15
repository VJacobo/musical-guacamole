const weatherDashboard = {
    searchHistory: [],
  
    async getWeatherOutlook(city) {
      const apiKey = "d0196c636c1da157c46bf9bc5d89f93c";
      const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;
  
      const response = await fetch(url);
      const data = await response.json();
  
      return data;
    },
  
    displayWeatherOutlook: (city, weatherOutlook) => {
      const currentWeather = weatherOutlook.current;
      const forecast = weatherOutlook.forecast.daily;
  
      const weatherOutlookElement = document.getElementById("weather-outlook");
      weatherOutlookElement.innerHTML = `
        <h2>${city}</h2>
        <h3>Current weather</h3>
        <p>${currentWeather.weather[0].description}</p>
        <p>Temperature: ${currentWeather.temp.day} degrees Celsius</p>
        <p>Humidity: ${currentWeather.humidity}%</p>
        <p>Wind speed: ${currentWeather.wind_speed} meters per second</p>
  
        <h3>5-day forecast</h3>
        <ul>
          ${forecast.map((day) => `
            <li>${day.dt} - ${day.weather[0].description} - ${day.temp.day} degrees Celsius</li>
          `).join("")}
        </ul>
      `;
    },
  
    updateSearchHistory: (city) => {
      if (!weatherDashboard.searchHistory.includes(city)) {
        weatherDashboard.searchHistory.push(city);
      }
    },
  
    displaySearchHistory: () => {
      const searchHistoryElement = document.getElementById("search-history");
      searchHistoryElement.innerHTML = `
        <h2>Search History</h2>
        <ul>
          ${weatherDashboard.searchHistory.map((city) => `
            <li class="city">${city}</li>
          `).join("")}
        </ul>
      `;
    },
  
    init: async () => {
      const city = document.querySelector("input[type='text']").value;
  
      const weatherOutlook = await weatherDashboard.getWeatherOutlook(city);
      weatherDashboard.displayWeatherOutlook(city, weatherOutlook);
  
      weatherDashboard.displaySearchHistory();
      weatherDashboard.updateSearchHistory(city);
  
      const searchHistoryElement = document.getElementById("search-history");
      searchHistoryElement.addEventListener("click", (event) => {
        const city = event.target.textContent;
  
        const weatherOutlook = await weatherDashboard.getWeatherOutlook(city);
        weatherDashboard.displayWeatherOutlook(city, weatherOutlook);
      });
    },
  };
  
  weatherDashboard.init();
  
  
