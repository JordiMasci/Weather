// CHIAMATA PRIMA SCHERMATA

// Funzione per convertire kelvin in celsius
function kelvinToCelsius(kelvin) {
    return kelvin - 273.15;
  }
  
  // Array di citta (ci serve per le diverse chiamate API)
  const cities = ["London", "Milan", "Bangkok", "Los Angeles", "Nairobi"];
  
  // Inizializzo indice della città corrente
  let currentCityIndex = 0;
  // Inizializzo indice della città corrente seconda chiamata
  let currentCityIndex2 = 1;
  
  // Funzione per chiamare l'API con il nome della città
  async function getWeather(cityName) {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=09c6c3816e1f212ec1130819a38bcdc6`
      );
  
      // Converto i dati in file json
      const data = await response.json();
  
      // Salvo in delle variabili gli elementi html
      const cityNameElement = document.getElementById("city");
      const weatherMainElement = document.getElementById("weather");
      const currentTemperatureElement = document.getElementById("temp");
      const temperatureMinElement = document.getElementById("temp-min");
      const temperatureMaxElement = document.getElementById("temp-max");
  
      // Converto i valori della temp in celsius
      const currentTemperatureCelsius = kelvinToCelsius(data.main.temp);
      const temperatureMinCelsius = kelvinToCelsius(data.main.temp_min);
      const temperatureMaxCelsius = kelvinToCelsius(data.main.temp_max);
  
      // Stampo con innerText i valori nel DOM
      cityNameElement.innerText = data.name;
      weatherMainElement.innerText = data.weather[0].main;
      currentTemperatureElement.innerText = `${currentTemperatureCelsius.toFixed(
        0
      )}°C`;
      temperatureMinElement.innerText = `${temperatureMinCelsius.toFixed(0)}°C`;
      temperatureMaxElement.innerText = `${temperatureMaxCelsius.toFixed(0)}°C`;
  
      // console.log("Dati completi:", {
      //   cityName: data.name,
      //   weatherMain: data.weather[0].main,
      //   currentTemperature: currentTemperatureCelsius,
      //   temperatureMin: temperatureMinCelsius,
      //   temperatureMax: temperatureMaxCelsius,
      // });
  
      // Restituisci i dati per eventuali elaborazioni
      return {
        cityName: data.name,
        weatherMain: data.weather[0].main,
        currentTemperature: currentTemperatureCelsius,
        temperatureMin: temperatureMinCelsius,
        temperatureMax: temperatureMaxCelsius,
      };
    } catch (error) {
      console.log("Error", error);
    }
  }
  
  // Funzione per passare alla città successiva
  function nextCity() {
    // Rimuovo la classe selected all'elemento corrente
    document
      .querySelector(".indicator span.selected")
      .classList.remove("selected");
  
    // Aggiorno il valore dell'indice (cities)
    currentCityIndex = currentCityIndex + 1;
    // Condizione per azzerare l'indice quando arrivo alla fine dell'array
    if (currentCityIndex >= cities.length) {
      currentCityIndex = 0;
    }
    // Aggiorno indice di 'cieties' e la salvo la città con nuovo indice
    // in una nuova variabile
    const nextCityName = cities[currentCityIndex];
  
    // Richiamo la funzione getWeather passandogli i nuovi parametri aggiornati
    getWeather(nextCityName);
  
    // Evoco la funzione per la chiamata della sett
    getWeeklyWeather(nextCityName);
  
    // Utilizzo uno pseudo-selettore per selezionare lo span successivo
    // Aggiungo la classe selected
    document
      .querySelector(`.indicator span:nth-child(${currentCityIndex + 1})`)
      .classList.add("selected");
  }
  
  // Funzione per passare alla città precedente
  function prevCity() {
    document
      .querySelector(".indicator span.selected")
      .classList.remove("selected");
    // Condizione per vedere ultimo indice della città quando torno indietro
    currentCityIndex = currentCityIndex - 1;
    if (currentCityIndex < 0) {
      currentCityIndex = cities.length - 1;
    }
    // Aggiorno indice di 'cieties' e la salvo in una nuova variabile
    const prevCityName = cities[currentCityIndex];
    // Richiamo la funzione getWeather passandogli i nuovi parametri aggiornati
    getWeather(prevCityName);
    // Evoco la funzione per la chiamata sett
    getWeeklyWeather(prevCityName);
  
    document
      .querySelector(`.indicator span:nth-child(${currentCityIndex + 1})`)
      .classList.add("selected");
  }
  
  // Chiamata iniziale (al caricamento 'currentCityIndex=0')
  getWeather(cities[currentCityIndex]);
  // Aggiungi la classe 'selected' al primo elemento corrente
  document.querySelector(".indicator span:first-child").classList.add("selected");
  
  // SECONDA CHIAMATA E GESTIONE!!!
  
  // Seconda chiamata API
  async function getWeather2(cityName2) {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName2}&APPID=09c6c3816e1f212ec1130819a38bcdc6`,
        { mode: "cors" }
      );
  
      // Converto i dati in file json
      const data = await response.json();
  
      // Salvo in delle variabili gli elementi html
      const cityNameElement = document.getElementById("city-2");
      const weatherMainElement = document.getElementById("weather-2");
      const currentTemperatureElement = document.getElementById("temp-2");
      const temperatureMinElement = document.getElementById("temp-min-2");
      const temperatureMaxElement = document.getElementById("temp-max-2");
  
      // Converto i valori della temp in celsius
      const currentTemperatureCelsius = kelvinToCelsius(data.main.temp);
      const temperatureMinCelsius = kelvinToCelsius(data.main.temp_min);
      const temperatureMaxCelsius = kelvinToCelsius(data.main.temp_max);
  
      // Stampo con innerText i valori nel DOM
      cityNameElement.innerText = data.name;
      weatherMainElement.innerText = data.weather[0].main;
      currentTemperatureElement.innerText = `${currentTemperatureCelsius.toFixed(
        0
      )}°C`;
      temperatureMinElement.innerText = `${temperatureMinCelsius.toFixed(0)}°C`;
      temperatureMaxElement.innerText = `${temperatureMaxCelsius.toFixed(0)}°C`;
  
      // console.log("Dati completi:", {
      //   cityName: data.name,
      //   weatherMain: data.weather[0].main,
      //   currentTemperature: currentTemperatureCelsius,
      //   temperatureMin: temperatureMinCelsius,
      //   temperatureMax: temperatureMaxCelsius,
      // });
      // Restituisci i dati per eventuali elaborazioni
      return {
        cityName: data.name,
        weatherMain: data.weather[0].main,
        currentTemperature: currentTemperatureCelsius,
        temperatureMin: temperatureMinCelsius,
        temperatureMax: temperatureMaxCelsius,
      };
    } catch (error) {
      console.log("Error", error);
    }
  }
  
  // Funzione per passare alla città successiva
  function nextCity2() {
    // Rimuovo la classe selected all'elemento corrente
    document
      .querySelector(".indicator-2 span.selected")
      .classList.remove("selected");
  
    // Aggiorno il valore dell'indice (cities)
    currentCityIndex2 = currentCityIndex2 + 1;
    // Condizione per azzerare l'indice quando arrivo alla fine dell'array
    if (currentCityIndex2 >= cities.length) {
      currentCityIndex2 = 0;
    }
  
    // Aggiorno indice di 'cieties' e la salvo la città con nuovo indice
    // in una nuova variabile
    const nextCityName2 = cities[currentCityIndex2];
  
    // Richiamo la funzione getWeather passandogli i nuovi parametri aggiornati
    getWeather2(nextCityName2);
  
    // richiamo api sett
    getWeeklyWeather2(nextCityName2);
    document
      .querySelector(`.indicator-2 span:nth-child(${currentCityIndex2 + 1})`)
      .classList.add("selected");
  }
  
  function prevCity2() {
    document
      .querySelector(".indicator-2 span.selected")
      .classList.remove("selected");
    // Condizione per vedere ultimo indice della città quando torno indietro
    currentCityIndex2 = currentCityIndex2 - 1;
    if (currentCityIndex2 < 0) {
      currentCityIndex2 = cities.length - 1;
    }
    // Aggiorno indice di 'cieties' e la salvo in una nuova variabile
    const prevCityName2 = cities[currentCityIndex2];
  
    // Richiamo la funzione getWeather passandogli i nuovi parametri aggiornati
    getWeather2(prevCityName2);
  
    // richiamo api sett
    getWeeklyWeather2(prevCityName2);
  
    document
      .querySelector(`.indicator-2 span:nth-child(${currentCityIndex2 + 1})`)
      .classList.add("selected");
  }
  
  // Chiamata iniziale (al caricamento)
  getWeather2(cities[currentCityIndex2]);
  // Utilizzo uno pseudo-selettore per selezionare lo span successivo
  // Aggiungo la classe selected
  document
    .querySelector(".indicator-2 span:nth-child(2)")
    .classList.add("selected");
  
  async function getWeeklyWeather(cityName) {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&ctn=10&APPID=09c6c3816e1f212ec1130819a38bcdc6`
      );
      // Converto i dati in file json
      const data = await response.json();
  
      // salvo i dati in degli array
      const sunDay = [
        kelvinToCelsius(data.list[0].main.temp_min).toFixed(0),
        kelvinToCelsius(data.list[0].main.temp_max).toFixed(0),
        data.list[0].weather[0].main,
      ];
      const monDay = [
        kelvinToCelsius(data.list[1].main.temp_min).toFixed(0),
        kelvinToCelsius(data.list[1].main.temp_max).toFixed(0),
        data.list[1].weather[0].main,
      ];
      const tuesDay = [
        kelvinToCelsius(data.list[2].main.temp_min).toFixed(0),
        kelvinToCelsius(data.list[2].main.temp_max).toFixed(0),
        data.list[2].weather[0].main,
      ];
      const wednesDay = [
        kelvinToCelsius(data.list[3].main.temp_min).toFixed(0),
        kelvinToCelsius(data.list[3].main.temp_max).toFixed(0),
        data.list[3].weather[0].main,
      ];
      const thursDay = [
        kelvinToCelsius(data.list[4].main.temp_min).toFixed(0),
        kelvinToCelsius(data.list[4].main.temp_max).toFixed(0),
        data.list[4].weather[0].main,
      ];
      const friDay = [
        kelvinToCelsius(data.list[5].main.temp_min).toFixed(0),
        kelvinToCelsius(data.list[5].main.temp_max).toFixed(0),
        data.list[5].weather[0].main,
      ];
      const saturDay = [
        kelvinToCelsius(data.list[6].main.temp_min).toFixed(0),
        kelvinToCelsius(data.list[6].main.temp_max).toFixed(0),
        data.list[6].weather[0].main,
      ];
  
      // modifico il DOM
      // DOMENICA'
      if (data.list[0].weather[0].main == "Clouds") {
        document.getElementById(
          "sun"
        ).innerHTML = `<p>Sun</p> <br> <p class="wheater"><i class="fa-solid fa-cloud"></i></p> <br> <p class="avg-temp"> ${sunDay[0]}°/${sunDay[1]}°`;
      } else if (data.list[0].weather[0].main == "Clear") {
        document.getElementById(
          "sun"
        ).innerHTML = `<p>Sun</p> <br> <p class="wheater"><i class="fa-solid fa-sun"></i></p> <br> <p class="avg-temp"> ${sunDay[0]}°/${sunDay[1]}°`;
      } else {
        document.getElementById(
          "sun"
        ).innerHTML = `<p>Sun</p> <br> <p class="wheater"><i class="fa-solid fa-cloud-rain"></i></p> <br> <p class="avg-temp"> ${sunDay[0]}°/${sunDay[1]}°`;
      }
  
      // LUNEDI'
      if (data.list[1].weather[0].main == "Clouds") {
        document.getElementById(
          "mon"
        ).innerHTML = `<p>Mon</p> <br> <p class="wheater"><i class="fa-solid fa-cloud"></i></p> <br> <p class="avg-temp"> ${monDay[0]}°/${monDay[1]}°`;
      } else if (data.list[1].weather[0].main == "Clear") {
        document.getElementById(
          "mon"
        ).innerHTML = `<p>Mon</p> <br> <p class="wheater"><i class="fa-solid fa-sun"></i></p> <br> <p class="avg-temp"> ${monDay[0]}°/${monDay[1]}°`;
      } else {
        document.getElementById(
          "mon"
        ).innerHTML = `<p>Mon</p> <br> <p class="wheater"><i class="fa-solid fa-cloud-rain"></i></p> <br> <p class="avg-temp"> ${monDay[0]}°/${monDay[1]}°`;
      }
  
      // MARTEDI'
      if (data.list[2].weather[0].main == "Clouds") {
        document.getElementById(
          "tue"
        ).innerHTML = `<p>Tue</p> <br> <p class="wheater"><i class="fa-solid fa-cloud"></i></p> <br> <p class="avg-temp"> ${tuesDay[0]}°/${tuesDay[1]}°`;
      } else if (data.list[2].weather[0].main == "Clear") {
        document.getElementById(
          "tue"
        ).innerHTML = `<p>Tue</p> <br> <p class="wheater"><i class="fa-solid fa-sun"></i></p> <br> <p class="avg-temp"> ${tuesDay[0]}°/${tuesDay[1]}°`;
      } else {
        document.getElementById(
          "tue"
        ).innerHTML = `<p>Tue</p> <br> <p class="wheater"><i class="fa-solid fa-cloud-rain"></i></p> <br> <p class="avg-temp"> ${tuesDay[0]}°/${tuesDay[1]}°`;
      }
  
      // MERCOLEDI'
      if (data.list[3].weather[0].main == "Clouds") {
        document.getElementById(
          "wed"
        ).innerHTML = `<p>Wed</p> <br> <p class="wheater"><i class="fa-solid fa-cloud"></i></p> <br> <p class="avg-temp"> ${wednesDay[0]}°/${wednesDay[1]}°`;
      } else if (data.list[3].weather[0].main == "Clear") {
        document.getElementById(
          "wed"
        ).innerHTML = `<p>Wed</p> <br> <p class="wheater"><i class="fa-solid fa-sun"></i></p> <br> <p class="avg-temp"> ${wednesDay[0]}°/${wednesDay[1]}°`;
      } else {
        document.getElementById(
          "wed"
        ).innerHTML = `<p>Wed</p> <br> <p class="wheater"><i class="fa-solid fa-cloud-rain"></i></p> <br> <p class="avg-temp"> ${wednesDay[0]}°/${wednesDay[1]}°`;
      }
  
      // GIOVEDI'
      if (data.list[4].weather[0].main == "Clouds") {
        document.getElementById(
          "thu"
        ).innerHTML = `<p>Thu</p> <br>  <p class="wheater"><i class="fa-solid fa-cloud"></i></p> <br> <p class="avg-temp"> ${thursDay[0]}°/${thursDay[1]}°`;
      } else if (data.list[4].weather[0].main == "Clear") {
        document.getElementById(
          "thu"
        ).innerHTML = `<p>Thu</p> <br>  <p class="wheater"><i class="fa-solid fa-sun"></i></p> <br> <p class="avg-temp"> ${thursDay[0]}°/${thursDay[1]}°`;
      } else {
        document.getElementById(
          "thu"
        ).innerHTML = `<p>Thu</p> <br>  <p class="wheater"><i class="fa-solid fa-cloud-rain"></i>/p> <br> <p class="avg-temp"> ${thursDay[0]}°/${thursDay[1]}°`;
      }
  
      // VENERDI'
      if (data.list[5].weather[0].main == "Clouds") {
        document.getElementById(
          "fri"
        ).innerHTML = `<p>Fri</p> <br> <p class="wheater"><i class="fa-solid fa-cloud"></i></p> <br> <p class="avg-temp"> ${friDay[0]}°/${friDay[1]}°`;
      } else if (data.list[5].weather[0].main == "Clear") {
        document.getElementById(
          "fri"
        ).innerHTML = `<p>Fri</p> <br> <p class="wheater"><i class="fa-solid fa-sun"></i></p> <br> <p class="avg-temp"> ${friDay[0]}°/${friDay[1]}°`;
      } else {
        document.getElementById(
          "fri"
        ).innerHTML = `<p>Fri</p> <br> <p class="wheater"><i class="fa-solid fa-cloud-rain"></i></p> <br> <p class="avg-temp"> ${friDay[0]}°/${friDay[1]}°`;
      }
  
      // SABATO
      if (data.list[6].weather[0].main == "Clouds") {
        document.getElementById(
          "sat"
        ).innerHTML = `<p>Sat</p> <br> <p class="wheater"><i class="fa-solid fa-cloud"></i></p> <br> <p class="avg-temp"> ${saturDay[0]}°/${saturDay[1]}°`;
      } else if (data.list[6].weather[0].main == "Clear") {
        document.getElementById(
          "sat"
        ).innerHTML = `<p>Sat</p> <br> <p class="wheater"><i class="fa-solid fa-sun"></i></p> <br> <p class="avg-temp"> ${saturDay[0]}°/${saturDay[1]}°`;
      } else {
        document.getElementById(
          "sat"
        ).innerHTML = `<p>Sat</p> <br> <p class="wheater"><i class="fa-solid fa-cloud-rain"></i></p> <br> <p class="avg-temp"> ${saturDay[0]}°/${saturDay[1]}°`;
      }
  
      console.log(sunDay, monDay, tuesDay, wednesDay, thursDay, friDay, saturDay);
    } catch (error) {
      console.log("errore", error);
    }
  }
  
  getWeeklyWeather(cities[currentCityIndex]);
  
  async function getWeeklyWeather2(cityName) {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&ctn=10&APPID=09c6c3816e1f212ec1130819a38bcdc6`
      );
      // Converto i dati in file json
      const data = await response.json();
  
      // salvo i dati in degli array
      const sunDay = [
        kelvinToCelsius(data.list[0].main.temp_min).toFixed(0),
        kelvinToCelsius(data.list[0].main.temp_max).toFixed(0),
        data.list[0].weather[0].main,
      ];
      const monDay = [
        kelvinToCelsius(data.list[1].main.temp_min).toFixed(0),
        kelvinToCelsius(data.list[1].main.temp_max).toFixed(0),
        data.list[1].weather[0].main,
      ];
      const tuesDay = [
        kelvinToCelsius(data.list[2].main.temp_min).toFixed(0),
        kelvinToCelsius(data.list[2].main.temp_max).toFixed(0),
        data.list[2].weather[0].main,
      ];
      const wednesDay = [
        kelvinToCelsius(data.list[3].main.temp_min).toFixed(0),
        kelvinToCelsius(data.list[3].main.temp_max).toFixed(0),
        data.list[3].weather[0].main,
      ];
      const thursDay = [
        kelvinToCelsius(data.list[4].main.temp_min).toFixed(0),
        kelvinToCelsius(data.list[4].main.temp_max).toFixed(0),
        data.list[4].weather[0].main,
      ];
      const friDay = [
        kelvinToCelsius(data.list[5].main.temp_min).toFixed(0),
        kelvinToCelsius(data.list[5].main.temp_max).toFixed(0),
        data.list[5].weather[0].main,
      ];
      const saturDay = [
        kelvinToCelsius(data.list[6].main.temp_min).toFixed(0),
        kelvinToCelsius(data.list[6].main.temp_max).toFixed(0),
        data.list[6].weather[0].main,
      ];
  
      // modifico il DOM
      // DOMENICA'
      if (data.list[0].weather[0].main == "Clouds") {
        document.getElementById(
          "sun-2"
        ).innerHTML = `<p>Sun</p> <br> <p class="wheater"><i class="fa-solid fa-cloud"></i></p> <br> <p class="avg-temp"> ${sunDay[0]}°/${sunDay[1]}°`;
      } else if (data.list[0].weather[0].main == "Clear") {
        document.getElementById(
          "sun-2"
        ).innerHTML = `<p>Sun</p> <br> <p class="wheater"><i class="fa-solid fa-sun"></i></p> <br> <p class="avg-temp"> ${sunDay[0]}°/${sunDay[1]}°`;
      } else {
        document.getElementById(
          "sun-2"
        ).innerHTML = `<p>Sun</p> <br> <p class="wheater"><i class="fa-solid fa-cloud-rain"></i></p> <br> <p class="avg-temp"> ${sunDay[0]}°/${sunDay[1]}°`;
      }
  
      // LUNEDI'
      if (data.list[1].weather[0].main == "Clouds") {
        document.getElementById(
          "mon-2"
        ).innerHTML = `<p>Mon</p> <br> <p class="wheater"><i class="fa-solid fa-cloud"></i></p> <br> <p class="avg-temp"> ${monDay[0]}°/${monDay[1]}°`;
      } else if (data.list[1].weather[0].main == "Clear") {
        document.getElementById(
          "mon-2"
        ).innerHTML = `<p>Mon</p> <br> <p class="wheater"><i class="fa-solid fa-sun"></i></p> <br> <p class="avg-temp"> ${monDay[0]}°/${monDay[1]}°`;
      } else {
        document.getElementById(
          "mon-2"
        ).innerHTML = `<p>Mon</p> <br> <p class="wheater"><i class="fa-solid fa-cloud-rain"></i></p> <br> <p class="avg-temp"> ${monDay[0]}°/${monDay[1]}°`;
      }
  
      // MARTEDI'
      if (data.list[2].weather[0].main == "Clouds") {
        document.getElementById(
          "tue-2"
        ).innerHTML = `<p>Tue</p> <br> <p class="wheater"><i class="fa-solid fa-cloud"></i></p> <br> <p class="avg-temp"> ${tuesDay[0]}°/${tuesDay[1]}°`;
      } else if (data.list[2].weather[0].main == "Clear") {
        document.getElementById(
          "tue-2"
        ).innerHTML = `<p>Tue</p> <br> <p class="wheater"><i class="fa-solid fa-sun"></i></p> <br> <p class="avg-temp"> ${tuesDay[0]}°/${tuesDay[1]}°`;
      } else {
        document.getElementById(
          "tue-2"
        ).innerHTML = `<p>Tue</p> <br> <p class="wheater"><i class="fa-solid fa-cloud-rain"></i></p> <br> <p class="avg-temp"> ${tuesDay[0]}°/${tuesDay[1]}°`;
      }
  
      // MERCOLEDI'
      if (data.list[3].weather[0].main == "Clouds") {
        document.getElementById(
          "wed-2"
        ).innerHTML = `<p>Wed</p> <br> <p class="wheater"><i class="fa-solid fa-cloud"></i></p> <br> <p class="avg-temp"> ${wednesDay[0]}°/${wednesDay[1]}°`;
      } else if (data.list[3].weather[0].main == "Clear") {
        document.getElementById(
          "wed-2"
        ).innerHTML = `<p>Wed</p> <br> <p class="wheater"><i class="fa-solid fa-sun"></i></p> <br> <p class="avg-temp"> ${wednesDay[0]}°/${wednesDay[1]}°`;
      } else {
        document.getElementById(
          "wed-2"
        ).innerHTML = `<p>Wed</p> <br> <p class="wheater"><i class="fa-solid fa-cloud-rain"></i></p> <br> <p class="avg-temp"> ${wednesDay[0]}°/${wednesDay[1]}°`;
      }
  
      // GIOVEDI'
      if (data.list[4].weather[0].main == "Clouds") {
        document.getElementById(
          "thu-2"
        ).innerHTML = `<p>Thu</p> <br>  <p class="wheater"><i class="fa-solid fa-cloud"></i></p> <br> <p class="avg-temp"> ${thursDay[0]}°/${thursDay[1]}°`;
      } else if (data.list[4].weather[0].main == "Clear") {
        document.getElementById(
          "thu-2"
        ).innerHTML = `<p>Thu</p> <br>  <p class="wheater"><i class="fa-solid fa-sun"></i></p> <br> <p class="avg-temp"> ${thursDay[0]}°/${thursDay[1]}°`;
      } else {
        document.getElementById(
          "thu-2"
        ).innerHTML = `<p>Thu</p> <br>  <p class="wheater"><i class="fa-solid fa-cloud-rain"></i>/p> <br> <p class="avg-temp"> ${thursDay[0]}°/${thursDay[1]}°`;
      }
  
      // VENERDI'
      if (data.list[5].weather[0].main == "Clouds") {
        document.getElementById(
          "fri-2"
        ).innerHTML = `<p>Fri</p> <br> <p class="wheater"><i class="fa-solid fa-cloud"></i></p> <br> <p class="avg-temp"> ${friDay[0]}°/${friDay[1]}°`;
      } else if (data.list[5].weather[0].main == "Clear") {
        document.getElementById(
          "fri-2"
        ).innerHTML = `<p>Fri</p> <br> <p class="wheater"><i class="fa-solid fa-sun"></i></p> <br> <p class="avg-temp"> ${friDay[0]}°/${friDay[1]}°`;
      } else {
        document.getElementById(
          "fri-2"
        ).innerHTML = `<p>Fri</p> <br> <p class="wheater"><i class="fa-solid fa-cloud-rain"></i></p> <br> <p class="avg-temp"> ${friDay[0]}°/${friDay[1]}°`;
      }
  
      // SABATO
      if (data.list[6].weather[0].main == "Clouds") {
        document.getElementById(
          "sat-2"
        ).innerHTML = `<p>Sat</p> <br> <p class="wheater"><i class="fa-solid fa-cloud"></i></p> <br> <p class="avg-temp"> ${saturDay[0]}°/${saturDay[1]}°`;
      } else if (data.list[6].weather[0].main == "Clear") {
        document.getElementById(
          "sat-2"
        ).innerHTML = `<p>Sat</p> <br> <p class="wheater"><i class="fa-solid fa-sun"></i></p> <br> <p class="avg-temp"> ${saturDay[0]}°/${saturDay[1]}°`;
      } else {
        document.getElementById(
          "sat-2"
        ).innerHTML = `<p>Sat</p> <br> <p class="wheater"><i class="fa-solid fa-cloud-rain"></i></p> <br> <p class="avg-temp"> ${saturDay[0]}°/${saturDay[1]}°`;
      }
  
      console.log(sunDay, monDay, tuesDay, wednesDay, thursDay, friDay, saturDay);
    } catch (error) {
      console.log("errore", error);
    }
  }
  
  getWeeklyWeather2(cities[currentCityIndex2]);
  