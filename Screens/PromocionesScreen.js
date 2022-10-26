import React, { useState } from "react";
import { Button, View, Text, StyleSheet, Pressable, Image, Alert, ScrollView, Input, TextInput, } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import * as Backend from '../backlog';
import 'moment-timezone';
import 'react-native-url-polyfill/auto';
//import { Input, Block } from "galio-framework";
import * as ImagePicker from 'expo-image-picker';
import { Card, Icon } from 'react-native-elements';
//import { ButtonGroup } from "@rneui/themed";
import { Form, FormItem } from 'react-native-form-component';
import Moment from 'moment';
import 'moment/locale/es';
//import { v4 as uuid } from 'uuid';


export function PromocionesScreen({ route, navigation }) {

  const [fechaYHoraIncioMuestra, setFechaYHoraIncioMuestra] = useState(false);
  const [faltaIngresoNombre, setFaltaIngresoNombre] = React.useState(true);
  const [fechaYHoraFinMuestra, setfechaYHoraFinMuestra] = useState(false);
  const [idPromocion, setImage] = useState(null);
  const [nombre, setNombre] = useState(null);
  const [descripcion, setDescripcion] = useState(null);
  const [fechaYHoraIncio, setFechaYHoraIncio] = useState(null);
  const [fechaYHoraFin, setFechaYHoraFin] = useState(null);
  const { idLocal, latitud, longitud } = route.params;
  const [isImage, setIsImage] = React.useState(false);
  //const idPromocion = uuid();

  const showDateTimePicker = () => {
    setFechaYHoraIncioMuestra(true);
  };

  const hideDateTimePicker = () => {
    setFechaYHoraIncioMuestra(false);
  };

  const showDateTimePicker2 = () => {
    setfechaYHoraFinMuestra(true);
  };

  const hideDateTimePicker2 = () => {
    setfechaYHoraFinMuestra(false);
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

  return (
    <ScrollView style={styles.container}>

      <Form
        onButtonPress={() => {
          if (faltaIngresoNombre/*||faltaIngresoLoc*/) {
            Alert.alert('Complete los datos')
          } else {
            Backend.insertPromocion(
              nombre,
              descripcion,
              fechaYHoraIncio,
              fechaYHoraFin,
              idLocal,
              idPromocion)
            .then((items) => {
              Alert.alert("Promoción creada");
              navigation.navigate('Locales', { idLocal: idLocal, latitud: latitud, longitud: longitud })
            })
          }
        }}>

        <Text style={styles.titulos}>Nombre de la Promoción</Text>
        <View style={styles.container2}>
          <TextInput
            style={styles.input}
            isRequired
            onChangeText={(nombre) => { setNombre(nombre), setFaltaIngresoNombre(false) }}
            placeholder="Ingrese un nombre"
          />
        </View>

        <Text style={styles.titulos}>Descripción de la Promoción</Text>
        <View style={styles.container2}>
          <TextInput
            style={styles.input}
            placeholder=" Descripción"
            onChangeText={(descripcion) => setDescripcion(descripcion)}
          />
        </View>

        <Text style={styles.titulos}>Vigencia</Text>
        <View style={styles.container2}>
          <Pressable style={styles.buttonF} title="Inicio" onPress={showDateTimePicker}>
            <Text style={styles.text}>INICIO</Text>
          </Pressable>
          <Text style={{ fontSize: 16, fontWeight: "bold", marginVertical: 10 }}>
            {fechaYHoraIncio ? fechaYHoraIncio : "No selecciono la fecha inicio"}
          </Text>
          <DateTimePickerModal
            isVisible={fechaYHoraIncioMuestra}
            mode="datetime"
            onConfirm={(datetime) => { hideDateTimePicker(); setFechaYHoraIncio(Moment(datetime).format('YYYY-MM-DD HH:mm:ss')) }}
            onCancel={hideDateTimePicker}

          />

          <Pressable style={styles.buttonF} title="Fin" onPress={showDateTimePicker2}>
            <Text style={styles.text}>FIN</Text>
          </Pressable>
          <Text style={{ fontSize: 16, fontWeight: "bold", marginVertical: 10 }}>
            {fechaYHoraFin ? fechaYHoraFin : "No selecciono la fecha fin"}
          </Text>
          <DateTimePickerModal
            isVisible={fechaYHoraFinMuestra}
            mode="datetime"
            onConfirm={(datetime) => { hideDateTimePicker2(); setFechaYHoraFin(Moment(datetime).format('YYYY-MM-DD HH:mm:ss')) }}
            onCancel={hideDateTimePicker2}
          />

        </View>

        <Text style={styles.titulos}>Foto del Local</Text>
        <View style={styles.container2}>
          {!isImage ?
            <Image
              source={require("../assets/camara.jpg")}
              style={{ margin: 15, width: 350, height: 200, borderRadius: 12, }}
            /> :
            <Image
              source={{ uri: idPromocion }}
              style={{ margin: 15, width: 350, height: 200, borderRadius: 12 }} />}

          <Pressable style={styles.botonImage} title="Cargar imagen" onPress={pickImage}>
            <Text style={styles.text}>Cargar Imagen</Text>
          </Pressable>

        </View>



      </Form>

    </ScrollView>








  );

};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 30,
    elevation: 3,
    backgroundColor: 'black',
    width: '80%',
    marginStart: "10%",
    marginTop: 50
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
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
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
  fixToText: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,

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
  }
});