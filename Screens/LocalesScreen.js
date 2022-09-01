import * as React from 'react';
import { Text, View, Button, ScrollView, StyleSheet, Alert } from 'react-native';
import * as Backend from '../backlog';
//import SearchableDropdown from 'react-native-searchable-dropdown';

export function LocalesScreen({ navigation }) {
  const [provincias, setProvincias] = React.useState([]);
  const [provinciaSeleccionada, setProvinciaSeleccionada] = React.useState([]);
  const [locales, setLocales] = React.useState([]);
  const [cant, setCant] = React.useState([]); 
  React.useEffect(() => {
    //Tomo los locales del user
    Backend.getLocalesXUser(1)
    .then((items) => {
      setLocales(items)
      if (items.length > 0) {
        setCant(true)
      } else {
        setCant(false)
      }
      
    })
    Backend.getProvincias()
    .then((items) => {
      setProvincias(items)
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
              onPress={() => Alert.alert('Proximamente')}
              />
            </View>
          </View>
        </View>
      );
    });
  };


  return (
    <>
    {cant ? (
    //Tiene locales
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Locales Screen</Text>
      <View style={styles.container}>{list()}</View>
    </View>
      
    ) : (
    //No tiene locales
    <>

      <Text>Alta de locales</Text>
 
        </>
    )
    }
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
});