
        // Creating a variable that stores my API key
        const API_KEY = "e2a5d7f1aaf28f0ecd25044d37fecac7";
        const weatherResult = document.getElementById("weatherResult");
        document.getElementById("fetchWeatherBtn").addEventListener("click", async () => {
            const city = document.getElementById("cityInput").value;
            // Calling the async function to fetch weather data and store the result 
            await fetchWeatherData(city);
        });
        async function fetchWeatherData(city) {
            try {
                const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);
                if (!response.ok) {
                    // If the response is not ok, we throw an error with a message
                    throw new Error("City not found");
                }
                const data = await response.json();
                displayWeatherData(data);
                            } catch (error) {
                console.error("Error fetching weather data:", error);
                weatherResult.innerHTML = `<p>Error: ${error.message}</p>`;
                // Displaying error message in the weatherResult div    
            }
        }
        function displayWeatherData(data) {
            weatherResult.innerHTML = `
                <h2>Weather in ${data.name}</h2>
                <p>Temperature: ${data.main.temp}K</p>
                <p>Weather: ${data.weather[0].description}</p>
            `;
        }
  