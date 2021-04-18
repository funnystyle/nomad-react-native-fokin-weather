import React, { useEffect, useState } from "react";
import { Alert } from "react-native";
import Loading from "./Loading";
import * as Location from "expo-location";
import axios from "axios";
import Weather from "./Weather";

const API_KEY = "e88539b804130a2cf7fa53d9e71284bd";

export default class extends React.Component {
  state = {
    isLoading: true,
  };
  getWeather = async (latitude, longitude) => {
    const { data } = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
    );
    this.setState({ isLoading: false, temp: data.main.temp });
  };
  getLocation = async () => {
    try {
      // await Location.requestPermissionsAsync(); // deprecated
      await Location.getForegroundPermissionsAsync();
      const {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync();
      this.getWeather(latitude, longitude);
    } catch (error) {
      Alert.alert("Can't find you.", "So sad");
    }
  };
  componentDidMount() {
    this.getLocation();
  }
  render() {
    const { isLoading, temp } = this.state;
    return isLoading ? <Loading /> : <Weather temp={Math.round(temp)} />;
  }
}

// const App = () => {
//   const [isLoading, setIsLoading] = useState(true);
//   // const [location, setLocation] = useState({ latitude: null, longitude: null });
//   const [temp, setTemp] = useState();

//   const getWeather = async (latitude, longitude) => {
//     const { data } = await axios.get(
//       `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
//     );
//     setIsLoading(false);
//     setTemp(data.main.temp);
//   };
//   const getLocation = async () => {
//     try {
//       // await Location.requestPermissionsAsync(); // deprecated
//       await Location.getForegroundPermissionsAsync();
//       const {
//         coords: { latitude, longitude },
//       } = await Location.getCurrentPositionAsync();
//       getWeather(latitude, longitude);
//       setIsLoading(false);
//     } catch (error) {
//       Alert.alert("Can't find you.", "So sad");
//     }
//   };

//   useEffect(() => {
//     getLocation();
//   }, []);

//   return isLoading ? <Loading /> : <Weather temp={Math.round(temp)} />;
// };

// export default App;
