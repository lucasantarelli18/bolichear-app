import * as React from 'react';
import { Text, TextInput, View, Button, ScrollView, StyleSheet, Alert, ImageBackground, Pressable, Image } from 'react-native';
import * as Backend from '../backlog';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Moment from 'moment';
import DropDownPicker from "react-native-dropdown-picker";



//import DropDownPicker from 'react-native-dropdown-picker';
//import Constants from 'expo-constants';

export function EditarEventoScreen({ route, navigation: { goBack } }) {

  const { nombre, descripcion, fechaHoraInicio, fechaHoraFin, id, imagen, idTipoEvento } = route.params;

  const [modificaNombre, setModificaNombre] = React.useState(false);
  const [modificaDescripcion, setModificaDescripcion] = React.useState(false);
  //const [modificaPrecio, setModificaPrecio] = React.useState(false);
  const [modificaFoto, setModificaFoto] = React.useState(false);
  const [modificaFechaInicio, setModificaFechaInicio] = React.useState(false);
  const [modificaFechaFin, setModificaFechaFin] = React.useState(false);
  const [modificaIdEvento, setModificaIdEvento] = React.useState(true);
  const [nombreEvento, setNombreEvento] = React.useState(nombre);
  const [descripcionEvento, setDescripcionEvento] = React.useState(descripcion);
  //const [precioEvento, setPrecioEvento] = React.useState(precio);
  const [fechaInicio, setFechaInicio] = React.useState(fechaHoraInicio);
  const [fechaFin, setFechaFin] = React.useState(fechaHoraFin);
  const [image, setImage] = React.useState(imagen);
  const [idEvento, setIdEvento] = React.useState(idTipoEvento);
  const [isImage, setIsImage] = React.useState(false);
  const [fechaYHoraIncioMuestra, setFechaYHoraIncioMuestra] = React.useState(false);
  const [fechaYHoraFinMuestra, setfechaYHoraFinMuestra] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(idTipoEvento);
  const [items, setItems] = React.useState([]);


  React.useEffect(() => {


    Backend.getTipoEventos().then((items) => {
      const arr = [];
      for (const i in items) {
        arr.push({ label: items[i].tipo, value: items[i].id });
      }
      console.log(arr);
      setItems(arr);
    });

  }, []);


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
      setModificaFoto(true);
      Backend.insertFoto(result.uri)
        .then((items) => { items })
    }
  };


  return (
    <>
      <ScrollView style={styles.container}>

        <Text style={styles.titulos}>Nombre del Evento</Text>
        <View style={styles.container2}>
          <TextInput
            style={styles.input}
            isRequired
            defaultValue={nombreEvento}
            onChangeText={(text) => {
              setNombreEvento(text),
                setModificaNombre(true)
            }}
            placeholder="Ingrese un nombre"
          />
        </View>

        <Text style={styles.titulos}>Tipo del Evento</Text>
        <View style={styles.container2}>
          <DropDownPicker
            defaultValue={value}
            setIdEvento={setIdEvento}
            setModificaIdEvento={true}
            style={styles.input2}
            open={open}
            value={value}
            setValue={setValue}
            items={items}
            setOpen={setOpen}
            setItems={setItems}
            placeholder="Tipo de evento"
          />
        </View>

        <Text style={styles.titulos}>Descripción del Evento</Text>
        <View style={styles.container2}>
          <TextInput
            style={styles.input}
            defaultValue={descripcionEvento}
            placeholder=" Descripción"
            onChangeText={(text) => {
              setDescripcionEvento(text),
                setModificaDescripcion(true)
            }}
          />
        </View>
      {/*    <Text style={styles.titulos}>Precio de la entrada</Text>
      <View style={styles.container2}>
         <TextInput
          style={styles.input}
          defaultValue={precioEvento}
          keyboardType="numeric"
          placeholder="Ingrese el precio"
          onChangeText={(text) => setPrecioEvento(text), setModificaPrecio(true)}
        /> 
      </View>  */}
        <Text style={styles.titulos}>Vigencia</Text>
        <View style={styles.container2}>
          <Pressable style={styles.buttonF} title="Inicio" onPress={showDateTimePicker}>
            <Text style={styles.text}>INICIO</Text>
          </Pressable>
          <Text style={{ fontSize: 16, fontWeight: "bold", marginVertical: 10 }}>
            {fechaInicio ? fechaInicio : "No selecciono la fecha inicio"}
          </Text>
          <DateTimePickerModal
            isVisible={fechaYHoraIncioMuestra}
            mode="datetime"
            defaultValue={fechaInicio}
            onConfirm={(datetime) => { hideDateTimePicker(), setFechaInicio(Moment(datetime).format('YYYY-MM-DD HH:mm:ss')), setModificaFechaInicio(true) }}
            onCancel={hideDateTimePicker}

          />

          <Pressable style={styles.buttonF} title="Fin" onPress={showDateTimePicker2}>
            <Text style={styles.text}>FIN</Text>
          </Pressable>
          <Text style={{ fontSize: 16, fontWeight: "bold", marginVertical: 10 }}>
            {fechaFin ? fechaFin : "No selecciono la fecha fin"}
          </Text>
          <DateTimePickerModal
            isVisible={fechaYHoraFinMuestra}
            mode="datetime"
            onConfirm={(datetime) => { hideDateTimePicker2(); setFechaFin(Moment(datetime).format('YYYY-MM-DD HH:mm:ss')), setModificaFechaFin(true) }}
            onCancel={hideDateTimePicker2}
          />

        </View>

        <Text style={styles.titulos}>Foto del evento</Text>
        <View style={styles.container2}>
          {image == null ?
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
          if (modificaNombre || modificaFoto || modificaDescripcion || modificaFechaFin || modificaFechaInicio || modificaIdEvento ) {
            console.log(id + " " + nombreEvento + " " + descripcionEvento + " " + fechaInicio + " " + fechaFin + ' ' + image)
            Backend.updateEvento(id, nombreEvento, descripcionEvento, fechaInicio, fechaFin, value, image)
              .then((items) => {
                //console.log(items)
                Alert.alert('Datos modificados con éxito!')
              });
            goBack();
            goBack();
          } else {
            Alert.alert('No se modificó ningún dato')
            goBack();
          }

        }}>
          <LinearGradient
            // Button Linear Gradient
            colors={['#C2454A', '#A32934', '#680008']}
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.button}>
            <Text style={styles.text}>GUARDAR CAMBIOS</Text>
          </LinearGradient>

        </Pressable>
      </ScrollView>

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
  text2: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'black',
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
});