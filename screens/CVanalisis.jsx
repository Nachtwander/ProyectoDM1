// CVanalisis.jsx
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute, useNavigation } from '@react-navigation/native';

export const CVanalisis = () => {
  const navigation = useNavigation();

  const goToControlVectorial = () => {
    navigation.navigate('Control Vectorial');
  };

  const goToRegistro = async () => {
    await guardarDatosLocalmente({
      nombreComunidad,
      numeroCasasProgramadas,
      numeroCasasTratadas,
      numeroCasasPositivas,
      numeroCasasNegativas,
      numeroRecipientesPositivos,
      numeroRecipientesNegativos,
      indiceBretau,
      indicePosCasas,
      indicePosRecipientes,
    });
    navigation.navigate('RegistroCV');
  };

  const route = useRoute();
  const {
    nombreComunidad,
    numeroCasasProgramadas,
    numeroCasasTratadas,
    numeroCasasPositivas,
    numeroCasasNegativas,
    numeroRecipientesPositivos,
    numeroRecipientesNegativos,
  } = route.params;

  const calcularIndiceBretau = (numeroRecipientesPositivos, numeroCasasTratadas) => {
    const valorBretau = (parseFloat(numeroRecipientesPositivos) / parseFloat(numeroCasasTratadas)) * 100;
    return isNaN(valorBretau) ? '' : valorBretau.toString();
  };

  const calcularIndicePositividadCasas = (numeroCasasPositivas, numeroCasasTratadas) => {
    const valorPositividadCadas = (parseFloat(numeroCasasPositivas) / parseFloat(numeroCasasTratadas)) * 100;
    return isNaN(valorPositividadCadas) ? '' : valorPositividadCadas.toString();
  };

  const calcularIndicePositividadRecipientes = (numeroRecipientesPositivos, numeroRecipientesNegativos) => {
    const sumaRecipientes = parseFloat(numeroRecipientesPositivos) + parseFloat(numeroRecipientesNegativos);
    const positividaRecipientes = ((parseFloat(numeroRecipientesPositivos) / parseFloat(sumaRecipientes)) * 100);
    return isNaN(positividaRecipientes) ? '' : positividaRecipientes.toString();
  };

  const colorIndice = (indice) => {
    const valor = parseFloat(indice);
    if (!isNaN(valor)) {
      if (valor >= 5) {
        return 'red';
      } else if (valor >= 3) {
        return 'yellow';
      } else {
        return 'green';
      }
    }
    return 'white';
  };

  const [indiceBretau, setIndiceBretau] = useState('');
  const [indicePosCasas, setIndicePosCasas] = useState('');
  const [indicePosRecipientes, setIndicePosRecipientes] = useState('');

  useEffect(() => {
    const valorBretau = calcularIndiceBretau(numeroRecipientesPositivos, numeroCasasTratadas);
    setIndiceBretau(valorBretau);

    const valorPC = calcularIndicePositividadCasas(numeroCasasPositivas, numeroCasasTratadas);
    setIndicePosCasas(valorPC);

    const valorPR = calcularIndicePositividadRecipientes(numeroRecipientesPositivos, numeroRecipientesNegativos);
    setIndicePosRecipientes(valorPR);
  }, [numeroRecipientesPositivos, numeroRecipientesNegativos]);

  const guardarDatosLocalmente = async (datos) => {
    try {
      // Generar un ID único para cada conjunto de datos
      const idUnico = Date.now().toString();

      // Obtener la fecha actual
      const fechaActual = new Date().toLocaleDateString();

      // Agregar el ID único y la fecha actual a los datos
      const datosConID = { id: idUnico, fecha: fechaActual, ...datos };

      // Obtener los datos existentes almacenados localmente
      const datosGuardados = await AsyncStorage.getItem('datosCV') || '[]';
      const datosPrevios = JSON.parse(datosGuardados);

      // Agregar los nuevos datos al arreglo existente
      const nuevosDatos = [...datosPrevios, datosConID];

      // Guardar los datos actualizados en AsyncStorage
      await AsyncStorage.setItem('datosCV', JSON.stringify(nuevosDatos));

      // Mostrar un mensaje de éxito
      Alert.alert('Guardado', 'Los datos se han guardado exitosamente.');
    } catch (error) {
      console.error('Error al guardar los datos:', error);
      // Mostrar un mensaje de error si ocurre algún problema
      Alert.alert('Error', 'Hubo un problema al guardar los datos. Por favor, intenta de nuevo.');
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Analisis Control Vectorial</Text>

        <Text style={styles.titleInput}>Nombre de la Comunidad: </Text>
        <View style={styles.inputContainer2}>
          <TextInput style={styles.input} value={nombreComunidad} editable={false}></TextInput>
        </View>

        <Text style={styles.titleInput}>Numero de Casas Programadas: </Text>
        <View style={styles.inputContainer2}>
          <TextInput style={styles.input} value={numeroCasasProgramadas} editable={false}></TextInput>
        </View>

        <Text style={styles.titleInput}>Numero de Casas Tratadas: </Text>
        <View style={styles.inputContainer2}>
          <TextInput style={styles.input} value={numeroCasasTratadas} editable={false}></TextInput>
        </View>

        <Text style={styles.titleInput}>Numero de Casas Positivas: </Text>
        <View style={styles.inputContainer2}>
          <TextInput style={styles.input} value={numeroCasasPositivas} editable={false}></TextInput>
        </View>

        <Text style={styles.titleInput}>Numero de Casas Negativas: </Text>
        <View style={styles.inputContainer2}>
          <TextInput style={styles.input} value={numeroCasasNegativas} editable={false}></TextInput>
        </View>

        <Text style={styles.titleInput}>Numero de Recipientes Positivos: </Text>
        <View style={styles.inputContainer2}>
          <TextInput style={styles.input} value={numeroRecipientesPositivos} editable={false}></TextInput>
        </View>

        <Text style={styles.titleInput}>Numero de Recipientes Negativos:</Text>
        <View style={styles.inputContainer2}>
          <TextInput style={styles.input} value={numeroRecipientesNegativos} editable={false}></TextInput>
        </View>

        <Text style={styles.titleInput}>Indice de Bretau:</Text>
        <View style={[styles.inputContainer, { backgroundColor: colorIndice(indiceBretau) }]}>
          <TextInput style={[styles.input, { color: 'black' }]} value={indiceBretau} editable={false}></TextInput>
        </View>
        <Text style={{ textDecorationLine: 'underline', color: '#F8B195', marginLeft: 30, marginTop: 5 }} onPress={infoBretau}>Más información sobre Indice Bretau...</Text>

        <Text style={styles.titleInput}>Indice de Positividad por Casa:</Text>
        <View style={[styles.inputContainer, { backgroundColor: colorIndice(indicePosCasas) }]}>
          <TextInput style={[styles.input, { color: 'black' }]} value={indicePosCasas} editable={false}></TextInput>
        </View>
        <Text style={{ textDecorationLine: 'underline', color: '#F8B195', marginLeft: 30, marginTop: 5 }} onPress={infoPositividadCasas}>Más información sobre Indice de Positividad por Casas...</Text>

        <Text style={styles.titleInput}>Indice de Positividad por Recipientes Agua:</Text>
        <View style={[styles.inputContainer, { backgroundColor: colorIndice(indicePosRecipientes) }]}>
          <TextInput style={[styles.input, { color: 'black' }]} value={indicePosRecipientes} editable={false}></TextInput>
        </View>
        <Text style={{ textDecorationLine: 'underline', color: '#F8B195', marginLeft: 30, marginTop: 5 }} onPress={infoPositividadRecipientes}>Más información sobre Indice de Positividad por Recipientes...</Text>


        <TouchableOpacity
          style={[styles.buttonPrimary, { backgroundColor: '#F67280' }]}
          onPress={goToRegistro}
        >
          <Text style={styles.buttonText}>Guardar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.buttonPrimary, { backgroundColor: '#F67280' }]}
          onPress={goToControlVectorial}
        >
          <Text style={styles.buttonText}>Regresar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

function infoBretau() {
  Alert.alert('Indice Bretau:', 'Numero de Recipientes Positivos / Numero de Casas Tratadas (inspeccionadas) x 100');
};
function infoPositividadCasas() {
  Alert.alert('Indice de Positividad por Casas:', 'Numero Casas Positivas / Numero Casas Tratadas (inspeccionadas) x 100');
};
function infoPositividadRecipientes() {
  Alert.alert('Indice Positividad de Recipientes de Agua:', 'Numero Recipientes Positivos / Recipientes Inspeccionados x 100');
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
  buttonPrimary: {
    width: '80%',
    height: 70,
    marginTop: 40,
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
});


