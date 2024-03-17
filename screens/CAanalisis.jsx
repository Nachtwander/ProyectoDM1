// CAanalisis.jsx

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const CAanalisis = () => {
  const navigation = useNavigation();

  const route = useRoute();
  const {
    nombreComunidad,
    numeroCasa,
    cloroResidual,
    phResidual,
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

  const [image, setImage] = useState(null);
  const [image2, setImage2] = useState(null);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      alert('Se necesitan permisos de cámara para tomar fotos.');
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.assets[0].uri);
    }
  };

  const pickImage2 = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      alert('Se necesitan permisos de cámara para tomar fotos.');
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage2(result.assets[0].uri);
    }
  };

  const guardarDatosLocalmente = async () => {
    try {
      const idUnico = Date.now().toString();
      const fechaActual = new Date().toLocaleDateString();
      const datos = {
        id: idUnico,
        fecha: fechaActual,
        nombreComunidad,
        numeroCasa,
        cloroResidual,
        phResidual,
        image,
        image2,
      };

      const datosGuardados = await AsyncStorage.getItem('datosCA') || '[]';
      const datosPrevios = JSON.parse(datosGuardados);
      const nuevosDatos = [...datosPrevios, datos];
      await AsyncStorage.setItem('datosCA', JSON.stringify(nuevosDatos));

      alert('Los datos se han guardado exitosamente.');
      navigation.navigate('Registro');
    } catch (error) {
      console.error('Error al guardar los datos:', error);
      alert('Hubo un problema al guardar los datos. Por favor, intenta de nuevo.');
    }
  };

  const goToCalidadAgua = () => {
    navigation.navigate('Calidad del Agua');
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Analisis de Calidad del Agua</Text>

        <Text style={styles.titleInput}>Nombre de la Comunidad: </Text>
        <View style={styles.inputContainer2}>
          <TextInput style={styles.input} value={nombreComunidad} editable={false}></TextInput>
        </View>

        <Text style={styles.titleInput}>Numero de Casa: </Text>
        <View style={styles.inputContainer2}>
          <TextInput style={styles.input} value={numeroCasa} editable={false}></TextInput>
        </View>

        <Text style={styles.titleInput}>Cantidad Cloro Residual en mg/lts: </Text>
        <View style={[styles.inputContainer2, { backgroundColor: cloroBackgroundColor }]}>
          <TextInput style={styles.input} value={cloroResidual} editable={false}></TextInput>
        </View>
        <Text style={{ textDecorationLine: 'underline', color: '#F8B195', marginLeft: 30, marginTop: 5}} onPress={infoCloro}>Más información sobre Cloro Residual...</Text>

        <View style={styles.imageContainer}>
          {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
        </View>
        <TouchableOpacity
          style={[styles.buttonsecondary, { backgroundColor: '#F8B195' }]}
          onPress={pickImage}
        >
          <Text style={styles.buttonText}>Tomar Fotografia Prueba Cloro</Text>
        </TouchableOpacity>

        <Text style={styles.titleInput}>Cantidad PH en Agua: </Text>
        <View style={[styles.inputContainer2, { backgroundColor: phBackgroundColor }]}>
          <TextInput style={styles.input} value={phResidual} editable={false}></TextInput>
        </View>
        <Text style={{ textDecorationLine: 'underline', color: '#F8B195', marginLeft: 30, marginTop: 5}} onPress={InfoPH}>Más información sobre el PH...</Text>

        <View style={styles.imageContainer}>
          {image2 && <Image source={{ uri: image2 }} style={{ width: 200, height: 200 }} />}
        </View>
        <TouchableOpacity
          style={[styles.buttonsecondary, { backgroundColor: '#F8B195' }]}
          onPress={pickImage2}
        >
          <Text style={styles.buttonText}>Tomar Fotografia Prueba PH</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.buttonPrimary, { backgroundColor: '#F67280' }]}
          onPress={guardarDatosLocalmente}
        >
          <Text style={styles.buttonText}>Guardar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.buttonPrimary, { backgroundColor: '#F67280' }]}
          onPress={goToCalidadAgua}
        >
          <Text style={styles.buttonText}>Regresar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

function InfoPH() {
  Alert.alert('PH Residual','Los niveles OPTIMOS de PH en agua son entre los rangos de 6.5 y 7.5, los niveles de ADVERTENCIA estan entre 6.0-6.4 y 7.6-8.0, los niveles de PELIGRO estan entre 5.9 o menos y 8.1 o mas.')
}

function infoCloro() {
  Alert.alert('Cloro Residual','Los niveles OPTIMOS en cloro residual en mg/lts son: de 1.0 a 1.5, los niveles de ADVERTENCIA estan entre 0.9-0.5 y 1.6-1.9, los niveles de PELIGRO estan entre 0.4 o menos y 2.0 o mas.')
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
  buttonPrimary: {
    width: '80%',
    height: 70,
    marginTop: 30,
    alignItems: 'center',
    marginLeft: '10.6%',
    justifyContent: 'center',
    borderRadius: 8,
  },
  buttonsecondary: {
    width: '80%',
    height: 40,
    marginTop: 20,
    alignItems: 'center',
    marginLeft: '10.6%',
    justifyContent: 'center',
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  imageContainer: {
    alignItems: 'center',
    marginTop: 30,
  },
});