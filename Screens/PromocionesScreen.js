import React, { useState } from "react";
import { Button, View, Text, StyleSheet, Pressable} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import * as Backend from '../backlog';
import Moment from 'moment';
import 'moment-timezone';
import 'react-native-url-polyfill/auto';
import { Input, Block} from "galio-framework";
import { TextInput } from "react-native-web";


export function PromocionesScreen({navigation}) {

  const [promociones, setPromociones] = React.useState({
    nombre:'', 
    descripcion:'', 
    fechaHoraInicio:'',
    fechaHoraFin: '',
    idLocal: 'idLocal'});
  const [fechaYHoraIncio, setFechaYHoraIncio] = useState(false);
  const [fechaYHoraFin, setfechaYHoraFin] = useState(false);

 
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

  const handleConfirm = (e) => {
    console.log("A date has been picked: ", e);
    setfechaYHoraFin(e);
    hideDateTimePicker();
  };
  const handleFormSubmit = (e) =>{
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
  }
  return (
    <View style ={styles.container}>
      <Input style={styles.INPUT} placeholder="Nombre" name="nombre"onChange={handleConfirm}></Input>
      <Input style={styles.INPUT} placeholder="Inserte la descripcion" name="descripcion" onChange={handleConfirm}></Input>
      <Block alignSelf='center'>
      <Button style = {styles.input} title="Fecha y hora de inicio" onPress={showDateTimePicker} />
      <DateTimePickerModal
        isVisible={fechaYHoraIncio}
        mode="datetime"
        onConfirm={handleConfirm}
        onCancel={hideDateTimePicker}
      />
      </Block>
      <Block alignSelf='center'>
      <Button style = {styles.input} title="Fecha y hora de fin" onPress={showDateTimePicker} />
      <DateTimePickerModal
        isVisible={fechaYHoraFin}
        mode="datetime"
        onConfirm={handleConfirm}
        onCancel={hideDateTimePicker}
      />
      </Block>     

      <Pressable style={styles.button} onPress={nuevaPromo}>
          <Text style={styles.text}>Cargar</Text>
        </Pressable>

      
    </View>
  );

};

const styles = StyleSheet.create({
  INPUT:{
    INPUT_BORDER_RADIUS:	16 * 0.5,
    INPUT_BORDER_WIDTH:	16 * 0.05,
    INPUT_HEIGHT:	16 * 2.75,
    INPUT_HORIZONTAL:	16,
    INPUT_TEXT:	16 * 0.875,
    INPUT_LABEL_TEXT:	16 * 0.9,
    INPUT_LABEL_BOTTOM:	16 / 4,
    INPUT_HELP_TEXT:	16 * 0.8,
    INPUT_ROUNDED:	16 * 1.7
  }

});