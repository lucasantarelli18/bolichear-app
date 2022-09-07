import * as React from 'react';
import { Text, View, Button, ScrollView, StyleSheet, Alert } from 'react-native';
import * as Backend from '../backlog';
import 'react-native-url-polyfill/auto';

export function HomeScreen({navigation}) {

const [locales, setLocales] = React.useState([]);

  React.useEffect(() => {
    //Tomo provincias
    Backend.getLocales()
    .then((items) => {
      console.log(items)
      setLocales(items)
    })
  }, [])

  const list = () => {
    return locales.map((element) => {
      return (
        <View style={styles.boliches}>
          <View style={styles.boliches2}>
            <Text style={styles.titulos} key="{element.id}">{element.nombre}</Text>
            <Text style={styles.titulos} > 1km</Text>
          </View>
          
          <View style={styles.boliches2}>
            <View>
              <Text >Longitud: {element.longitud}</Text>
              <Text >Latitud: {element.latitud}</Text>
            </View>
            <View>
            
            <Button
              style={styles.botones}
              title="Ver info"
              onPress={() => { navigation.navigate('VerPromociones', {idLocal: element.id});}}
              />
            </View>
          </View>
        </View>
      );
    });
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text >Boliches cercanos...</Text>
      <View style={styles.container}>{list()}</View>
      <Button 
        title="Ir a Detalles"
        onPress={() => { navigation.navigate('Details', {
          itemId: 86,
          nombre: 'Pepe',
        });
      }}
      />
      <Button 
        title="Ir a Mi Local"
        onPress={() => { navigation.navigate('Locales');
      }}
      />
    </View>
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
});