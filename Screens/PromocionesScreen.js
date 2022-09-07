import React, { useState } from "react";
import { Button, View, Text, StyleSheet, Pressable, Image, Alert} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import * as Backend from '../backlog';
import 'moment-timezone';
import 'react-native-url-polyfill/auto';
import { Input, Block} from "galio-framework";
import * as ImagePicker from 'expo-image-picker';
import {  Card, Icon } from 'react-native-elements';
import { ButtonGroup } from "@rneui/themed";
import { Form, FormItem } from 'react-native-form-component';
import Moment from 'moment';
import 'moment/locale/es';


export function PromocionesScreen({route, navigation}) {

  const [fechaYHoraIncioMuestra, setFechaYHoraIncioMuestra] = useState(false);
  const [fechaYHoraFinMuestra, setfechaYHoraFinMuestra] = useState(false);
  const [image, setImage] = useState(null);
  const [nombre, setNombre] = useState(null);
  const [descripcion, setDescripcion] = useState(null);
  const [fechaYHoraIncio, setFechaYHoraIncio] = useState(null);
  const [fechaYHoraFin, setFechaYHoraFin] = useState(null);
  const { idLocal } = route.params;
 

  const showDateTimePicker = () => {
    setFechaYHoraIncioMuestra(true);
    setfechaYHoraFinMuestra(true);
  };
  const hideDateTimePicker = () => {
    setFechaYHoraIncioMuestra(false);
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
      Backend.insertFoto(result.uri)
      .then((items) => {items})
    }
  };
 
  return (
    <Card>
      <Form onButtonPress={() =>Backend.insertPromocion(
        nombre,
        descripcion, 
        fechaYHoraIncio, 
        fechaYHoraFin,
        idLocal)
        .then((items) => {items})}>
      <FormItem 
        label="Nombre"
        isRequired
        value={nombre}
        onChangeText={(nombre) => setNombre(nombre)}
        asterik
      />
      <FormItem 
      label="Descripcion"
      value={descripcion}
      onChangeText={(descripcion) => setDescripcion(descripcion)}
      />
     
      <Button  style = {styles.button} title="Inicio" onPress={showDateTimePicker}/> 
      <DateTimePickerModal
            isVisible={fechaYHoraIncioMuestra}
            mode="datetime"
            onConfirm={(datetime)=>{hideDateTimePicker(); setFechaYHoraIncio(Moment(datetime).format('YYYY-MM-DD HH:mm:ss'))}}
            onCancel={hideDateTimePicker}
            
      />
      <Button style = {styles.button} title="Fin" onPress={showDateTimePicker}/> 
      <DateTimePickerModal
            isVisible={fechaYHoraFinMuestra}
            mode="datetime"
            onConfirm={(datetime)=>{hideDateTimePicker(); setFechaYHoraFin(Moment(datetime).format('YYYY-MM-DD HH:mm:ss'))}}
            onCancel={hideDateTimePicker}
      />



      <Button title="Cargar imagen" onPress={pickImage} />
          {image && <Image source={{ uri: image }} style={{ width: 350, height: 200 }}/>}
 

    </Form>
    </Card>
      
  
      


    
     
  );

};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
    flexDirection: 'row',
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
    backgroundColor: '#A1A1A1',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: "space-between",
  },
  container2: {
    width: '90%',
    height: '100%',
    backgroundColor: '#fff',
    paddingVertical: 110
  },
  fixToText: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding:10,
    
  }
});