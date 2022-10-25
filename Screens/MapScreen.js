import * as React from 'react';
import * as Backend from '../backlog';
import { Text, View, Button, ScrollView, StyleSheet, Alert, Image, TextInput, Pressable, ImageBackground } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import MapView, { Callout, Marker, Polyline } from 'react-native-maps';
import { StatusBar } from 'expo-status-bar';
import 'react-native-url-polyfill/auto';
import TabScreen from './TabScreen';
import { LinearGradient } from 'expo-linear-gradient';

export function MapScreen({ route, navigation }) {
  const [locales, setLocales] = React.useState([]);

  const { calle, numero, localidad, latitud, longitud, rango } = route.params;

  console.log("Buenas, esta es la calle y el numero", calle, numero, localidad)

  const [origin, setOrigin] = React.useState({
    latitude: route.params.latitud,
    longitude: route.params.longitud,
  });

  const [destination, setdestination] = React.useState({
    latitude: -34.924941,
    longitude: -57.967533,
  });

  const [cambio, setCambio] = React.useState(true);

  const [idLocalidad, setIdLocalidad] = React.useState([]);

  React.useEffect(() => {
    Backend.getLocalxDomicilio()
      .then((items) => {
        //console.log(items)

        const arr = [];
        for (const i in items) {
          const latMts = parseFloat(items[i].latitud) * 111120 - latitud * 111120;
          const lonMts =
            parseFloat(items[i].longitud) * 111100 - longitud * 111100;
          const val = Math.pow(latMts, 2) + Math.pow(lonMts, 2);
          const dist = Math.sqrt(val);
          const distkm = (dist / 1000).toFixed(2);

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
    Backend.getLocalidadXNombre(localidad).then((items) => {
      setIdLocalidad(items[0].id);
    })

  }, [])


  const filtradoLocales = (query) => {
    const arr = [[]];
    return query.map((i) => { });
  };

  const changeCambio = (elem) => {
    setCambio(elem);
  };



  const list = () => {
    if (cambio) {
      return locales.map((element) => {
        return (
          <Marker tappable tooltip
            pinColor='gold'
            coordinate={{ latitude: element.latitud, longitude: element.longitud, }}>


            <Callout style={styles.cal} onPress={() => {
              navigation.navigate("VerEventos", {
                idLocal: element.id,
              });
            }}>
              <View style={styles.bubble}>
                <Text style={styles.name}>{element.nombre}</Text>
              </View>
            </Callout>


          </Marker>
        );
      });

    } else {
      return locales.map((element) => {
        console.log(element.dist)
        return (
          <Pressable
            onPress={() => {
              navigation.navigate("VerEventos", {
                idLocal: element.id,
              });
            }}>
            <ImageBackground
              imageStyle={{ borderRadius: 15 }}
              source={require("../assets/fondoLogIn.jpg")}
              blurRadius={25}
              style={styles.boliches}
            >
              <View style={styles.boliches2}>
                <Text style={styles.titulos} key="{element.id}">
                  {element.nombre}
                </Text>
              </View>

              <View style={styles.boliches3}>
                <Text style={styles.km}>Estás a {element.dist} km</Text>
              </View>

              <View style={styles.boliches4}>
                <View>
                  <Text style={styles.info}>
                    {" "}
                    Direccion: {element.Domicilio.calle} {element.Domicilio.numero}
                  </Text>
                  <Text style={styles.info}> Asistiran 300 personas </Text>
                </View>
              </View>
            </ImageBackground>
          </Pressable>
        );
      });
    }
  };
  if (cambio) {
    return (
      <View style={styles.viewCien}>
        <MapView style={styles.map}
          initialRegion={{
            latitude: origin.latitude,
            longitude: origin.longitude,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02
          }}
          showsUserLocation={true}
        >
          <Marker
            draggable={true}
            title='TU'
            coordinate={origin}
            onDragEnd={(direction) => setOrigin(direction.nativeEvent.coordinate)}
            pinColor={'pink'}
          />

          {list()}
        </MapView>
        <View style={styles.tabCambio}>
          <Pressable style={styles.tabPress} onPress={() => changeCambio(true)}>
            <Text>Mapa</Text>
          </Pressable>
          <Pressable style={styles.tabPress2} onPress={() => changeCambio(false)}>
            <Text>Lista</Text>
          </Pressable>
        </View>
      </View>
    );
  } else {
    return (
      <View
        blurRadius={3}
        style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#fff" }}
      >
        <View style={styles.skewed}>
          <Text style={styles.info}> Dirección actual: {calle} {numero} </Text>
        </View>
        <ScrollView style={styles.container}>{list()}</ScrollView>

        <Pressable style={styles.button} onPress={() => {
          navigation.navigate('Locales', {
            latitud: latitud,
            longitud: longitud,
            localidad: localidad,
            idLocalidad: idLocalidad,
            calle: calle,
            numero: numero,
          });
        }}>
          <Text style={styles.text}>IR A MI LOCAL</Text>
        </Pressable>
        <View style={styles.tabCambio}>
          <Pressable style={styles.tabPress} onPress={() => changeCambio(true)}>
            <Text>Mapa</Text>
          </Pressable>
          <Pressable style={styles.tabPress2} onPress={() => changeCambio(false)}>
            <Text>Lista</Text>
          </Pressable>
        </View>

        <StatusBar style="dark" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    //flex: 1,
    width: '100%',
    height: '92%'
  },
  tabCambio: {
    //flex: 1,
    //width: '100%',
    height: '8%',
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: "center",
    justifyContent: "center",
    borderColor: 'gray',
    borderTopWidth: 1,
  },
  tabPress: {
    //flex: 1,
    width: '50%',
    height: '100%',
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: 'white',
  },
  tabPress2: {
    //flex: 1,
    width: '50%',
    height: '100%',
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: 'white',
    borderColor: 'gray',
    borderLeftWidth: 1,
  },
  viewCien: {
    flex: 1,

  },
  cal: {
    //backgroundColor: '#111',
  },
  pin: {
    width: 30,
    height: 30
  },
  name: {
    fontSize: 16,
    //marginBottom: 5,
  },
  bubble: {
    flex: 1,
    flexDirection: 'column',
    //alignSelf: 'flex-start',
    backgroundColor: '#fff',
    //borderRadius: 6,
    //borderColor: '#ccc',
    //borderWidth: 0.5,
    //padding: 10,
    width: 200,
  },
  image: {
    width: 120,
    height: 80,
  },
  button2: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 4,
    backgroundColor: "black",
    marginVertical: 2,
  },
  container: {
    flex: 1,
    width: "95%",
  },
  boliches: {
    flex: 0.3,
    marginTop: 10,
    paddingRight: 12,
    paddingLeft: 12,
    fontFamily: "Roboto-Medium",
  },
  boliches2: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    fontFamily: "Roboto-Medium",
    paddingTop: 50,
    justifyContent: "center"

  },
  boliches3: {
    flex: 1.5,
    flexDirection: "row",
    position: "absolute",
    right: 0,
    justifyContent: "space-between",
    fontFamily: "Roboto-Medium",
    marginRight: 10,
    marginTop: 5
  },
  boliches4: {
    flex: 1.5,
    flexDirection: "row",
    justifyContent: "space-between",
    fontFamily: "Roboto-Medium",
    marginRight: 10,
    paddingTop: 25,
    paddingBottom: 15,
  },
  titulos: {
    fontSize: 30,
    textTransform: "uppercase",
    fontWeight: "bold",
    fontFamily: "Roboto-Medium",
  },
  km: {
    fontSize: 10,
    fontWeight: "bold",
    fontFamily: "Roboto-Medium",
  },
  info: {
    fontSize: 15,
    fontWeight: "bold",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 30,
    elevation: 3,
    backgroundColor: "black",
    marginVertical: 10
  },
  button2: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 30,
    backgroundColor: "black",
    marginVertical: 5,
    width: "90%"
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  container3: {
    flex: 1,
    alignItems: "flex-end",
    marginVertical: 10
  },
  skewed: {
    width: "99%",
    alignItems: "center",
    backgroundColor: "#e8ded3",
    borderBottomEndRadius: 500,
    borderBottomStartRadius: 500,

  }
});