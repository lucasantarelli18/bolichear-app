import * as React from 'react';
import { Text, TextInput, View, Button, ScrollView, StyleSheet, Alert, ImageBackground, Pressable } from 'react-native';
import * as Backend from '../backlog';
//import DropDownPicker from 'react-native-dropdown-picker';
//import Constants from 'expo-constants';

export function AltaLocalScreen({ route, navigation: { goBack } }) {

  const { latitud, longitud, idDomicilio, idDueno} = route.params;

  const [faltaIngresoNombre, setFaltaIngresoNombre] = React.useState(true);
//  const [faltaIngresoLoc, setFaltaIngresoLoc] = React.useState(true);

//  const [openLoc, setOpenLoc] = React.useState(false);
//  const [valueLoc, setValueLoc] = React.useState(null); //para el picker
//  const [localidadSeleccionada, setLocalidadSeleccionada] = React.useState([]);
  const [nombreLocal, setNombreLocal] = React.useState([]);

  return (
  	<>
      <Text style={styles.titulos}>Alta de locales</Text>

      <TextInput
        onChangeText={text=>{setNombreLocal(text),
          setFaltaIngresoNombre(false)
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
      <Pressable style={styles.button} onPress={() => {
           if(faltaIngresoNombre/*||faltaIngresoLoc*/){
            Alert.alert('Complete los datos')
          }else{
          Backend.insertLocal(nombreLocal, parseFloat(latitud), parseFloat(longitud), parseInt(idDueno), parseInt(idDomicilio))
          .then((items)=>{}) 
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