import { useState, useEffect } from "react";
import axios from "axios";

const API_endpoints = `https://api.openweathermap.org/data/2.5/weather?`;
const API_key = `6be42835076e47d1e06a1daa59357c90`;

function App() {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [currentPosition, setCurrentPosition] = useState({});
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    let interval=setInterval(()=>{
      setTime(new Date());
    },1000);

    return()=>{
      clearInterval(interval);
    }
  }, [time]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      },
      (error) => {
        console.error("Geolocation Error: ", error);
      }
    );
  }, []);

  useEffect(() => {
    if (latitude && longitude) {
      let finalApiEndPoint = `${API_endpoints}lat=${latitude}&lon=${longitude}&appid=${API_key}`;

      axios
        .get(finalApiEndPoint)
        .then((response) => {
          console.log(response.data);
          setCurrentPosition(response.data);
        })
        .catch((error) => {
          console.error("API Error:", error);
        });
    }
  }, [latitude, longitude]);

  return (
    <>
      <div>
        <h2>Current location : {currentPosition.name}</h2>
        <h2>Current Time : {time.toLocaleTimeString()}</h2>
        <h2>Current Date : {time.toLocaleDateString()}</h2>
      </div>
    </>
  );
}

export default App;
