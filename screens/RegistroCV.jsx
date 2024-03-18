

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export const RegistroCV = () => {
  const [registrosCV, setRegistrosCV] = useState([]);
  
  const navigation = useNavigation();

  useEffect(() => {
    obtenerRegistrosCV();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      obtenerRegistrosCV();
    });

    return unsubscribe;
  }, [navigation]);

  const obtenerRegistrosCV = async () => {
    try {
      const datosCV = await AsyncStorage.getItem('datosCV');
      if (datosCV !== null) {
        setRegistrosCV(JSON.parse(datosCV));
      }
    } catch (error) {
      console.error('Error al obtener los registros de control vectorial:', error);
    }
  };

  const renderItemCV = ({ item }) => (
    <TouchableOpacity onPress={() => goToDatosCV(item)}>
      <View style={styles.registroContainer}>
        <Text style={styles.label}>ID: {item.id}</Text>
        <Text style={styles.label}>Fecha: {item.fecha}</Text>
        <Text style={styles.label}>Nombre Comunidad: {item.nombreComunidad}</Text>
        <Text style={styles.label}>Índice de Bretau: {item.indiceBretau}</Text>
        <Text style={styles.label}>Índice de Positividad por Casa: {item.indicePosCasas}</Text>
        <Text style={styles.label}>Índice de Positividad por Recipientes Agua: {item.indicePosRecipientes}</Text>
      </View>
    </TouchableOpacity>
  );

  const goToDatosCV = (item) => {
    navigation.navigate('DatosCV', item);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro Control Vectorial</Text>
      <View style={styles.flatlistContainer}>
        <FlatList
          data={registrosCV}
          renderItem={renderItemCV}
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
