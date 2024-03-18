import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute, useNavigation } from '@react-navigation/native';

export const DatosCV = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const {
    id,
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

  const handleDeleteRegistro = async () => {
    try {
      // Obtener los registros actuales de AsyncStorage
      const jsonValue = await AsyncStorage.getItem('datosCV');
      let registros = jsonValue != null ? JSON.parse(jsonValue) : [];
      
      // Filtrar los registros para eliminar el registro con el ID específico
      registros = registros.filter(registro => registro.id !== id);

      // Guardar los registros actualizados en AsyncStorage
      await AsyncStorage.setItem('datosCV', JSON.stringify(registros));

      // Regresar a la pantalla anterior después de borrar los datos
      navigation.goBack();
    } catch (error) {
      console.error('Error al borrar los datos del registro:', error);
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

        <Text style={styles.titleInput}>Número de Casas Programadas: </Text>
        <View style={styles.inputContainer2}>
          <TextInput style={styles.input} value={numeroCasasProgramadas} editable={false}></TextInput>
        </View>

        <Text style={styles.titleInput}>Número de Casas Tratadas: </Text>
        <View style={styles.inputContainer2}>
          <TextInput style={styles.input} value={numeroCasasTratadas} editable={false}></TextInput>
        </View>

        <Text style={styles.titleInput}>Número de Casas Positivas: </Text>
        <View style={styles.inputContainer2}>
          <TextInput style={styles.input} value={numeroCasasPositivas} editable={false}></TextInput>
        </View>

        <Text style={styles.titleInput}>Número de Casas Negativas: </Text>
        <View style={styles.inputContainer2}>
          <TextInput style={styles.input} value={numeroCasasNegativas} editable={false}></TextInput>
        </View>

        <Text style={styles.titleInput}>Número de Recipientes Positivos: </Text>
        <View style={styles.inputContainer2}>
          <TextInput style={styles.input} value={numeroRecipientesPositivos} editable={false}></TextInput>
        </View>

        <Text style={styles.titleInput}>Número de Recipientes Negativos:</Text>
        <View style={styles.inputContainer2}>
          <TextInput style={styles.input} value={numeroRecipientesNegativos} editable={false}></TextInput>
        </View>

        <Text style={styles.titleInput}>Índice de Bretau:</Text>
        <View style={[styles.inputContainer, { backgroundColor: colorIndice(indiceBretau) }]}>
          <TextInput style={[styles.input, { color: 'black' }]} value={indiceBretau} editable={false}></TextInput>
        </View>
        <Text style={{ textDecorationLine: 'underline', color: '#F8B195', marginLeft: 30, marginTop: 5 }} onPress={infoBretau}>Más información sobre Indice Bretau...</Text>

        <Text style={styles.titleInput}>Índice de Positividad por Casa:</Text>
        <View style={[styles.inputContainer, { backgroundColor: colorIndice(indicePosCasas) }]}>
          <TextInput style={[styles.input, { color: 'black' }]} value={indicePosCasas} editable={false}></TextInput>
        </View>
        <Text style={{ textDecorationLine: 'underline', color: '#F8B195', marginLeft: 30, marginTop: 5 }} onPress={infoPositividadCasas}>Más información sobre Indice de Positividad por Casas...</Text>

        <Text style={styles.titleInput}>Índice de Positividad por Recipientes Agua:</Text>
        <View style={[styles.inputContainer, { backgroundColor: colorIndice(indicePosRecipientes) }]}>
          <TextInput style={[styles.input, { color: 'black' }]} value={indicePosRecipientes} editable={false}></TextInput>
        </View>
        <Text style={{ textDecorationLine: 'underline', color: '#F8B195', marginLeft: 30, marginTop: 5 }} onPress={infoPositividadRecipientes}>Más información sobre Indice de Positividad por Recipientes...</Text>

        <TouchableOpacity style={[styles.buttonPrimary, { backgroundColor: '#F67280' }]} onPress={handleDeleteRegistro}>
          <Text style={styles.deleteButtonText}>Borrar Datos</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

function infoBretau() {
  Alert.alert('Índice Bretau:', 'Numero de Recipientes Positivos / Numero de Casas Tratadas (inspeccionadas) x 100');
};
function infoPositividadCasas() {
  Alert.alert('Índice de Positividad por Casas:', 'Numero Casas Positivas / Numero Casas Tratadas (inspeccionadas) x 100');
};
function infoPositividadRecipientes() {
  Alert.alert('Índice Positividad de Recipientes de Agua:', 'Numero Recipientes Positivos / Recipientes Inspeccionados x 100');
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
