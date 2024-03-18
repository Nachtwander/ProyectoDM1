# ProyectoDM1

## Como empezar:

Le debe ejecutar el comando en consola:

> npm install

este instalar todos los paquetes utilizados para para la elaboración y el correcto funcionamiento de este proyecto.


Luego se debe ejecutar el siguiente comando:

> npm start

esto iniciara a instalar los requerimientos de EXPO para funcionar y ejecutar el proyecto a través de EXPO GO en la red local.

## Dependencias instaladas:

>"@expo/vector-icons": "^14.0.0"

Utilizada para agregar iconografia a la funcion del componente Clima.jsx, segun la condicion climatica cambiara la iconografia.

>"@react-native-async-storage/async-storage": "^1.22.3"

Utilizada para el almacenamiento interno en el dispositivo movil de los registros creados con la aplicación.

>"@react-navigation/drawer": "^6.6.11"

Utilizado para la creacion del Drawer Navigator en el componente Drawer.jsx.

>"@react-navigation/native": "^6.1.14"

Utilizado para la navegación entre pantallas en la aplicacion.

>"@react-navigation/native-stack": "^6.9.22"

Utilizado para la creacion del Stack Navigator implementado en App.js.
        
>"axios": "^1.6.8"
Utilizado para consumir los servicios de la API de clima en el componente Clima.jsx.
        
>"expo-image-picker": "~14.7.1"

Utilizado para Implementar el uso de hardware del dispositivo, especificamente la camara al utilizar los botones de tomar fotografía en el formulario de CAanalisis.jsx.

>"expo-location": "^16.5.5"

Utilizado para implementar el uso del posicionamiento geografico a través del uso del GPS del dispositivo movil y asi obtener el clima con el componente Clima.jsx.


## Pantallas Principales:

### Menu:

En esta pantalla se mostraran los botones principales para las secciones disponibles en la aplicación, los cuales son "Control Vectorial", "Calidad del Agua", "Registro Control Vectorial" y "Registro Calidad del Agua".

## Control Vectorial:

Consta de un formulario que solicita los datos necesarios a los cuales se les realizara su analisis en la pantalla de CVanalisis.jsx, luego en esta ultima el usuario podra decidir si regresar a la pantalla de ControlVetorial.jsx o guardar los datos y ser llevado a la pantalla de RegistroCV.jsx.

## Calidad del Agua:

Consta de un formulario que solicita los datos necesarios a los cuales se les realizara su analisis en la pantalla de CAanalisis.jsx en donde podra utilizar los botones de tomar fotografia para guardar la evidencia de las pruebas realizadas en campo, luego en esta ultima el usuario podra decidir si regresar a la pantalla de CalidadAgua.jsx o guardar los datos y ser llevado a la pantalla de RegistroCA.jsx.

## Registro Control Vectorial:

Esta pantalla despliega un flatlist con todos los datos registrados de Control Vectorial, cada registro cuenta con su funcinamiento touchableopacity en donde al presionarlos llevara al usuario a la pantalla de visualizacion de los datos seleccionados en DatosCV.jsx donde se contara con un boton de borrar datos en caso de necesitar eliminar estos.

## Registro Calidad del Agua:

Esta pantalla despliega un flatlist con todos los datos registrados de Calidad del Agua, cada registro cuenta con su funcinamiento touchableopacity en donde al presionarlos llevara al usuario a la pantalla de visualizacion de los datos seleccionados en DatosCA.jsx incluyendo las fotografias que fueron tomadas en el formulario de CAanalisis.jsx, donde se contara con un boton de borrar datos en caso de necesitar eliminar estos.

## Mejoras
Se aplicaron los cambios mencionados en la clase durante la presentación del proyecto.

### Comentarios Finales:

React Native ofrece muchas herramientas para la creacion de aplicaciones sencillas, pero las limitaciones de los S.O. como ser IOS o ANDROID de verdad representan un obstaculo para la realización de proyectos ambiciosos o con funciones detalladas especificas, por esta razón fue realmente tedioso el realizar este proyecto ya que se necesitan muchas dependencias para el uso de herramientas de hardware asi como de almacenamiento y consumo de APIs.

Se que pude ser mas ambicioso en cuanto a los datos a utilizar en mi proyecto, por ejemplo, pude almacenar la condición climatica en el formulario de Control Vectorial y asi hacer un analisis de la proliferacion del zancudo y su reproducción según la temporada, pero debido a la falta de tiempo y desconocer muchas de estas herramientas para implementar esto en EXPO me fue imposible.

Realmente soy conciente que necesite de la ayuda de la IA como ser ChatGPT para realizar ciertas cosas las cuales desconocia como hacerlas ya sea en JS o React Native, pero gracias a ella, investigar por mi cuenta e ir practicando como implementar la logica y componentes fue que pude terminar este proyecto, se que hay cosas por mejorar y que podria hacerla mucho mejor, pero por el momento me siento satisfecho por los realizado y los conocimientos que adquiri a lo largo de este proceso, espero ser mejor en Desarrollo Movil 2.