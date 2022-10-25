import * as React from "react";
import { useState } from 'react';
import {
  Text,
  View,
  Button,
  ScrollView,
  StyleSheet,
  Alert,
  ImageBackground,
  Pressable,
  Image,
} from "react-native";
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';
import * as Backend from "../backlog";

export function VerInfoScreen({ route, navigation }) {
  const [local, setLocal] = React.useState([]);
  const [image, setImage] = React.useState([]);
  const { idLocal, latitud, longitud } = route.params;
  const [visible, setVisible] = useState(false);

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

  React.useEffect(() => {
    Backend.getLocalxID(idLocal).then((items) => {
      console.log(items);
      setLocal(items);
    });

    Backend.getFotoxIdLocal(idLocal).then((items) => {
      console.log(items);
      setImage(items);
    });
  }, []);

  const list = () => {
    return local.map((element) => {
      console.log(element);
      console.log(element.id);
      console.log(element.nombre);

      const latMts = parseFloat(element.latitud) * 111120 - latitud * 111120;
      const lonMts = parseFloat(element.longitud) * 111100 - longitud * 111100;
      const val = Math.pow(latMts, 2) + Math.pow(lonMts, 2);
      const dist = Math.sqrt(val);
      const distkm = (dist / 1000).toFixed(2);

      return (
        <ScrollView style={styles.container}
        >

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
              Direccion: {element.Domicilio.calle} {element.Domicilio.numero}
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

          <Menu
            visible={visible}
            anchor={<Pressable
              style={styles.button}
              onPress={showMenu}>
              <Text style={styles.titleButton}>AGREGAR</Text>
            </Pressable>
            }
            onRequestClose={hideMenu}
          >
            <MenuItem onPress={hideMenu, evento}>Nuevo Evento</MenuItem>
            <MenuDivider />
            <MenuItem onPress={hideMenu, promo}>Nueva Promocion</MenuItem>
          </Menu>

          <View style={styles.detalles}>
            <Pressable
              style={styles.button}
              onPress={() => {
                navigation.navigate("VerEventos", {
                  idLocal: element.id,
                  longitud: element.longitud,
                  latitud: element.latitud
                });
              }}
            >
              <Text style={styles.text}>MIS EVENTOS Y PROMOCION</Text>
            </Pressable>
          </View>
        </ScrollView>
      );
    });
  };

  return <View>{list()}</View>;
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 1,
    width: "100%",
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
    justifyContent: "space-between",
    fontFamily: "Roboto-Medium",
  },
  boliches3: {
    flex: 1.4,
    flexDirection: "row",
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
    marginVertical: 20,
    width: "90%",
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
  detalles: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  titleButton: {
    fontSize: 15,
    fontWeight: "bold",
    color: "white"
  },
});
