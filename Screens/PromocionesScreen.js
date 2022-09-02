import React, { useState } from 'react';
import { Text, Button, View, ScrollView, StyleSheet, Alert, TextInput} from 'react-native';
import * as Backend from '../backlog';
import 'react-native-url-polyfill/auto';



export function PromocionesScreen({navigation}) {

    const [promociones, setPromociones] = React.useState([]);
    const [password, setPassword] = React.useState('');
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)


    React.useEffect(() => {
        //Tomo provincias
    Backend.insertPromocion()
    .then((items) => {
    console.log(items)
    setPromociones(items)
    })
    }, [])

    console.log(promociones)

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>Promociones</Text>
          <TextInput
          style = {styles.input}
          placeholder="Nombre"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          />
         
      
          <TextInput
          style = {styles.input}
          placeholder="Descripcion"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          />
        <Button style = {styles.input} title="Subir"  />
        </View>
      );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

