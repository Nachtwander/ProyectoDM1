import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export const RegistroCA = () => {
  const [registrosCA, setRegistrosCA] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    obtenerRegistrosCA();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      obtenerRegistrosCA();
    });

    return unsubscribe;
  }, [navigation]);

  const obtenerRegistrosCA = async () => {
    try {
      const datosCA = await AsyncStorage.getItem('datosCA');
      if (datosCA !== null) {
        setRegistrosCA(JSON.parse(datosCA));
      }
    } catch (error) {
      console.error('Error al obtener los registros de calidad del agua:', error);
    }
  };

  const renderItemCA = ({ item }) => (
    <TouchableOpacity onPress={() => goToDatosCA(item)}>
      <View style={styles.registroContainer}>
        <Text style={styles.label}>ID: {item.id}</Text>
        <Text style={styles.label}>Fecha: {item.fecha}</Text>
        <Text style={styles.label}>Nombre Comunidad: {item.nombreComunidad}</Text>
        <Text style={styles.label}>Número de Casa: {item.numeroCasa}</Text>
        <Text style={styles.label}>Cantidad Cloro Residual en mg/lts: {item.cloroResidual}</Text>
        <Text style={styles.label}>Cantidad PH en Agua: {item.phResidual}</Text>
      </View>
    </TouchableOpacity>
  );

  const goToDatosCA = (item) => {
    navigation.navigate('DatosCA', item);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro Calidad del Agua</Text>
      <View style={styles.flatlistContainer}>
        <FlatList
          data={registrosCA}
          renderItem={renderItemCA}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
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
    marginBottom: 5,
    marginTop: 10,
    textAlign: 'center',
  },
  flatlistContainer: {
    flex: 1,
  },
  registroContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    margin: 10,
    padding: 10,
  },
  label: {
    fontSize: 16,
    color: 'black',
    marginBottom: 5,
  },
});
