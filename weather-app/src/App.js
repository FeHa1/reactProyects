import './App.css';
import { useState } from "react";

const api = {
  key: 'f07cc21482b52c155573aa1ed2a7b682',
  base: 'https://api.openweathermap.org/data/2.5/',
};

const traductorClima = {
  "Clear": "Despejado",
  "Clouds": "Nublado",
  "Rain": "Lluvia",
  "Snow": "Nieve",
  "Thunderstorm": "Tormenta",
  "Drizzle": "Llovizna",
  "Mist": "Niebla",
};

function App() {

  const [search, setSearch] = useState(""); 
  const [weather, setWeather] = useState({});

  const botonBusqueda = () => {
    fetch(`${api.base}weather?q=${search}&units=metric&lang=es&APPID=${api.key}`)
      .then(res => res.json())
      .then((result) => {
        setWeather(result);
      });
  };

  const busquedaEnter = (e) => {
    if (e.key === 'Enter') {
      botonBusqueda();
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        {/* HEADER */}
        <h1>Aplicación del Clima</h1>

        {/* Buscador */}
        <div>
          <input 
            type="text" 
            placeholder="Ingrese ciudad..."
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown = {busquedaEnter}
          />
          <button onClick={botonBusqueda}>Buscar</button>
        </div>

        {typeof weather.main !== "undefined" ? (
          <div>
            {/* Locación */}
            <p>{weather.name}</p>

            {/* Temperatura */}
            <p>{weather.main.temp} °C</p>

            {/* Condiciones */}
            <p>{traductorClima[weather.weather[0].main] || weather.weather[0].main}</p>
            <p>({weather.weather[0].description})</p>
          </div>
        ) : (
          <p>No se puede encontrar la información del clima.</p>
        )}
      </header>
    </div>
  );
}

export default App;