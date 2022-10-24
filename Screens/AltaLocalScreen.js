import * as React from 'react';
import { Text, TextInput, View, Button, ScrollView, StyleSheet, Alert, ImageBackground, Pressable } from 'react-native';
import * as Backend from '../backlog';
//import DropDownPicker from 'react-native-dropdown-picker';
//import Constants from 'expo-constants';

export function AltaLocalScreen({ route, navigation: { goBack } }) {

  const { latitud, longitud, localidad, idLocalidad, idDueno, calle, numero } = route.params;

  const [faltaIngresoNombre, setFaltaIngresoNombre] = React.useState(true);
  //  const [faltaIngresoLoc, setFaltaIngresoLoc] = React.useState(true);

  //  const [openLoc, setOpenLoc] = React.useState(false);
  //  const [valueLoc, setValueLoc] = React.useState(null); //para el picker
  //  const [localidadSeleccionada, setLocalidadSeleccionada] = React.useState([]);
  const [nombreLocal, setNombreLocal] = React.useState([]);
  const [idDomicilio, setIdDomicilio] = React.useState([]);
  console.log("Buenas, esta es la calle y el numero", latitud, longitud, idLocalidad, idDueno, calle, numero, localidad)



  return (
    <>
      <Text style={styles.titulos}>Alta de locales</Text>

      <TextInput
        onChangeText={text => {
          setNombreLocal(text),
            setFaltaIngresoNombre(false)
        }}
        placeholder="Ingrese nombre del local"
      />

      <TextInput
        style={styles.input}
        editable={false}
        placeholder={calle + ' ' + numero + ', ' + localidad}
        disabled={true}
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
      <Pressable style={styles.button} onPress={() => {
        if (faltaIngresoNombre/*||faltaIngresoLoc*/) {
          Alert.alert('Complete los datos')
        } else {
          Backend.insertDomicilioSinPiso(calle, numero, idLocalidad)
            .then(() => {
              Backend.getUltimoDomicilio().then((items) => {
                setIdDomicilio(items[0].id),
                  console.log(items[0].id),
                  Backend.insertLocal(nombreLocal, parseFloat(latitud), parseFloat(longitud), parseInt(idDueno), parseInt(items[0].id))
                    .then((items) => { });
              });
            })
          /*Backend.insertLocal(nombreLocal, parseFloat(latitud), parseFloat(longitud), parseInt(idDueno), parseInt(idDomicilio))
            .then((items) => { })*/
          goBack();
        }

      }}>
        <Text style={styles.text}>DAR DE ALTA</Text>
      </Pressable>

    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 1,
    //padding: 10,
    width: '100%',
    //height: 500,

    //flexWrap: 'wrap',
    //flexDirection: 'column',
    //flexWrap: 'no-wrap',
  },
  input: {
    padding: 10,
    width: "80%",
    heigt: 10,
    marginTop: 25,
    borderRadius: 30,
    backgroundColor: '#f1f1f1',
    fontFamily: "Roboto-Medium",
    paddingStart: 30,
    fontSize: 16,
    elevation: 10,
  },
  boliches: {
    flex: 0.2,
    backgroundColor: "lightgrey",
    borderBottomWidth: 1,
    //borderWidth: 1,
    marginBottom: .5,
    padding: 5,
    //flexWrap: 'no-wrap',
  },
  boliches2: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
  },
  button2: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 4,
    backgroundColor: 'black',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});