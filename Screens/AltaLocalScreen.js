import * as React from 'react';
import { Text, TextInput, View, Button, ScrollView, StyleSheet, Alert, ImageBackground, Pressable, Image } from 'react-native';
import * as Backend from '../backlog';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
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
  const [image, setImage] = React.useState(null);
  const [isImage, setIsImage] = React.useState(false);
  console.log("Buenas, esta es la calle y el numero", latitud, longitud, idLocalidad, idDueno, calle, numero, localidad)

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
    <>
      <View style={styles.container}>
        <Text style={styles.titulos}>Nombre del Local</Text>
        <View style={styles.container2}>
          <TextInput
            style={styles.input}
            onChangeText={text => {
              setNombreLocal(text),
                setFaltaIngresoNombre(false)
            }}
            placeholder="Ingrese nombre del local"
          />
        </View>

        <Text style={styles.titulos}>Ubicación del Local</Text>
        <View style={styles.container2}>
          <TextInput
            style={styles.input}
            editable={false}
            placeholder={calle + ' ' + numero + ', ' + localidad}
            disabled={true}
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
              source={{ uri: image }}
              style={{ margin: 15, width: 350, height: 200, borderRadius: 12, }} />}

          <Pressable style={styles.botonImage} title="Cargar imagen" onPress={pickImage}>
            <Text style={styles.text}>Cargar Imagen</Text>
          </Pressable>

        </View>


        <Pressable onPress={() => {
          if (faltaIngresoNombre/*||faltaIngresoLoc*/) {
            Alert.alert('Complete los datos')
          } else {
            Backend.insertDomicilioSinPiso(calle, numero, idLocalidad)
              .then(() => {
                Backend.getUltimoDomicilio().then((items) => {
                  setIdDomicilio(items[0].id),
                    console.log(items[0].id),
                    Backend.insertLocal(nombreLocal, parseFloat(latitud), parseFloat(longitud), parseInt(idDueno), parseInt(items[0].id), image)
                      .then((items) => { });
                });
              })
            /*Backend.insertLocal(nombreLocal, parseFloat(latitud), parseFloat(longitud), parseInt(idDueno), parseInt(idDomicilio))
              .then((items) => { })*/
            goBack();
          }

        }}>
          <LinearGradient
            // Button Linear Gradient
            colors={['#C2454A', '#A32934', '#680008']}
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.button}>
            <Text style={styles.text}>DAR DE ALTA</Text>
          </LinearGradient>

        </Pressable>
      </View>
    </>
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
  input: {
    padding: 10,
    width: "80%",
    heigt: 10,
    marginTop: 10,
    alignItems: "center",
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
    fontSize: 25,
    fontWeight: "bold",
    marginLeft: 25,
    marginTop: 30
  },
  botones: {
    //width: 200,
  },
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
  botonImage: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 30,
    elevation: 3,
    width: '40%',
    alignItems: 'center',
  }
});