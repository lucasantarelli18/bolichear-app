import * as React from 'react';
import * as Backend from '../backlog';
import { Text, View, Button, ScrollView, StyleSheet, Alert, Image, TextInput, Pressable, ImageBackground } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import MapView, { Callout, Marker, Polyline } from 'react-native-maps';

export function MapScreen({ route, navigation }) {
  const [locales, setLocales] = React.useState([]);

  const { calle, numero, localidad, latitud, longitud, rango } = route.params;

  const [origin, setOrigin] = React.useState({
    latitude: route.params.latitud,
    longitude: route.params.longitud,
  });

  const [destination, setdestination] = React.useState({
    latitude: -34.924941,
    longitude: -57.967533,
  });

  const [idLocalidad, setIdLocalidad] = React.useState([]);

  React.useEffect(() => {
    Backend.getLocalxDomicilio()
      .then((items) => {
        //console.log(items)

        const arr = [];
        for (const i in items) {
          const latMts = parseFloat(items[i].latitud) * 111120 - latitud * 111120;
          const lonMts =
            parseFloat(items[i].longitud) * 111100 - longitud * 111100;
          const val = Math.pow(latMts, 2) + Math.pow(lonMts, 2);
          const dist = Math.sqrt(val);
          const distkm = (dist / 1000).toFixed(2);

          if (dist < rango) {
            //console.log("dentro del rango")
            console.log(items[i].dist = distkm)
            arr.push(items[i])
          } else {
            //console.log("fuera del rango")
          }
        }
        setLocales(arr)
      })
    Backend.getLocalidadXNombre(localidad).then((items) => {
      setIdLocalidad(items[0].id);
    })

  }, [])


  const filtradoLocales = (query) => {
    const arr = [[]];
    return query.map((i) => { });
  };
  const list = () => {
    return locales.map((element) => {
      return (
        <Marker tappable tooltip
        pinColor='gold'
          coordinate={{ latitude: element.latitud, longitude: element.longitud, }}>

          
          <Callout style={styles.cal} onPress={() =>
            navigation.navigate("VerPromociones", {
              idLocal: element.id,
            })
          }>
            <View style={styles.bubble}>
              <Text style={styles.name}>{element.nombre}</Text>
            </View>
          </Callout>


        </Marker>
      );
    });
  };

  return (
    <MapView style={styles.map}
      initialRegion={{
        latitude: origin.latitude,
        longitude: origin.longitude,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02
      }}
      showsUserLocation={true}
    >
      <Marker
        draggable={true}
        title='TU'
        coordinate={origin}
        onDragEnd={(direction) => setOrigin(direction.nativeEvent.coordinate)}
        pinColor={'pink'}
      />

      {list()}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
    width: '100%',
    height: '100%'
  },
  cal: {
    //backgroundColor: '#111',
  },
  pin: {
    width: 30,
    height: 30
  },
  name: {
    fontSize: 16,
    //marginBottom: 5,
  },
  bubble: {
    flex: 1,
    flexDirection: 'column',
    //alignSelf: 'flex-start',
    backgroundColor: '#fff',
    //borderRadius: 6,
    //borderColor: '#ccc',
    //borderWidth: 0.5,
    //padding: 10,
    width: 100,
  },
  image: {
    width: 120,
    height: 80,
  },
  button2: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 4,
    backgroundColor: "black",
    marginVertical: 2,
  },
});