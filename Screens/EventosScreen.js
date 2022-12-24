import React, { useState, Fragment } from "react";
import { ScrollView, Button, View, Text, StyleSheet, Pressable, Alert, TextInput, Image } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import * as Backend from "../backlog";
import { supabase } from "../supabase";
import "react-native-url-polyfill/auto";
import { Input, Block } from "galio-framework";
import Moment from "moment";
import "moment/locale/es";
import DropDownPicker from "react-native-dropdown-picker";
import * as ImagePicker from 'expo-image-picker';
//import { useForm } from "react-hook-form";

export function EventosScreen({ route, navigation }) {
  const [eventos, setEventos] = React.useState([]);
  const [tipoEvento, setTipoEvento] = React.useState([]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([]);
  const [nombreEvento, setNombreEvento] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState();
  const [faltaIngresoNombre, setFaltaIngresoNombre] = React.useState(true);
  const [isImage, setIsImage] = React.useState(false);
  const [horaInicio, setHoraInicio] = useState(null);
  const [horaFin, setHoraFin] = useState(null);
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [datePickerVisible2, setDatePickerVisible2] = useState(false);
  const [path, setImage] = useState(null);

  const { idLocal, latitud, longitud } = route.params;

  React.useEffect(() => {
    //Tomo eventos
    //Backend.getEventos().then((items) => {
    //console.log(items);
    //});

    Backend.getTipoEventos().then((items) => {
      const arr = [];
      for (const i in items) {
        arr.push({ label: items[i].tipo, value: items[i].id });
      }
      console.log(arr);
      setItems(arr);
    });
    /*
    Backend.insertEvento().then((items) => {
      //console.log(items);
      setEventos(items);
    });*/
  }, []);

  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const showDatePicker2 = () => {
    setDatePickerVisible2(true);
  };

  const hideDatePicker2 = () => {
    setDatePickerVisible2(false);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);
    if (!result.cancelled) {
      setImage(result.uri);
      setIsImage(true);
      Backend.insertFoto(result.uri)
        .then((items) => { items })
    }
  };
  console.log(precio)
  return (
    <ScrollView style={styles.container}>
      {/*Pide al usuario NOMBRE DEL EVENTO*/}
      <Text style={styles.titulos}>Nombre del Evento</Text>
      <View style={styles.container2}>
        <TextInput
          style={styles.input}
          onChangeText={(nuevoEvento) => { setNombreEvento(nuevoEvento), setFaltaIngresoNombre(false) }}
          value={nombreEvento}
          placeholder="Ingrese un nombre"
        />
      </View>

      {/*Selector de tipo evento*/}
      <Text style={styles.titulos}>Tipo del Evento</Text>
      <View style={styles.container2}>
        <DropDownPicker
          style={styles.input2}
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          placeholder="Tipo de evento"
        />
      </View>

      {/*Pide al usuario que ingrese DESCRIPCIÓN*/}
      <Text style={styles.titulos}>Descripción del Evento</Text>
      <View style={styles.container2}>
        <TextInput
          style={styles.input}
          placeholder="Ingrese la descripcion"
          onChangeText={(nuevaDesc) => setDescripcion(nuevaDesc)}
          value={descripcion}
        />
      </View>
      <Text style={styles.titulos}>Precio de la entrada</Text>
      <View style={styles.container2}>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Ingrese el precio"
          onChangeText={(nuevoPrecio) => setPrecio(nuevoPrecio)}
          value={precio}
        />
      </View>
      {/*pide hora inicio y fin al usuario */}
      <Text style={styles.titulos}>Vigencia</Text>
      <View style={styles.container2}>
        <Pressable style={styles.buttonF} title="Inicio" onPress={showDatePicker} >
          <Text style={styles.text}>INICIO</Text>
        </Pressable>
        <Text style={{ fontSize: 16, fontWeight: "bold", marginVertical: 10 }}>
          {horaInicio ? horaInicio : "No selecciono la fecha incio"}
        </Text>
        <DateTimePickerModal
          isVisible={datePickerVisible}
          mode="datetime"
          onConfirm={(datetime) => {
            hideDatePicker();
            setHoraInicio(Moment(datetime).format("YYYY-MM-DD HH:mm:ss"));
            console.log(datetime);
          }}
          onCancel={hideDatePicker}
        />

        <Pressable style={styles.buttonF} title="Fin" onPress={showDatePicker2}>
          <Text style={styles.text}>FIN</Text>
        </Pressable>
        <Text style={{ fontSize: 16, fontWeight: "bold", marginVertical: 10 }}>
          {horaFin ? horaFin : "No selecciono la fecha fin"}
        </Text>
        <DateTimePickerModal
          isVisible={datePickerVisible2}
          mode="datetime"
          onConfirm={(datetime) => {
            hideDatePicker2();
            setHoraFin(Moment(datetime).format("YYYY-MM-DD HH:mm:ss"));
          }}
          onCancel={hideDatePicker2}
        />
      </View>

      
      <Text style={styles.titulos}>Foto del Evento</Text>
      <View style={styles.container2}>
        {!isImage ?
          <Image
            source={require("../assets/camara.jpg")}
            style={{ margin: 15, width: 350, height: 200, borderRadius: 12, }}
          /> :
          <Image
            source={{ uri: path }}
            style={{ margin: 15, width: 350, height: 200, borderRadius: 12 }} />}

        <Pressable style={styles.botonImage} title="Cargar imagen" onPress={pickImage}>
          <Text style={styles.text}>Cargar Imagen</Text>
        </Pressable>

      </View>


      <View alignSelf="center" style={styles.container2}>
        <Pressable
          style={styles.button}
          onPress={() =>
            Backend.insertEvento(
              nombreEvento,
              descripcion,
              horaInicio,
              horaFin,
              value,
              idLocal,
              path,
              precio
            ).then((items) => {
              Alert.alert("Evento creado"),
                navigation.navigate('Locales', { idLocal: idLocal, latitud: latitud, longitud: longitud })
            })
          }
        >
          <Text style={styles.text}>CREAR EVENTO</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 1,
    width: "100%",
    backgroundColor: "#ebe6d9",
  },
  container2: {
    width: '100%',
    //backgroundColor: '#fff',
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 30,
    elevation: 3,
    backgroundColor: '#a73d4c',
    width: '80%',
    marginTop: 50,
    marginBottom: 30
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  input: {
    padding: 7,
    width: "80%",
    marginTop: 10,
    alignItems: "center",
    borderRadius: 30,
    backgroundColor: '#f1f1f1',
    fontFamily: "Roboto-Medium",
    paddingStart: 30,
    paddingEnd: 30,
    fontSize: 16,
    elevation: 10,
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
  },
  titulos: {
    //width: 500,
    fontSize: 25,
    fontWeight: "bold",
    marginLeft: 25,
    marginTop: 20
  },
  botonImage: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 30,
    elevation: 3,
    width: '40%',
    alignItems: 'center',
  },
  buttonF: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 30,
    elevation: 3,
    backgroundColor: 'black',
    width: '50%',
    marginTop: 10
  },
});
