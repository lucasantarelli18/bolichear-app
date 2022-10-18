import * as React from 'react';
import { Text, View, Button, ScrollView, StyleSheet, Alert, ImageBackground, Pressable, Image } from 'react-native';
import * as Backend from '../backlog';
import { StatusBar } from 'expo-status-bar';
import 'react-native-url-polyfill/auto';
import { LinearGradient } from 'expo-linear-gradient';
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
        arr.sort(function (a, b) {
          return a.dist - b.dist
        })
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
  const list = () => {
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
  };

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
          idLocalidad: idLocalidad,
          calle: calle,
          numero: numero,
        });
      }}>
        <Text style={styles.text}>IR A MI LOCAL</Text>
      </Pressable>
      <StatusBar style="dark" />
    </View>
  );
}

const styles = StyleSheet.create({
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
