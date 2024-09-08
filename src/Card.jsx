import dayBg from "./assets/day.jpg";
import nightBg from "./assets/night.jpg";
import { useEffect, useState } from "react";

export function Card({ location, temp }) {
  const [icon, setIcon] = useState(null);

  const data = {
    tempValue: temp?.Temperature.Metric.Value ?? "12",
    tempUnit: temp?.Temperature.Metric.Unit ?? "C",
    cityName: location?.LocalizedName ?? "Ranchi",
    stateName: location?.AdministrativeArea.EnglishName ?? "Jharkhand",
    countryName: location?.Country.EnglishName ?? "India",
  };

  const { tempValue, tempUnit, cityName, stateName, countryName } = data;

  useEffect(() => {
    const importIcon = async () => {
      const module = await import(
        `./assets/icons/${temp?.WeatherIcon ?? 7}.svg`
      );
      setIcon(module.default);
    };

    importIcon();
  }, [temp]);

  return (
    <div
      className="card mx-auto"
      style={{
        maxWidth: "480px",
        minHeight: "360px",
        backgroundImage: `url(${temp?.IsDayTime ? dayBg : nightBg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="card-body text-center">
        <div className="top-side">
          <img src={icon} alt="" />
          <h2 className="h3 fw-bold my-2">
            {tempValue} °{tempUnit}
          </h2>
          <p>{temp?.WeatherText ?? "Cloudy"}</p>
        </div>
        <h3 className="h5">
          {cityName}, {stateName}, {countryName}
        </h3>
      </div>
    </div>
  );
}
