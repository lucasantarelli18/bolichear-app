import * as React from 'react';
import { Text, View, Button, ScrollView, StyleSheet, Alert, ImageBackground, Pressable } from 'react-native';
import * as Backend from '../backlog';
import 'react-native-url-polyfill/auto';
//import MapView, { Marker, Polyline } from 'react-native-maps';
//import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
//import { SafeAreaInsetsContext } from 'react-native-safe-area-context';

export function HomeScreen({ route, navigation }) {

  const [locales, setLocales] = React.useState([]);
  const { calle, numero, localidad, latitud, longitud, rango } = route.params;

  const [idLocalidad, setIdLocalidad] = React.useState([]);

  React.useEffect(() => {
    Backend.getLocalxDomicilio()
      .then((items) => {
//        console.log(items)

        const arr = []
        for (const i in items) {
          const latMts = ((parseFloat(items[i].latitud) * 111120) - (latitud * 111120))
          const lonMts = ((parseFloat(items[i].longitud) * 111100) - (longitud * 111100))
          const val = (Math.pow(latMts, 2) + Math.pow(lonMts, 2))
          const dist = Math.sqrt(val)
          const distkm = (dist / 1000).toFixed(2)

          if (dist < rango) {
            //console.log("dentro del rango")
           console.log(items[i].dist = distkm)
            arr.push(items[i])
          } else {
            //console.log("fuera del rango")
          }
        }
        setLocales(arr)
      })
      Backend.getLocalidadXNombre(localidad).then((items)=>{
        setIdLocalidad(items[0].id);
      })

  }, [])

  const filtradoLocales = (query) => {
    const arr = [[]]
    return query.map((i) => {
    });
  };
  const list = () => {
    return locales.map((element) => {
//      console.log(element)
//      console.log(element.id)
        console.log(element.dist)

      return (
        <ImageBackground source={require('../assets/fondoBoliches3.jpg')} blurRadius={3} style={styles.boliches}>

          <View style={styles.boliches2}>
            <Text style={styles.titulos} key="{element.id}">{element.nombre}</Text>
            <Text style={styles.km} > {element.dist} km</Text>
          </View>

          <View style={styles.boliches3}>
            <View>
              <Text style={styles.info}> Direccion: {element.Domicilio.calle} {element.Domicilio.numero}</Text>
              <Text style={styles.info}> Asistiran 300 personas </Text>
            </View>
            <View>

              <Pressable style={styles.button2} onPress={() => Alert.alert('Proximamente')}>
                <Text style={styles.text}>VER INFO</Text>
              </Pressable>
            </View>
          </View>
        </ImageBackground>
      );
    });
  };

  return (
    <ImageBackground source={require('../assets/fondoLogIn3.jpg')} blurRadius={3} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View style={styles.container}>{list()}</View>
      <Pressable style={styles.button} onPress={() => {
        navigation.navigate('Locales', {
          latitud: latitud,
          longitud: longitud,
          idLocalidad: idLocalidad,
          calle: calle,
          numero: numero,
        });

      }}>
        <Text style={styles.text}>IR A MI LOCAL</Text>
      </Pressable>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 1,
    width: '100%',
  },
  boliches: {
    flex: 0.2,
    backgroundColor: "lightgrey",
    marginBottom: .5,
    padding: 0,
    paddingRight: 12,
    paddingLeft: 12,
    fontFamily: 'Roboto-Medium',
  },
  boliches2: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontFamily: 'Roboto-Medium',
  },
  boliches3: {
    flex: 1.4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontFamily: 'Roboto-Medium',
  },
  titulos: {
    fontSize: 25,
    textTransform: 'uppercase',
    fontWeight: "bold",
    fontFamily: 'Roboto-Medium',
  },
  km: {
    fontSize: 15,
    fontWeight: "bold",
    fontFamily: 'Roboto-Medium',
  },
  info: {
    fontSize: 15,
    fontWeight: "bold",
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
  },
  button2: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 4,
    backgroundColor: 'black',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});