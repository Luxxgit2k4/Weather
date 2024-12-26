const weatherForm = document.querySelector(".weatherForm")
const cityInput = document.getElementById
("cityName")
const card = document.querySelector(".card")
const apiKey = "Your api key form openweather"


weatherForm.addEventListener(
"submit",async event => {
  event.preventDefault()
  const city = cityInput.value
  if(city) {
  try{
   const weatherData = await getWeatherData(city)
    displayWeatherInfo(weatherData)
  }
    catch(error) {
      console.error(error)
      displayError(error)
    }
  }
 else {
    displayError("Enter a city name")
  }
}
)

async function getWeatherData(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
  const response = await fetch(apiUrl)

  if(!response.ok){
    throw new Error("Could not fetch data")
  } else { return await response.json() }

}

function displayWeatherInfo(data) {
 const {name: city,
  main: {temp, humidity},
   weather: [{description, icon}]
 } = data

  card.style.display = "flex"
  const cityDisplay = document.createElement("h1")
  const tempDisplay = document.createElement("p")
  const humDisplay = document.createElement("p")
  const descDisplay = document.createElement("p")
  const weatherImage = document.createElement("img")


  cityDisplay.textContent = city
  tempDisplay.textContent = (temp).toFixed(2) + "°C"
  humDisplay.textContent = `Humidity: ${humidity}%`
  descDisplay.textContent = description
  weatherImage.src =  `https://openweathermap.org/img/wn/${icon}@2x.png`
  weatherImage.alt = "Weather Image"

  cityDisplay.classList.add("cityDisplay")
  tempDisplay.classList.add("tempDisplay")
  humDisplay.classList.add("humidityDisplay")
  descDisplay.classList.add("descDisplay")
  weatherImage.classList.add("weatherImg")

  card.appendChild(cityDisplay)
  card.appendChild(tempDisplay)
  card.appendChild(humDisplay)
  card.appendChild(descDisplay)
  card.appendChild(weatherImage)
}


function displayError(message) {
  const errorDisplay = document.createElement("p")
 errorDisplay.textContent = message
  errorDisplay.classList.add("errorPoduren")
  card.textContent = ""
  card.style.display = "flex"
  card.appendChild(errorDisplay)

}
