import * as React from 'react';
import { useState } from "react";
import * as Backend from '../backlog';
import { Text, View, Button, ScrollView, StyleSheet, Alert, Image, TextInput, Pressable, ImageBackground } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import MapView, { Callout, Marker, Polyline } from 'react-native-maps';
import { StatusBar } from 'expo-status-bar';
import 'react-native-url-polyfill/auto';
import TabScreen from './TabScreen';
import { LinearGradient } from 'expo-linear-gradient';
import { Checkbox } from 'react-native-paper';
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';
import DropDownPicker from "react-native-dropdown-picker";

export function MapScreen({ route, navigation }) {

  const mapa = new Map();
  const date = new Date();
  const [mapaState, setMapaState] = React.useState([]);
  const [locales, setLocales] = React.useState([]);
  const [localesFiltrados, setLocalesFiltrados] = React.useState([]);
  const { calle, numero, localidad, latitud, longitud, rango } = route.params;

  //console.log("Buenas, esta es la calle y el numero", calle, numero, localidad)

  const [origin, setOrigin] = React.useState({
    latitude: route.params.latitud,
    longitude: route.params.longitud,
  });
  const [visible, setVisible] = React.useState(false);
  const [destination, setdestination] = React.useState({
    latitude: -34.924941,
    longitude: -57.967533,
  });

  const [cambio, setCambio] = React.useState(true);
  const [filtrar, setFiltrar] = React.useState(0);
  const [evento, setEvento] = React.useState([]);
  const [tipoEvento, setTipoEvento] = React.useState([]);
  const [idLocalidad, setIdLocalidad] = React.useState([]);
  const [openTE, setOpenTE] = useState(false);
  const [valueTE, setValueTE] = useState(null);
  const [itemsTE, setItemsTE] = useState([
    { label: "Todos", value: 0 },
    { label: "Fiesta", value: 1 },
    { label: "Show en vivo", value: 2 },
    { label: "Tematica", value: 3 },
    { label: "Noche cachengue", value: 4 },
    { label: "Noche electronica", value: 5 }
  ]);
  /*
    const [openTL, setOpenTL] = useState(false);
    const [valueTL, setValueTL] = useState(null);
    const [itemsTL, setItemsTL] = useState([
      {label: "Todos", value: 0},
      {label: "Boliche", value: 1},
      {label: "Bar", value: 2}
      ]);
    const [openPR, setOpenPR] = useState(false);
    const [valuePR, setValuePR] = useState(null);
    const [itemsPR, setItemsPR] = useState([
      {label: "Todos", value: 0},
      {label: "Ascendente", value: 1},
      {label: "Descendente", value: 2}
      ]);
  */
  const hideMenu = () => setVisible(false);

  const showMenu = () => setVisible(true);
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
            //distancia.push(items[i].dist = distkm).sort((a,b)=> a -b)
            console.log(items[i].dist = distkm)
            //console.log(items[i])
            let asistDelLocal = 0
            for (const j in items[i].Asistencia) {
              if (items[i].Asistencia[j].created_at.split('T')[0] == date.toISOString().split('T')[0]) {
                asistDelLocal++;
              }
            }
            mapa.set(items[i].id, asistDelLocal)
            items[i].Asistencia = asistDelLocal
            console.log(items[i])
            arr.push(items[i])
          } else {
            //console.log("fuera del rango")
          }
        }
        setLocales(arr)
        setMapaState(mapa)
      })
    Backend.getLocalidadXNombre(localidad).then((items) => {
      setIdLocalidad(items[0].id);
    })

    Backend.getEventos().then((items) => {
      setEvento(items)
    })

  }, [])

  const filtradoLocales = (query) => {
    const arr = [[]];
    return query.map((i) => { });
  };

  const changeCambio = (elem) => {
    setCambio(elem);
  };

  const changeFiltrar = (elem) => {
    setFiltrar(elem);
  };



  const list = () => {
    if (cambio && filtrar == 0) {
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

    } else if (cambio) {
      return localesFiltrados.map((element) => {
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

    } else if (filtrar == 0) {
      return locales.map((element) => {
        return (
          <Pressable
            onPress={() => {
              navigation.navigate("VerEventos", {
                idLocal: element.id,
                insta: element.insta
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
                  <Text style={styles.info}> Asistiran {mapaState.get(element.id)} personas </Text>
                </View>
              </View>
            </ImageBackground>
          </Pressable>
        );
      });
    } else {
      return localesFiltrados.map((element) => {
        //console.log(element)
        return (
          <Pressable
            onPress={() => {
              navigation.navigate("VerEventos", {
                idLocal: element.id,
                insta: element.insta
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
                  <Text style={styles.info}> Asistiran {mapaState.get(element.id)} personas </Text>
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
          {/*<Text>{filtroTipoEvento()}</Text>*/}
        </View>


        {/*
      <View style={styles.container2}>
        <DropDownPicker
          style={styles.input2}
          open={openTL}
          value={valueTL}
          items={itemsTL}
          setOpen={setOpenTL}
          setValue={setValueTL}
          setItems={setItemsTL}
          placeholder="Tipo de local"
        />
      </View>
      <View style={styles.container2}>
        <DropDownPicker
          style={styles.input2}
          open={openPR}
          value={valuePR}
          items={itemsPR}
          setOpen={setOpenPR}
          setValue={setValuePR}
          setItems={setItemsPR}
          placeholder="Precio de entradas"
        />
      </View>
*/}

        <Pressable style={styles.button} onPress={() => {
          const array = locales
          const arrayFiltrado = []

          if (valueTE == null) {
            for (const i in array) {
              arrayFiltrado.push(array[i])
            }
          } else if (valueTE == 0) {
            for (const i in array) {
              //console.log(array[i]);
              if (array[i].Evento.length > 0) {
                arrayFiltrado.push(array[i])
              }
            }
          } else {

            for (const i in array) {
              const tiposDeEvento = []
              for (const j in array[i].Evento) {
                tiposDeEvento.push(array[i].Evento[j].idTipoEvento)
              }
              //console.log(tiposDeEvento)
              if (tiposDeEvento.includes(valueTE)) {
                arrayFiltrado.push(array[i])
              }

            }
          }

          setLocalesFiltrados(arrayFiltrado)

          changeFiltrar(filtrar + 1)
        }} >
          <Text style={styles.text}>FILTRAR FIESTAS</Text>
        </Pressable>


        <View style={styles.container2}>
          <DropDownPicker
            style={styles.input2}
            open={openTE}
            value={valueTE}
            items={itemsTE}
            setOpen={setOpenTE}
            setValue={setValueTE}
            setItems={setItemsTE}
            placeholder="Tipo de evento"
          />
        </View>

        <Pressable style={styles.button} onPress={() => {
          if (filtrar == 0) {
            const ordenados = locales.sort((a, b) => a.dist - b.dist)
            setLocalesFiltrados(ordenados)
            changeFiltrar(filtrar + 1)
            console.log(locales.id)

          } else {
            const ordenados = localesFiltrados.sort((a, b) => a.dist - b.dist)
            setLocalesFiltrados(ordenados)
            changeFiltrar(filtrar + 1)
          }



        }} >
          <Text style={styles.text}>Ordenar por distancia</Text>
        </Pressable>

        <Pressable style={styles.button} onPress={() => {
          if (filtrar == 0) {
            const ordenados = locales.sort((a, b) => b.Asistencia - a.Asistencia)
            setLocalesFiltrados(ordenados)
            changeFiltrar(filtrar + 1)

          } else {
            const ordenados = locales.sort((a, b) => b.Asistencia - a.Asistencia)
            setLocalesFiltrados(ordenados)
            changeFiltrar(filtrar + 1)
          }
        }} >
          <Text style={styles.text}>Ordenar por asistencia</Text>
        </Pressable>

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
    //borderColor: 'gray',
    //borderTopWidth: 1,
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
    borderColor: 'lightgray',
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

  },
  input2: {
    padding: 7,
    width: "80%",
    marginTop: 10,
    marginHorizontal: "10%",
    alignItems: "center",
    borderRadius: 30,
    backgroundColor: '#f1f1f1',
    fontFamily: "Roboto-Medium",
    paddingStart: 30,

    fontSize: 16,
    elevation: 10,
  }

});