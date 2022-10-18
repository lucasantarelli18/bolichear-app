import * as React from 'react';
import { Text, View, Button, ScrollView, StyleSheet, Alert, Image, TextInput, Pressable, ImageBackground } from 'react-native';
import * as Backend from '../backlog';
import 'react-native-url-polyfill/auto';
//import MapView, { Marker, Polyline } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { RealtimeClient } from '@supabase/supabase-js';

export function UbicationScreen({ navigation }) {

  const [ubicacion, setUbicacion] = React.useState({
    calle:"Sarmiento",
    numero: 420,
    localidad: "La Plata",
    latitude: -34.904625,  
    longitude: -57.925738,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  });

  const [rango, setRango] = React.useState(0);

  const onPressMap = () => {
    navigation.navigate('MapScreen', {
      calle: ubicacion.calle,
      numero: ubicacion.numero,
      localidad: ubicacion.localidad,
      latitud: ubicacion.latitude,
      longitud: ubicacion.longitude,
      rango: rango,
    })
  };

  const onPressList = () => {
    navigation.navigate('Home', {
      calle: ubicacion.calle,
      numero: ubicacion.numero,
      localidad: ubicacion.localidad,
      latitud: ubicacion.latitude,
      longitud: ubicacion.longitude,
      rango: rango,
    })
  };



  return (
    //<ScrollView style={styles.scrollView} contentContainerStyle={{flexGrow: 1}}>
      <ImageBackground source={require('../assets/fondoBoliches2.jpg')} blurRadius={3} style={styles.container}>
        <View style={styles.container2}>

          

          <GooglePlacesAutocomplete
            placeholder='UTN, FRLP'
            fetchDetails={true}
            onPress={(data, details = null) => {
              //console.log(data, details);
              if (details.address_components[0].long_name == "AGN"){
                setUbicacion({
                calle: details.address_components[2].long_name,
                numero: details.address_components[1].long_name,
                localidad: details.address_components[3].long_name,
                latitude: details.geometry.location.lat,
                longitude: details.geometry.location.lng,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421
              })
              }else{
               setUbicacion({
                calle: details.address_components[1].long_name,
                numero: details.address_components[0].long_name,
                localidad: details.address_components[2].long_name,
                latitude: details.geometry.location.lat,
                longitude: details.geometry.location.lng,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421
              }) 
              }
              
            }}
            query={{
              key: process.env.GOOGLE_MAPS_KEY,
              language: 'es',
              components: "country:ar",
            }}
            styles={{
              container: {
                flex: 0,
              },
              textInputContainer: {
                height: 39,
                marginBottom: 8,
              },
              textInput: {
                borderWidth: 2,
                //borderColor: "white",
                height: 39,
                color: '#white',
                fontSize: 16,
                fontFamily: 'Roboto-Medium',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
              },
              poweredContainer: {
                justifyContent: 'center',
                alignItems: 'center',
                borderBottomRightRadius: 5,
                borderBottomLeftRadius: 5,
                borderColor: '#c8c7cc',
                borderTopWidth: 0.5,
                //placeholderTextColor: 'white',
              },
              loader: {
                flexDirection: 'row',
                justifyContent: 'center',
                height: 20,
              },
              row: {
                zIndex: 1,
                backgroundColor: '#FFFFFF',
                padding: 10,
                height: 40,
                flexDirection: 'row',
              },
              separator: {
                position: 'absolute',
                zIndex: 1,
                height: 0.2,
                backgroundColor: '#c8c7cc',
              },
            }}
          />
          <TextInput
            style={styles.input}
            //placeholderTextColor= 'white'
            placeholder="Rango de cobertura (mts)"
            onChangeText={nuevoRango => setRango(nuevoRango)}
            value={rango}
          />
          <View style={styles.container3}> 
          <Pressable style={styles.button} onPress={onPressMap}>
            <Text style={styles.text}>MAPA</Text>
          </Pressable>

          <Pressable style={styles.button} onPress={onPressList}>
            <Text style={styles.text}>LISTA</Text>
          </Pressable>
          </View>

        </View>
      </ImageBackground>
    //</ScrollView>
  );
}
const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  container2: {
    width: '65%',
    flexDirection: 'column',
    backgroundColor: '#fff',
    justifyContent: 'center',
    backgroundColor: 'rgba(200, 200, 200, 0)',
  },
  container3: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(200, 200, 200, 0)',
  },
  input: {
    borderWidth: 2,
    height: 39,
    fontSize: 16,
    marginBottom: 8,
    paddingLeft: 10,
    borderRadius: 4,
    fontFamily: 'Roboto-Medium',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',

  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
    width: '49%',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});
