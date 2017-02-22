const baseUrl = 'api.openweathermap.org/data/2.5/weather?appId=98de7e17d772f2788de90725bbcd7f75';

export const fetchWeather = (lat, lon) => {
  const url = baseUrl+"&lat="+lat+"&lon="+lon
  console.log(url)
}
