import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export const ControlVectorial = () => {

  const navigation = useNavigation();

  const [nombreComunidad, setNombreComunidad] = useState('');
  const [numeroCasasProgramadas, setNumeroCasasProgramadas] = useState('');
  const [numeroCasasTratadas, setNumeroCasasTratadas] = useState('');
  const [numeroCasasPositivas, setNumeroCasasPositivas] = useState('');
  const [numeroCasasNegativas, setNumeroCasasNegativas] = useState('');
  const [numeroRecipientesPositivos, setNumeroRecipientesPositivos] = useState('');
  const [numeroRecipientesNegativos, setNumeroRecipientesNegativos] = useState('');

  const Botonfunciona = () => {
    // Validación para los campos
    if (nombreComunidad === '') {
      alert('¡El campo de nombre de la comunidad es requerido!');
      return;
    }
    if (numeroCasasProgramadas === '') {
      alert('¡El campo de numero de casa programadas es requerido!');
      return;
    }
    if (numeroCasasTratadas === '') {
      alert('¡El campo numero de cadas tratadas es requerido!');
      return;
    }
    if (numeroCasasPositivas === '') {
      alert('¡El campo numero de casas positivas es requerido!');
      return;
    }
    if (numeroCasasNegativas === '') {
      alert('¡El campo numero de casas negativas es requerido!');
      return;
    }
    if (numeroRecipientesPositivos === '') {
      alert('¡El campo numero de recipientes positivos es requerido!');
      return;
    }
    if (numeroRecipientesNegativos === '') {
      alert('¡El campo numero de recipientes negativos es requerido!');
      return;
    }
   
    // Aquí se puede realizar otras acciones después de la validación
    // Por ejemplo, enviar los datos o realizar algún cálculo

     // Navegar a la nueva pantalla y pasar los datos como parámetros
     navigation.navigate('Analisis Control Vectorial', {
      nombreComunidad,
      numeroCasasProgramadas,
      numeroCasasTratadas,
      numeroCasasPositivas,
      numeroCasasNegativas,
      numeroRecipientesPositivos,
      numeroRecipientesNegativos,
    });
  
  };

  return (
    <ScrollView>
    <View style={styles.container}>
      <Text style={styles.title}> Control Vectorial</Text>
      <View>
        <Text style={styles.titleInput}>Nombre de la Comunidad:</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder='Ej. Colonia Buena Vista'
            placeholderTextColor='rgba(0,0,0,0.5)' // Cambia el color del texto del placeholder
            onChangeText={(text) => setNombreComunidad(text)}
          />
        </View>
        <Text style={styles.titleInput}>Numero de Casas Programadas:</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder='Ej. 10'
            placeholderTextColor='rgba(0,0,0,0.5)' // Cambia el color del texto del placeholder
            keyboardType='numeric' // Asegura que solo se ingresen números
            onChangeText={(text) => setNumeroCasasProgramadas(text)}
          />
        </View>
        <Text style={styles.titleInput}>Numero de Casas Tratadas:</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder='Ej. 7'
            placeholderTextColor='rgba(0,0,0,0.5)' // Cambia el color del texto del placeholder
            keyboardType='numeric' // Asegura que solo se ingresen números
            onChangeText={(text) => setNumeroCasasTratadas(text)}
          />
        </View>
        <Text style={styles.titleInput}>Numero de Casas Positivas:</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder='Ej. 5'
            placeholderTextColor='rgba(0,0,0,0.5)' // Cambia el color del texto del placeholder
            keyboardType='numeric' // Asegura que solo se ingresen números
            onChangeText={(text) => setNumeroCasasPositivas(text)}
          />
        </View>
        <Text style={styles.titleInput}>Numero de Casas Negativas:</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder='Ej. 30'
            placeholderTextColor='rgba(0,0,0,0.5)' // Cambia el color del texto del placeholder
            keyboardType='numeric' // Asegura que solo se ingresen números
            onChangeText={(text) => setNumeroCasasNegativas(text)}
          />
        </View>
        <Text style={styles.titleInput}>Numero de Recipientes de Agua Positivos:</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder='Ej. 30'
            placeholderTextColor='rgba(0,0,0,0.5)' // Cambia el color del texto del placeholder
            keyboardType='numeric' // Asegura que solo se ingresen números
            onChangeText={(text) => setNumeroRecipientesPositivos(text)}
          />
        </View>
        <Text style={styles.titleInput}>Numero de Recipientes de Agua Negativos:</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder='Ej. 30'
            placeholderTextColor='rgba(0,0,0,0.5)' // Cambia el color del texto del placeholder
            keyboardType='numeric' // Asegura que solo se ingresen números
            onChangeText={(text) => setNumeroRecipientesNegativos(text)}
          />
        </View>
        <TouchableOpacity
          style={[styles.buttonPrimary, { backgroundColor: '#F67280' }]}
          onPress={Botonfunciona}
        >
          <Text style={styles.buttonText}>Calcular Indices</Text>
        </TouchableOpacity>
      </View>
      
      
    </View>
    <StatusBar style="auto" />
    </ScrollView>
    
  )
}



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

