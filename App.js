import React from 'react';
import { Alert } from 'react-native';
import Loading from './Loading';
import Weather from './Weather';
import * as Location from 'expo-location';
import axios from 'axios';


const API_KEY = '79c061252b5891bca9b67be8cfa7e19c';


export default class extends React.Component {
  state = {
    isLoading: true
  }

  getWeather = async (latitude, longitude) => {
    const { data } = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
    );
    this.setState({ isLoading: false, temp: data.main.temp });
  };
  
  getLocation = async () => {
    try {
      await Location.requestPermissionsAsync();
      const { 
        coords: { latitude, longitude } 
      } = await Location.getCurrentPositionAsync();
      this.getWeather(latitude, longitude)
      //Send to API and get weather!
    } catch (error) {
      Alert.alert("Can't find you.", "So sad");
    }
  };

  componentDidMount() {
    this.getLocation();
  }

  render() {
    const { isLoading, temp } = this.state;
    return isLoading ? <Loading /> : <Weather temp = {Math.round(temp)} />;
  }
}