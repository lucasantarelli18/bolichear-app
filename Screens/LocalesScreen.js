import * as React from "react";
import {
  Text,
  TextInput,
  View,
  Button,
  ScrollView,
  StyleSheet,
  Alert,
  Pressable,
} from "react-native";
import * as Backend from "../backlog";
import DropDownPicker from "react-native-dropdown-picker";
import Constants from "expo-constants";

export function LocalesScreen({ navigation }) {
  //traer del login
  const idDueno = 5;

  //traer del home
  const lat = -34.921296;
  const long = -57.954208;
  const idDomicilio = 3;

  const [faltaIngresoNombre, setFaltaIngresoNombre] = React.useState(true);
  //  const [faltaIngresoLoc, setFaltaIngresoLoc] = React.useState(true);

  //  const [openLoc, setOpenLoc] = React.useState(false);
  //  const [valueLoc, setValueLoc] = React.useState(null); //para el picker
  //  const [localidadSeleccionada, setLocalidadSeleccionada] = React.useState([]);
  const [locales, setLocales] = React.useState([]);
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
        <View style={styles.boliches}>
          <View style={styles.boliches2}>
            <Text style={styles.titulos} key="{element.id}">
              {element.nombre}
            </Text>
            <Text style={styles.titulos}> 1km</Text>
          </View>

          <View style={styles.boliches2}>
            <View>
              <Text>Longitud: {element.longitud}</Text>
              <Text>Latitud: {element.latitud}</Text>
            </View>
            <View>
              <Button
                style={styles.botones}
                title="Ver info"
                onPress={() => Alert.alert("Proximamente")}
              />
            </View>
          </View>
        </View>
      );
    });
  };

  return (
    <>
      {cant ? (
        //Tiene locales
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text>Locales Screen</Text>
          <View style={styles.container}>{list()}</View>
          <Button
            title="Mis Eventos"
            onPress={() => {
              navigation.navigate("Eventos");
            }}
          />
        </View>
      ) : (
        //No tiene locales
        <>
          <Text>Alta de locales</Text>
          <TextInput
            onChangeText={(text) => {
              setNombreLocal(text), setFaltaIngresoNombre(false);
            }}
            placeholder="Ingrese nombre del local"
          />
          {/*     <Text>Localidad:</Text>
      <DropDownPicker
        open={openLoc}
        value={valueLoc}
        items={itemsLoc}
        setOpen={setOpenLoc}
        closeAfterSelecting={true}
        disabled={faltaIngresoProv}
        setValue={setValueLoc}
        searchable={true}
        searchPlaceholder="Buscar..."
        onSelectItem={(value)=>{setLocalidadSeleccionada(value),
          setFaltaIngresoLoc(false)
    }}
        placeholder="Seleccione una localidad"
        />
*/}
          <Button
            title="Dar de Alta"
            onPress={() => {
              //          console.log(faltaIngresoNombre, faltaIngresoLoc);
              if (faltaIngresoNombre /*||faltaIngresoLoc*/) {
                Alert.alert("Complete los datos");
              } else {
                Backend.insertLocal(
                  nombreLocal,
                  lat,
                  long,
                  idDueno,
                  idDomicilio
                );
              }
            }}
          />
          <Button
            title="Mis Eventos"
            onPress={() => {
              navigation.navigate("Eventos");
            }}
          />
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 1,
    //padding: 10,
    width: "100%",
    //height: 500,

    //flexWrap: 'wrap',
    //flexDirection: 'column',
    //flexWrap: 'no-wrap',
  },
  boliches: {
    flex: 0.2,
    backgroundColor: "lightgrey",
    borderBottomWidth: 1,
    //borderWidth: 1,
    marginBottom: 0.5,
    padding: 5,
    //flexWrap: 'no-wrap',
  },
  boliches2: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    //flexWrap: 'no-wrap',
    //marginTop: 9,
  },
  titulos: {
    //width: 500,
    fontSize: 15,
    fontWeight: "bold",
  },
  botones: {
    //width: 200,
  },
});
