const baseUrl = 'http://api.openweathermap.org/data/2.5/weather?appid=98de7e17d772f2788de90725bbcd7f75'

export const fetchWeather = (lat, lon) => {
  const url = baseUrl+"&lat="+lat+"&lon="+lon+'&units=metric'

  return fetch(url)
    .then(res => res.json())
    .then(json => ({
      temp: json.main.temp,
      weather: json.weather[0].main
    }))
}
