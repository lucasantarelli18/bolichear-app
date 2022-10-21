import * as React from 'react';
import { Text, View, Button, ScrollView, StyleSheet, Alert, Image, TextInput, Pressable, ImageBackground } from 'react-native';
import * as Backend from '../backlog';
import 'react-native-url-polyfill/auto';
//import MapView, { Marker, Polyline } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { RealtimeClient } from '@supabase/supabase-js';
import { Slider } from "@miblanchard/react-native-slider";
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';

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
    <View style={styles.container}>

      <View style={{ width: "60%", flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 40 }}>
        <Text style={{ fontSize: 40, fontWeight: 'bold' }}>
          Ingresa tu UBICACIÓN
        </Text>
        <Image style={{ height: 150, width: 112.5 }} source={require("../assets/logo2.png")} />
      </View>

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
              padding: 10,
              width: "80%",
              heigt: 10,
              borderRadius: 30,
              backgroundColor: '#f1f1f1',
              fontFamily: "Roboto-Medium",
              paddingStart: 30,
              fontSize: 16,
              elevation: 10,
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
        <View style={{ justifyContent: 'center' }}>
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
          /></View>

        <Pressable onPress={onPressMap}>
          <LinearGradient
            // Button Linear Gradient
            colors={['#C2454A', '#A32934', '#680008']}
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.button}>
            <Text style={styles.text}>BUSCAR</Text>
          </LinearGradient>
        </Pressable>
        <StatusBar style="white" />

      </View>
    </View>
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
    backgroundColor: '#eff0e2',
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
    borderRadius: 30,
    elevation: 3,
    backgroundColor: 'black',
    width: '80%',
    marginStart: "10%",
    marginTop: 50
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
