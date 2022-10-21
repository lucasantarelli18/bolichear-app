import * as React from "react";
import {
  Text,
  View,
  Button,
  ScrollView,
  StyleSheet,
  Alert,
  ImageBackground,
  Pressable,
} from "react-native";
import * as Backend from "../backlog";
//import DropDownPicker from 'react-native-dropdown-picker';
//import Constants from 'expo-constants';

export function LocalesScreen({ route, navigation }) {
  const { latitud, longitud, idLocalidad, calle, numero } = route.params;

  //traer del login
  const idDueno = 5;

  //traer del home
  //  const lat = -34.921296;
  //  const long = -57.954208;

  const [faltaIngresoNombre, setFaltaIngresoNombre] = React.useState(true);
  //  const [faltaIngresoLoc, setFaltaIngresoLoc] = React.useState(true);

  //  const [openLoc, setOpenLoc] = React.useState(false);
  //  const [valueLoc, setValueLoc] = React.useState(null); //para el picker
  //  const [localidadSeleccionada, setLocalidadSeleccionada] = React.useState([]);
  const [locales, setLocales] = React.useState([]);
  const [idDomicilio, setIdDomicilio] = React.useState([]);
  const [nombreLocal, setNombreLocal] = React.useState([]);
  const [cant, setCant] = React.useState([]);

  React.useEffect(() => {
    //Tomo los locales del user
    Backend.getLocalesXUser(idDueno).then((items) => {
      setLocales(items);
      if (items.length > 0) {
        setCant(true);
      } else {
        setCant(false);
      }
      //console.log(locales);
      //Backend.insertDomicilioSinPiso(calle, numero, idLocalidad).then(
      //  (items) => {}
      //);

      Backend.getUltimoDomicilio().then((items) => {
        setIdDomicilio(items[0].id);
      });
    });
  }, []);

  // const itemsLoc = [
  //  {label:"La Plata", value:1},
  //  {label:"Quilmes", value:2},
  //  {label:"Bernal", value:3}
  //  ]

  const list = () => {
    return locales.map((element) => {
      return (
        <ImageBackground
          source={require("../assets/fondoBoliches3.jpg")}
          blurRadius={3}
          style={styles.boliches}
        >
          <View style={styles.boliches2}>
            <Text style={styles.titulos} key="{element.id}">
              {element.nombre}
            </Text>
          </View>

          <View style={styles.boliches3}>
            <View>
              <Text style={styles.info}>
                {" "}
                Direccion: {element.Domicilio.calle} {element.Domicilio.numero}
              </Text>
            </View>
            <View>
              <Pressable
                style={styles.button2}
                onPress={() =>
                  navigation.navigate("VerInfo", {
                    idLocal: element.id,
                    latitud: latitud,
                    longitud: longitud,
                  })
                }
              >
                <Text style={styles.text}>VER INFO</Text>
              </Pressable>
              <Pressable
                style={styles.button2}
                onPress={() => 
                  Backend.deleteLocal(element.id).then((items) => {
                    console.log("Borrando local: ", element.id);
                    setCant(false)
                  })
                }
              >
                <Text style={styles.text}>BORRAR</Text>
              </Pressable>
            </View>
          </View>
        </ImageBackground>
      );
    });
  };
if (cant) {
  return (
      //Tiene locales
    <>
        <ImageBackground
          source={require("../assets/fondoLogIn3.jpg")}
          blurRadius={3}
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <View style={styles.container}>{list()}</View>
        </ImageBackground>
    </>
  );  
} else {
  return (
        //No tiene locales
        <>
          <Text style={styles.titulos}>
            Todavía no tenes registrado un local
          </Text>
          <Pressable
            style={styles.button}
            onPress={() => {
              navigation.navigate("AltaLocal", {
                latitud: latitud,
                longitud: longitud,
                idDomicilio: idDomicilio,
                idDueno: idDueno,
              });
              setCant(true);
              Backend.getLocalesXUser(idDueno).then((items) => {
                setLocales(items);
              });
            }}
          >
            <Text style={styles.text}>DAR DE ALTA UN LOCAL</Text>
          </Pressable>
        </>
      )
}

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 1,
    width: "100%",
  },
  boliches: {
    flex: 0.2,
    backgroundColor: "lightgrey",
    marginBottom: 0.5,
    padding: 0,
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
  },
  boliches3: {
    flex: 1.4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    fontFamily: "Roboto-Medium",
  },
  titulos: {
    fontSize: 25,
    textTransform: "uppercase",
    fontWeight: "bold",
    fontFamily: "Roboto-Medium",
  },
  km: {
    fontSize: 15,
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
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "black",
  },
  button2: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 4,
    backgroundColor: "black",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});
