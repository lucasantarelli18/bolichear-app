import React, { useState } from "react";
import { Button, View, Text, StyleSheet} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import * as Backend from '../backlog';
import Moment from 'moment';
import 'moment-timezone';
import 'react-native-url-polyfill/auto';
import { Input, Block} from "galio-framework";
import { TextInput } from "react-native-web";


export function PromocionesScreen({navigation}) {

  const [promociones, setPromociones] = React.useState([]);
 const [fechaYHoraIncio, setFechaYHoraIncio] = useState(false);
 const [fechaYHoraFin, setfechaYHoraFin] = useState(false);

 
 React.useEffect(() => {
  //Tomo provincias
Backend.insertPromocion()
.then((items) => {
console.log(items)
setPromociones(items)
})
}, [])

  const showDateTimePicker = () => {
    setFechaYHoraIncio(true);
  };


  const hideDateTimePicker = () => {
    setFechaYHoraIncio(false);
  };

  const handleConfirm = (fechaYHoraIncio) => {
    console.log("A date has been picked: ", fechaYHoraIncio);
    hideDateTimePicker();
  };
  
 
  return (
    <View style ={styles.container2}>
      <Input placeholder="Nombre"></Input>
      <Input placeholder="Inserte la descripcion"></Input>
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

      
    </View>
  );

};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 50,
  },
  button:{
    height:40,
    width:30
  }
});