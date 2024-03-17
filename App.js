
import { StyleSheet, Text, View } from 'react-native';
import { DrawerPrincipal } from './components/Drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CVanalisis } from './screens/CVanalisis';
import { CAanalisis } from './screens/CAanalisis';
import { DatosCV } from './screens/DatosCV';
import { DatosCA } from './screens/DatosCA';



const Stack = createNativeStackNavigator()

export default function App() {
  return (
  <NavigationContainer style={estilo.container}>
    <Stack.Navigator>
      <Stack.Screen name="Drawer" options={{headerShown:false}} component={DrawerPrincipal}/>
      <Stack.Screen name= "Analisis Control Vectorial" component={CVanalisis}/>
      <Stack.Screen name= "Analisis Calidad del Agua" component={CAanalisis}/>
      <Stack.Screen name="DatosCV" component={DatosCV} />
      <Stack.Screen name="DatosCA" component={DatosCA} />
    </Stack.Navigator>
    
    
  </NavigationContainer>
  );
}

const estilo = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#070708',
    marginTop: 100,
    marginLeft: 12,
    marginRight: 12,
  }
})

