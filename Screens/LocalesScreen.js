import * as React from "react";
import {
  Image,
  Text,
  View,
  Button,
  ScrollView,
  StyleSheet,
  Alert,
  ImageBackground,
  Pressable,
} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';
import * as Backend from "../backlog";
//import DropDownPicker from 'react-native-dropdown-picker';
//import Constants from 'expo-constants';

export function LocalesScreen({ route, navigation }) {
  const { latitud, longitud, localidad, idLocalidad, calle, numero } = route.params;

  //traer del login
  const idDueno = 5;

  //console.log("Buenas, esta es la calle y el numero", calle, numero, idLocalidad, localidad)
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
  const [visible, setVisible] = React.useState(false);
  const [idLocal, setIdLocal] = React.useState([]);
  const [image, setImage] = React.useState(null);

  const [cambio, setCambio] = React.useState(false);

  React.useEffect(() => {
    //Tomo los locales del user
    Backend.getLocalesXUser(idDueno).then((items) => {
      setLocales(items);
      if (items.length > 0) {
        setIdLocal(items[0].id);
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
  const hideMenu = () => setVisible(false);

  const showMenu = () => setVisible(true);
  const evento = () => {
    navigation.navigate("Eventos", {
      idLocal: idLocal,
      latitud: latitud,
      longitud: longitud,
    });

  }

  const promo = () => {
    navigation.navigate("Promociones", {
      idLocal: idLocal,
      latitud: latitud,
      longitud: longitud,
    });
  }

  const changeCambio = (estado) => {
    setCambio(estado)
  } 

  const list = () => {
    return locales.map((element) => {
      //console.log("LISTAAAAAAAAA LOCAL", element);
      return (
        <ScrollView style={styles.container2}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
            <View>
              <Text style={{
                width: 200, textAlign: 'center', fontWeight: "bold",
                fontSize: 25,
                margin: 20
              }}>{element.nombre.toUpperCase()}</Text>
            </View>
            <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
          </View>

          <View>
            <Text style={styles.info}>
              {" "}
              Direccion: {element.Domicilio.calle} {element.Domicilio.numero}, {element.Domicilio.Localidad.nombre}
            </Text>
          </View>

          <View style={{ alignItems: 'center' }}>
            {element.image == null ?
              <Image
                source={require("../assets/camara.jpg")}
                style={{ margin: 15, width: "90%", height: 250, borderRadius: 12, }}
              /> :
              <Image
                source={{ uri: element.image }}
                style={{ margin: 15, width: "90%", height: 250, borderRadius: 12, }} />
            }
          </View>



          <View style={{ flex: 1, justifyContent: "space-between", alignItems: 'center', flexDirection: 'row' }}>
            {/*<Pressable
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
            </Pressable>*/}
            <Menu
              visible={visible}
              anchor={<Pressable
                style={styles.button2}
                onPress={showMenu}>
                <Text style={styles.text}>AGREGAR</Text>
              </Pressable>
              }
              onRequestClose={hideMenu}
            >
              <MenuItem onPress={hideMenu, evento}>Nuevo Evento</MenuItem>
              <MenuDivider />
              <MenuItem onPress={hideMenu, promo}>Nueva Promocion</MenuItem>
            </Menu>

            <Pressable
              style={styles.button4}
              onPress={() => {
                navigation.navigate("VerEventos", {
                  idLocal: element.id,
                  longitud: element.longitud,
                  latitud: element.latitud
                });
              }}
            >
              <Text style={styles.text}>VER INFO</Text>
            </Pressable>
          </View>
          <View style={{ marginTop: "35%", width: "100%", flex: 1, justifyContent: "space-between", alignItems: 'center', flexDirection: 'row' }}>
            <Pressable
              style={styles.button4}
              onPress={() => {
              navigation.navigate("EditarLocal", {
                latitud: element.latitud,
                longitud: element.longitud,
                idLocalidad: idLocalidad,
                localidad: element.Domicilio.Localidad.nombre,
                idDueno: idDueno,
                calle: element.Domicilio.calle,
                numero: element.Domicilio.numero,
                nombre: element.nombre,
                idLocal: element.id,
                idDomic: element.Domicilio.id, 
                imagen: element.image
              });
              }}
            >
              <Text style={styles.text}>EDITAR</Text>
            </Pressable>
            <Pressable
              style={styles.button3}
              onPress={() => Alert.alert(
                        "Eliminar",
                        "¿Desea eliminar el local?",
                        [
                          {
                            text: "Cancelar",
                            onPress: () => console.log("Cancel Pressed"),
                            style: "cancel"
                          },
                          {
                            text: "Aceptar",
                            onPress: () => Backend.deleteLocal(element.id).then((items) => Alert.alert("Local eliminado con éxito"), setCant(false)
                            )
                          }
                        ]
                      )}
            >
              <Text style={styles.text}>BORRAR</Text>
            </Pressable></View>


        </ScrollView>
      );
    });
  };
  if (cant) {
    return (
      //Tiene locales
      <>
        <View>{list()}</View>
      </>
    );
  } else {
    return (
      //No tiene locales
      <>
        <View style={styles.container}>
          <View style={{ width: "90%", justifyContent: 'center', alignItems: 'center', marginBottom: 40, marginTop: "30%" }}>
            <Image style={{ height: 250, width: 300, marginBottom: 15 }} source={require("../assets/logo3.png")} />
            <Text style={{ fontFamily: 'sans-serif', fontStyle: 'italic', fontSize: 25, fontWeight: 'bold', textAlign: 'center' }}>
              Todavía no tenés registrado un local
            </Text>
          </View>

          <Pressable
            onPress={() => {
              navigation.navigate("AltaLocal", {
                latitud: latitud,
                longitud: longitud,
                localidad: localidad,
                idLocalidad: idLocalidad,
                idDueno: idDueno,
                calle: calle,
                numero: numero
              });
              setCant(true);
              Backend.getLocalesXUser(idDueno).then((items) => {
                setLocales(items);
              });
            }}
          >
            <LinearGradient
              // Button Linear Gradient
              colors={['#C2454A', '#A32934', '#680008']}
              start={{ x: 1, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={styles.button}>
              <Text style={styles.text}>DAR DE ALTA UN LOCAL</Text>
            </LinearGradient>
          </Pressable></View>

      </>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#ebe6d9",
    height: "100%",
    alignItems: "center",
  },
  container2: {
    width: "100%",
    backgroundColor: "#ebe6d9",
    height: "100%",
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
    width: "90%",
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
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 30,
    elevation: 3,
    backgroundColor: 'black',
    width: '80%',
    marginTop: 50,
  },
  button2: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 30,
    elevation: 3,
    backgroundColor: 'black',
    width: '95%',
    marginHorizontal: "5%",
    marginTop: 10
  },
  button3: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 30,
    elevation: 3,
    backgroundColor: 'red',
    width: '40%',
    marginHorizontal: "5%",
    marginTop: 10
  },
  button4: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 30,
    elevation: 3,
    backgroundColor: 'black',
    width: '40%',
    marginHorizontal: "5%",
    marginTop: 10
  },
  text: {
    fontSize: 15,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
    textAlign: "center",
    lineHeight: 30,
  },
  titleButton: {
    fontSize: 15,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
});
