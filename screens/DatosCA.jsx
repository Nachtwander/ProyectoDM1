import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, Image, TouchableOpacity, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const DatosCA = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const {
    id,
    nombreComunidad,
    numeroCasa,
    cloroResidual,
    phResidual,
    image,
    image2,
  } = route.params;

  const [cloroBackgroundColor, setCloroBackgroundColor] = useState('white');
  const [phBackgroundColor, setPhBackgroundColor] = useState('white');

  useEffect(() => {
    const getCloroBackgroundColor = () => {
      const cloroValue = parseFloat(cloroResidual);
      if (cloroValue >= 1.0 && cloroValue <= 1.5) {
        return 'green';
      } else if ((cloroValue >= 0.5 && cloroValue <= 0.9) || (cloroValue >= 1.6 && cloroValue <= 1.9)) {
        return 'yellow';
      } else {
        return 'red';
      }
    };

    const getPhBackgroundColor = () => {
      const phValue = parseFloat(phResidual);
      if (phValue >= 6.5 && phValue <= 7.5) {
        return 'green';
      } else if ((phValue >= 6.0 && phValue <= 6.4) || (phValue >= 7.6 && phValue <= 8.0)) {
        return 'yellow';
      } else {
        return 'red';
      }
    };

    setCloroBackgroundColor(getCloroBackgroundColor());
    setPhBackgroundColor(getPhBackgroundColor());
  }, [cloroResidual, phResidual]);

  const InfoPH = () => {
    Alert.alert('PH Residual', 'Los niveles OPTIMOS de PH en agua son entre los rangos de 6.5 y 7.5, los niveles de ADVERTENCIA están entre 6.0-6.4 y 7.6-8.0, los niveles de PELIGRO están entre 5.9 o menos y 8.1 o más.');
  };

  const infoCloro = () => {
    Alert.alert('Cloro Residual', 'Los niveles OPTIMOS en cloro residual en mg/lts son: de 1.0 a 1.5, los niveles de ADVERTENCIA están entre 0.9-0.5 y 1.6-1.9, los niveles de PELIGRO están entre 0.4 o menos y 2.0 o más.');
  };

  const handleDeleteRegistro = async () => {
    try {
      // Obtener los registros actuales de AsyncStorage
      const jsonValue = await AsyncStorage.getItem('datosCA');
      let registros = jsonValue != null ? JSON.parse(jsonValue) : [];
      
      // Filtrar los registros para eliminar el registro con el ID específico
      registros = registros.filter(registro => registro.id !== id);

      // Guardar los registros actualizados en AsyncStorage
      await AsyncStorage.setItem('datosCA', JSON.stringify(registros));

      // Regresar a la pantalla anterior después de borrar los datos
      navigation.goBack();
    } catch (error) {
      console.error('Error al borrar los datos del registro:', error);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Análisis de Calidad del Agua</Text>

        <Text style={styles.titleInput}>Nombre de la Comunidad: </Text>
        <View style={styles.inputContainer2}>
          <TextInput style={styles.input} value={nombreComunidad} editable={false}></TextInput>
        </View>

        <Text style={styles.titleInput}>Número de Casa: </Text>
        <View style={styles.inputContainer2}>
          <TextInput style={styles.input} value={numeroCasa} editable={false}></TextInput>
        </View>

        <Text style={styles.titleInput}>Cantidad Cloro Residual en mg/lts: </Text>
        <View style={[styles.inputContainer2, { backgroundColor: cloroBackgroundColor }]}>
          <TextInput style={styles.input} value={cloroResidual} editable={false}></TextInput>
        </View>
        <TouchableOpacity onPress={infoCloro}>
          <Text style={styles.infoText}>Más información sobre Cloro Residual...</Text>
        </TouchableOpacity>

        <View style={styles.imageContainer}>
          {image && <Image source={{ uri: image }} style={styles.image} />}
        </View>

        <Text style={styles.titleInput}>Cantidad PH en Agua: </Text>
        <View style={[styles.inputContainer2, { backgroundColor: phBackgroundColor }]}>
          <TextInput style={styles.input} value={phResidual} editable={false}></TextInput>
        </View>
        <TouchableOpacity onPress={InfoPH}>
          <Text style={styles.infoText}>Más información sobre el PH...</Text>
        </TouchableOpacity>

        <View style={styles.imageContainer}>
          {image2 && <Image source={{ uri: image2 }} style={styles.image} />}
        </View>

        <TouchableOpacity style={[styles.buttonPrimary, { backgroundColor: '#F67280' }]} onPress={handleDeleteRegistro}>
          <Text style={styles.deleteButtonText}>Borrar Datos</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#355C7D',
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  titleInput: {
    fontSize: 16,
    color: 'white',
    marginBottom: 5,
    marginLeft: 30,
    marginTop: 10,
    textAlign: 'left',
  },
  inputContainer: {
    width: '85%',
    height: 35,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: 'center',
    marginLeft: 30,
  },
  inputContainer2: {
    width: '85%',
    height: 35,
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: 'center',
    marginLeft: 30,
  },
  input: {
    paddingLeft: 10,
    color: 'black',
  },
  infoText: {
    textDecorationLine: 'underline',
    color: '#F8B195',
    marginLeft: 30,
    marginTop: 5,
  },
  imageContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  image: {
    width: 200,
    height: 200,
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
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});



