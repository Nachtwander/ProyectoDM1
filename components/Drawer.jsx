import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { CalidadAgua } from '../screens/CalidadAgua';
import { ControlVectorial } from '../screens/ControlVectorial';
import { RegistroCV } from '../screens/RegistroCV';
import { Menu } from '../screens/Menu';
import { RegistroCA } from '../screens/RegistroCA';

const Drawer = createDrawerNavigator();

export function DrawerPrincipal() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#4476A1',
        },
        headerTintColor: '#fff',
        headerTitleAlign: 'center', // Centra el texto en el encabezado
        drawerStyle: {
          backgroundColor: '#4476A1', // Cambia el color de fondo del drawer
        },
        drawerActiveTintColor: '#fff', // Cambia el color del texto de la opción seleccionada
        drawerInactiveTintColor: '#CFCFD0', // Cambia el color del texto de las opciones no seleccionadas
      }}
    >
      <Drawer.Screen
        name="Menu"
        component={Menu}
        options={{
          drawerLabel: 'Menú',
        }}
      />
      <Drawer.Screen
        name="Control Vectorial"
        component={ControlVectorial}
        options={{
          drawerLabel: 'Control Vectorial',
        }}
      />
      <Drawer.Screen
        name="Calidad del Agua"
        component={CalidadAgua}
        options={{
          drawerLabel: 'Calidad del Agua',
        }}
      />
      <Drawer.Screen
        name="RegistroCV"
        component={RegistroCV}
        options={{
          drawerLabel: 'Registro Control Vectorial',
        }}
      />
      <Drawer.Screen
        name="RegistroCA"
        component={RegistroCA}
        options={{
          drawerLabel: 'Registro Calidad del Agua',
        }}
      />
    </Drawer.Navigator>
  );
}
