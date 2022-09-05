import React, { useState } from "react";
import { Button, View, Text, StyleSheet, Pressable, Image} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import * as Backend from '../backlog';
import 'moment-timezone';
import 'react-native-url-polyfill/auto';
import { Input, Block} from "galio-framework";
import * as ImagePicker from 'expo-image-picker';
import {  Card, Icon } from 'react-native-elements';
import { ButtonGroup } from "@rneui/themed";


export function PromocionesScreen({navigation}) {

  const [promociones, setPromociones] = React.useState({
    nombre:'', 
    descripcion:'', 
    fechaHoraInicio:'',
    fechaHoraFin: '',
    idLocal: 'idLocal'});
  const [fechaYHoraIncio, setFechaYHoraIncio] = useState(false);
  const [fechaYHoraFin, setfechaYHoraFin] = useState(false);
  const [image, setImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

 
  React.useEffect(() => {
  Backend.getPromociones()
  .then((items) => {
    //console.log(items)
    setPromociones(items)
  })
  }, [])

  Backend.insertPromocion()
  .then((items) => {
    console.log(items)
    setPromociones(items)
  })
  const showDateTimePicker = () => {
    setFechaYHoraIncio(true);
  };
  const hideDateTimePicker = () => {
    setFechaYHoraIncio(false);
  };

  const handleConfirm = (datetime) => {
    console.log("A date has been picked: ", datetime);
    hideDateTimePicker();
  };
/*   const handleFormSubmit = (e) =>{
    Backend.insertPromocion(promociones.nombre, promociones.descripcion)
  }
 
  const nuevaPromocion =Backend.insertPromocion([{ nombre: 'The Shire', descripcion: 554 }])
  console.log(nuevaPromocion)
  const nuevaPromo=(fechaYHoraFin) => {
    setPromociones({
      nombre: '', 
      descripcion:'', 
      fechaHoraInicio:'',
      fechaHoraFin: fechaYHoraFin,
      idLocal: 'idLocal'
    })
    console.log(promociones)
  } */

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };
  return (
    <View style ={styles.container}>
      <View style = {styles.container2}>
        <Card>
          <Input style={styles.INPUT} placeholder="Nombre" name="nombre"onChange={handleConfirm}></Input>
          <Input style={styles.INPUT} placeholder="Inserte la descripcion" name="descripcion" onChange={handleConfirm}></Input>
          
          <View alignSelf='center' style={styles.fixToText}>

          
          <Button style = {styles.input} title="Inicio" onPress={showDateTimePicker}/> 
          <DateTimePickerModal
            isVisible={fechaYHoraIncio}
            mode="datetime"
            onConfirm={handleConfirm}
            onCancel={hideDateTimePicker}
          />
          <Button style = {styles.input} title="Fin" onPress={showDateTimePicker} />
          <DateTimePickerModal
            isVisible={fechaYHoraFin}
            mode="datetime"
            onConfirm={handleConfirm}
            onCancel={hideDateTimePicker}
          />
          </View> 
          <Button title="Cargar imagen" onPress={pickImage} />
          {image && <Image source={{ uri: image }} style={{ width: 350, height: 200 }} />}

          <Pressable style={styles.button}>
              <Text style={styles.text}>CARGAR</Text>
          </Pressable>
        </Card>

      </View>
      
    </View>
  );

};

const styles = StyleSheet.create({
  INPUT:{
    INPUT_BORDER_RADIUS: 16 * 0.5,
    INPUT_BORDER_WIDTH:	16 * 0.05,
    INPUT_HEIGHT:	16 * 2.75,
    INPUT_HORIZONTAL:	16,
    INPUT_TEXT:	16 * 0.875,
    INPUT_LABEL_TEXT:	16 * 0.9,
    INPUT_LABEL_BOTTOM:	16 / 4,
    INPUT_HELP_TEXT: 16 * 0.8,
    INPUT_ROUNDED:	16 * 1.7
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
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
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: "space-between",
  },
  container2: {
    width: '90%',
    height: '100%',
    backgroundColor: '#000',
    paddingVertical: 110
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding:10,
    
  }
});