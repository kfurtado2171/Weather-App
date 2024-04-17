import React, { useState, useEffect } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBInputGroup,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";

// Import SVG banner
import banner from "../assets/banner.jpg";

export default function WeatherApp() {
  const [searchTerm, setSearchTerm] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const city = event.target.elements.city.value.trim();
    if (!city) {
      setError("Please enter a city.");
      return;
    }
    setSearchTerm(city);
    setError(null);
  };

  useEffect(() => {
    const API_KEY = '01cc6708e0b36a39e9bdd42e76b00567';
    const API_Page = `https://api.openweathermap.org`
    const API_URL = `${API_Page}/data/2.5/weather?q=${searchTerm}&units=metric&appid=${API_KEY}`;
  
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        setError('Error fetching weather data. Please try again.');
      }
    };
    if (searchTerm) {
      fetchData();
    }
  }, [searchTerm]);

  return (
    <section className="vh-100 d-flex flex-column">
      <img src={banner} alt="Banner" className="mb-4" style={{ width: "100%", maxHeight: "300px" }} />

      <MDBContainer className="py-5 flex-grow-1">
        <MDBRow className="justify-content-center align-items-center">
          <MDBCol md="8" lg="6" xl="4">
            <MDBTypography tag="h3" className="mb-4 pb-2 fw-normal">
              Check the weather forecast
            </MDBTypography>

            {error && <div className="alert alert-danger">{error}</div>}
            
            <form onSubmit={handleSubmit}>
              <MDBInputGroup className="mb-3">
                <input
                  className="form-control rounded"
                  type="text"
                  placeholder="City"
                  name="city"
                />
                <button type="submit" className="input-group-text border-0 fw-bold" id="search-addon">
                  Check!
                </button>
              </MDBInputGroup>
            </form>

            {weatherData && (
              <MDBCard className="shadow-0 border mt-4">
                <MDBCardBody className="p-4">
                  <MDBTypography tag="h4" className="mb-1 sfw-normal">{weatherData.name}, {weatherData.sys.country}</MDBTypography>
                  <p className="mb-2">
                    Current temperature: <strong>{weatherData.main.temp}°C</strong>
                  </p>
                  <p>
                    Feels like: <strong>{weatherData.main.feels_like}°C</strong>
                  </p>
                  <p>
                    Max: <strong>{weatherData.main.temp_max}°C</strong>, Min: <strong>{weatherData.main.temp_min}°C</strong>
                  </p>
                  <p>
                    Wind Speed: <strong>{weatherData.wind.speed} m/s</strong>
                  </p>
                  <p>
                    Humidity: <strong>{weatherData.main.humidity}%</strong>
                  </p>
                  <p>
                    Condition: <strong>{weatherData.weather[0].description}%</strong>
                  </p>
                </MDBCardBody>
              </MDBCard>
            )}
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}
