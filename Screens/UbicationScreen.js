import * as React from 'react';
import { Text, View, Button, ScrollView, StyleSheet, Alert, Image, TextInput, Pressable, ImageBackground } from 'react-native';
import * as Backend from '../backlog';
import 'react-native-url-polyfill/auto';
//import MapView, { Marker, Polyline } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { RealtimeClient } from '@supabase/supabase-js';
import { Slider } from "@miblanchard/react-native-slider";

export function UbicationScreen({ navigation }) {

  const [ubicacion, setUbicacion] = React.useState({
    calle: "Sarmiento",
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
      rango: rango * 1000, //rango*1000 pq rango esta en km y lo pasa a mts
    })
  };

  const onPressList = () => {
    navigation.navigate('Home', {
      calle: ubicacion.calle,
      numero: ubicacion.numero,
      localidad: ubicacion.localidad,
      latitud: ubicacion.latitude,
      longitud: ubicacion.longitude,
      rango: rango * 1000,
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
            if (details.address_components[0].long_name == "AGN") {
              setUbicacion({
                calle: details.address_components[2].long_name,
                numero: details.address_components[1].long_name,
                localidad: details.address_components[3].long_name,
                latitude: details.geometry.location.lat,
                longitude: details.geometry.location.lng,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421
              })
            } else {
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
        <Text style={{ position: 'absolute', right: 0, fontSize: 20, fontWeight: 'bold' }}>{rango} km</Text>
        <Slider
          containerStyle={{ width: '75%', marginVertical: 10 }}
          value={rango}
          minimumValue={0}
          maximumValue={50}
          minimumTrackTintColor='#641c34'
          step={1}
          onValueChange={value => setRango(value)}
          thumbStyle={styles.thumb}
          trackStyle={styles.track}
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
    width: '80%',
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
  thumb: {
    backgroundColor: '#000',
    borderRadius: 30,
    borderWidth: 10,
    height: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.35,
    shadowRadius: 2,
    width: 25,
  },
  track: {
    backgroundColor: '#d0d0d0',
    borderRadius: 5,
    height: 5,
  },
});
