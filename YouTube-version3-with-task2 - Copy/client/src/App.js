import "./App.css";
import React, { useEffect, useState } from "react";
import Navbar from "./Component/Navbar/Navbar";
import { useDispatch } from "react-redux";
import Allroutes from "../src/Allroutes";
import { BrowserRouter as Router } from "react-router-dom";
import Drawersliderbar from "../src/Component/Leftsidebar/Drawersliderbar";
import Createeditchannel from "./Pages/Channel/Createeditchannel";
import Videoupload from "./Pages/Videoupload/Videoupload";
import { fetchallchannel } from "./action/channeluser";
import { getallvideo } from "./action/video";
import { getallcomment } from "./action/comment";
import { getallhistory } from "./action/history";
import { getalllikedvideo } from "./action/likedvideo";
import { getallwatchlater } from "./action/watchlater";
import axios from "axios";

const API_endpoints = `https://api.openweathermap.org/data/2.5/weather?`;
const WEATHER_API_KEY = `6be42835076e47d1e06a1daa59357c90`;
const OPENCAGE_API_KEY = "2a53e89b51434c85859dd4b85dc26de4";

const southIndianStates = ["Tamil Nadu", "Kerala", "Karnataka", "Andhra Pradesh", "Telangana", "Maharashtra"];

function App() {
  const [toggledrawersidebar, settogledrawersidebar] = useState({
    display: "none",
  });
  const dispatch = useDispatch();
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    dispatch(fetchallchannel());
    dispatch(getallvideo());
    dispatch(getallcomment());
    dispatch(getallhistory());
    dispatch(getalllikedvideo());
    dispatch(getallwatchlater());
  }, [dispatch]);

  const toggledrawer = () => {
    if (toggledrawersidebar.display === "none") {
      settogledrawersidebar({
        display: "flex",
      });
    } else {
      settogledrawersidebar({
        display: "none",
      });
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      },
      (error) => {
        console.error("Geolocation Error: ", error);
        setTheme("dark"); // Default theme if geolocation is denied
      }
    );
  }, []);

  useEffect(() => {
    if (latitude && longitude) {
      let weatherApiUrl = `${API_endpoints}lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}`;

      axios
        .get(weatherApiUrl)
        .then((response) => {
          axios
            .get(
              `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${OPENCAGE_API_KEY}`
            )
            .then((geoResponse) => {
              const state = geoResponse.data.results?.[0]?.components?.state;
              console.log("Detected State:", state); // Log the state
              const currentHour = new Date().getHours();

              if (
                state &&
                southIndianStates.includes(state) &&
                currentHour >= 10 &&
                currentHour < 12
              ) {
                setTheme("white");
              } else {
                setTheme("dark");
              }
            })
            .catch((geoError) => console.error("Geolocation API Error:", geoError));
        })
        .catch((error) => console.error("Weather API Error:", error));
    }
  }, [latitude, longitude]);

  const [editcreatechanelbtn, seteditcreatechanelbtn] = useState(false);
  const [videouploadpage, setvideouploadpage] = useState(false);

  return (
    <div className={theme === "white" ? "white-theme" : "dark-theme"}>
      <Router>
        {videouploadpage && (
          <Videoupload setvideouploadpage={setvideouploadpage} />
        )}
        {editcreatechanelbtn && (
          <Createeditchannel
            seteditcreatechanelbtn={seteditcreatechanelbtn}
          />
        )}
        <Navbar
          seteditcreatechanelbtn={seteditcreatechanelbtn}
          toggledrawer={toggledrawer}
        />
        <Drawersliderbar
          toggledraw={toggledrawer}
          toggledrawersidebar={toggledrawersidebar}
        />
        <Allroutes
          seteditcreatechanelbtn={seteditcreatechanelbtn}
          setvideouploadpage={setvideouploadpage}
        />
      </Router>
    </div>
  );
}

export default App;