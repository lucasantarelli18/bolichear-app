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
  Image,
} from "react-native";
import * as Backend from "../backlog";

export function VerInfoScreen({ route, navigation }) {
  const [local, setLocal] = React.useState([]);
  const [image, setImage] = React.useState([]);
  const { idLocal, latitud, longitud } = route.params;

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
        <ImageBackground
          source={require("../assets/fondoBoliches3.jpg")}
          blurRadius={3}
          style={{ flex: 1 }}
        >
          <View>
            <Text key="{element.id}">{element.nombre}</Text>
            <Text> {distkm} km</Text>
          </View>
          <View>
            <View>
              <Text>
                {" "}
                Dirección: {element.Domicilio.calle} {element.Domicilio.numero}
              </Text>
              <Text> Asistiran 300 personas </Text>
            </View>
          </View>
          <View style={styles.detalles}>
            <Text style={styles.title}> EVENTOS </Text>
            <Pressable
              style={styles.button}
              onPress={() => {
                Alert.alert("Proximamente");
              }}
            >
              <Text style={styles.text}>MIS EVENTOS</Text>
            </Pressable>
            <Pressable
              style={styles.button}
              onPress={() => {
                Alert.alert("Proximamente");
              }}
            >
              <Text style={styles.text}>NUEVO EVENTO</Text>
            </Pressable>

            <Text style={styles.title}> PROMOCIONES </Text>
            <Pressable
              style={styles.button}
              onPress={() => {
                Alert.alert("Proximamente");
              }}
            >
              <Text style={styles.text}>MIS PROMOCIONES</Text>
            </Pressable>
            <Pressable
              style={styles.button}
              onPress={() => {
                Alert.alert("Proximamente");
              }}
            >
              <Text style={styles.text}>NUEVA PROMOCION</Text>
            </Pressable>
          </View>
        </ImageBackground>
      );
    });
  };

  return <View style={styles.container}>{list()}</View>;
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
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
});
