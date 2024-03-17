import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import axios from 'axios';
import * as Location from 'expo-location'; // Si estás utilizando Expo
import { FontAwesome5 } from '@expo/vector-icons'; // Importa el icono de FontAwesome5

const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  const API_KEY = '08a5b5addc7ea795588e87551675948b';

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  useEffect(() => {
    if (location) {
      const fetchData = async () => {
        try {
          const { latitude, longitude } = location.coords;
          const apiUrl = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;
          const response = await axios.get(apiUrl);
          setWeatherData(response.data);
        } catch (error) {
          console.error('Error obteniendo los datos de clima:', error);
        }
      };
      fetchData();
    }
  }, [location]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const renderWeatherIcon = (weatherCode) => {
    switch (weatherCode) {
      case '01d':
      case '01n':
        return <FontAwesome5 name="sun" size={16} color="white" />;
      case '02d':
      case '02n':
        return <FontAwesome5 name="cloud-sun" size={16} color="white" />;
      case '03d':
      case '03n':
        return <FontAwesome5 name="cloud" size={16} color="white" />;
      case '04d':
      case '04n':
        return <FontAwesome5 name="cloud-showers-heavy" size={16} color="white" />;
      case '09d':
      case '09n':
        return <FontAwesome5 name="cloud-showers-heavy" size={16} color="white" />;
      case '10d':
      case '10n':
        return <FontAwesome5 name="cloud-rain" size={16} color="white" />;
      case '11d':
      case '11n':
        return <FontAwesome5 name="bolt" size={16} color="white" />;
      case '13d':
      case '13n':
        return <FontAwesome5 name="snowflake" size={16} color="white" />;
      case '50d':
      case '50n':
        return <FontAwesome5 name="smog" size={16} color="white" />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {weatherData ? (
        <View>
          <Text style={styles.title}>
            Temperatura actual: {weatherData.main.temp}°C {renderWeatherIcon(weatherData.weather[0].icon)}
          </Text>
          <Text style={styles.texto}>Sensación térmica: {weatherData.main.feels_like}°C</Text>
          <Text style={styles.texto}>Hora actual: {currentTime.toLocaleTimeString()}</Text>
        </View>
      ) : (
        <Text>{errorMsg || 'Cargando...'}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#355C7D',
  },
  texto: {
    fontSize: 12,
    color: 'white', // Color del texto
    fontWeight: 'bold',
  },
  title: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default WeatherApp;
