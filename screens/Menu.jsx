import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import WeatherApp from '../components/Clima';

export const Menu = () => {
  const navigation = useNavigation();

  const goToControlVectorial = () => {
    navigation.navigate('Control Vectorial');
  };

  const goToCalidadAgua = () => {
    navigation.navigate('Calidad del Agua');
  };

  const goToRegistroCV = () => {
    navigation.navigate('RegistroCV');
  };

  const goToRegistroCA = () => {
    navigation.navigate('RegistroCA');
  };

  return (
    <View style={styles.container}>
      <View style={styles.weatherContainer}>
        <WeatherApp />
      </View>
      <Text style={styles.title}>Menu</Text>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#F8B195' }]}
        onPress={goToControlVectorial}
      >
        <Text style={styles.buttonText}>Control Vectorial</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#F8B195' }]}
        onPress={goToCalidadAgua}
      >
        <Text style={styles.buttonText}>Calidad del Agua</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#F67280' }]}
        onPress={goToRegistroCV}
      >
        <Text style={styles.buttonText}>Registro Control Vectorial</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#F67280' }]}
        onPress={goToRegistroCA}
      >
        <Text style={styles.buttonText}>Registro Calidad del Agua</Text>
      </TouchableOpacity>
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
  weatherContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  button: {
    width: '80%', // Ancho del botón
    height: 50, // Alto del botón
    marginTop: 40, // Separación entre botones
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8, // Bordes redondeados
  },
  buttonText: {
    fontSize: 18,
    color: 'white', // Color del texto
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
