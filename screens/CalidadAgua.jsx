import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

export const CalidadAgua = () => {

  const navigation = useNavigation();

  const [nombreComunidad, setNombreComunidad] = useState('');
  const [numeroCasa, setNumeroCasa] = useState('');
  const [cloroResidual, setCloroResidual] = useState('');
  const [phResidual, setPHResidual] = useState('');

  const Botonfunciona = () => {
    // Validación para los campos
    if (nombreComunidad === '') {
      alert('¡El campo de nombre de la comunidad es requerido!');
      return;
    }
    if (numeroCasa === '') {
      alert('¡El campo de número de casa es requerido!');
      return;
    }
    if (cloroResidual === '') {
      alert('¡El campo de cloro residual es requerido!');
      return;
    }
    if (phResidual === '') {
      alert('¡El campo de pH residual es requerido!, puede colocar un 0 en caso de no realizar una prueba para continuar');
      return;
    }
   
    // Aquí se puede realizar otras acciones después de la validación
    // Por ejemplo, enviar los datos o realizar algún cálculo

     // Navegar a la nueva pantalla y pasar los datos como parámetros
     navigation.navigate('Analisis Calidad del Agua', {
      nombreComunidad,
      numeroCasa,
      cloroResidual,
      phResidual,
    })
  
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calidad del Agua</Text>
      <View>
        <Text style={styles.titleInput}>Nombre de la Comunidad:</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder='Ej. Colonia Buena Vista'
            placeholderTextColor='rgba(0, 0, 0, 0.5)' // Gris opaco
            onChangeText={(text) => setNombreComunidad(text)}
          />
        </View>

        <Text style={styles.titleInput}>Número de Casa:</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder='Ej. 10'
            placeholderTextColor='rgba(0, 0, 0, 0.5)' // Gris opaco
            keyboardType='numeric'
            onChangeText={(text) => setNumeroCasa(text)}
          />
        </View>

        <Text style={styles.titleInput}>Cantidad Cloro Residual:</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder='Ej. 1.2'
            placeholderTextColor='rgba(0, 0, 0, 0.5)' // Gris opaco
            keyboardType='numeric'
            onChangeText={(text) => setCloroResidual(text)}
          />
        </View>

        <Text style={styles.titleInput}>Cantidad PH Residual:</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder='Ej. 2.5'
            placeholderTextColor='rgba(0, 0, 0, 0.5)' // Gris opaco
            keyboardType='numeric'
            onChangeText={(text) => setPHResidual(text)}
          />
        </View>

        <TouchableOpacity
          style={[styles.buttonPrimary, { backgroundColor: '#F67280' }]}
          onPress={Botonfunciona}
        >
          <Text style={styles.buttonText}>Calcular Calidad</Text>
        </TouchableOpacity>
      </View>

      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#355C7D',
  },
  title: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  titleInput: {
    fontSize: 16,
    color: 'white',
    marginBottom: 5,
    marginLeft: 30,
    marginTop: 10,
    textAlign: 'left', // Alinea el texto a la izquierda
    
  },
  inputContainer: {
    width: '85%',
    height: 35,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: 'center',
    backgroundColor: 'white',
    marginLeft: 30,
  },
  input: {
    paddingLeft: 10,
    color: 'black', // Establece el color del texto a negro 
  },
  button: {
    width: '80%', // Ancho del botón
    height: 50, // Alto del botón
    marginTop: 30, // Separación entre botones
    alignItems: 'center',
    marginLeft: '10.6%',
    justifyContent: 'center',
    borderRadius: 8, // Bordes redondeados
  },
  buttonText: {
    fontSize: 18,
    color: 'white', // Color del texto
    fontWeight: 'bold',
  },
  buttonPrimary: {
    width: '80%', // Ancho del botón
    height: 70, // Alto del botón
    marginTop: 40, // Separación entre botones
    alignItems: 'center',
    marginLeft: '10.6%',
    justifyContent: 'center',
    borderRadius: 8, // Bordes redondeados
    
  },
});
