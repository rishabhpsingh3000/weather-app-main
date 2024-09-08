import { useEffect, useState } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Card } from "./Card";
import { Search } from "./Search";
import "./css/main.css";

function App() {
  const apiKey = import.meta.env.VITE_API_KEY;
  const [query, setQuery] = useState("");
  const [categories, setCategories] = useState({
    location: null,
    temp: null,
  });

  function getForecastData() {
    fetch(
      `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${apiKey}&q=${query}`
    )
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        }
      })
      .then((data) => {
        setCategories((prev) => ({ ...prev, location: data[0] }));

        const { Key } = data[0];
        return fetch(
          `http://dataservice.accuweather.com/currentconditions/v1/${Key}?apikey=${apiKey}`
        );
      })
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        }
      })
      .then((data) => {
        setCategories((prev) => ({ ...prev, temp: data[0] }));
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <div className="container">
      <h1 className="text-capitalize fw-semibold text-primary text-center mt-5 mb-4">
        Weather App
      </h1>

      <Card location={categories.location} temp={categories.temp} />
      <Search
        query={query}
        setQuery={setQuery}
        getForecastData={getForecastData}
      />
    </div>
  );
}

export default App;
