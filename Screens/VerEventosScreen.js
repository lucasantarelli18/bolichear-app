import { Alert, StyleSheet, Button } from 'react-native';
import * as Backend from '../backlog';
import { SafeAreaView, FlatList, View, Text, Image, ScrollView, Dimensions, ImageBackground } from 'react-native';
import React, { useState } from "react";
import { Card } from 'react-native-elements';
import Moment from 'moment';
import 'moment/locale/es';

export function VerEventosScreen({ route, navigation }) {
  const [eventos, setEventos] = React.useState([])
  const [cant, setCant] = React.useState([]);

  const { idLocal } = route.params;

  const { width } = Dimensions.get('window')

  React.useEffect(() => {
    Backend.getEventosxIdLocal(idLocal)
      .then((items) => {
        setEventos(items)
        if (items.length > 0) {
          setCant(true);
        } else {
          setCant(false);
        }
        console.log(items.length)

      })
  }, [])

  const data = [
    /*{
      id: '1',
      title: ' Duki you know',
      description: ' toca el duko en rox',
      image: require('../assets/fondoBoliches.jpg')
    },
    {
      id: '2',
      title: 'Emilia mernes',
      description: ' toca el duko en rox',
      image: require('../assets/fondoBoliches2.jpg')
    },
    {
      id: '3',
      title: ' FireDJ',
      description: ' toca el duko en rox',
      image: require('../assets/fondoBoliches3.jpg')
    },
    {
      id: '4',
      title: ' Duki you know',
      description: ' toca el duko en rox',
      image: require('../assets/fondoBoliches.jpg')
    }*/
  ];

  /*const list = () => {

    return 
  }*/

  eventos.map((element) => {
    if (idLocal == element.idLocal) {
      const fechaHoraInicio = Moment(element.fechaHoraInicio).format('DD/MM/YYYY [a las] HH:mm ');
      const fechaHoraFin = Moment(element.fechaHoraFin).format('DD/MM/YYYY [a las] HH:mm ');
      console.log(element)
      data.push(
        {
          id: element.id,
          title: element.nombre,
          description: element.descripcion,
          image: { uri: element.path },
          fechaInicio: fechaHoraInicio,
          fechaFin: fechaHoraFin
        }
      )
      /*return (

        <Card style={styles.card}>
          <Image
            source={{ uri: element.path }}
            style={{ width: 350, height: 200 }}
          />
          <Text style={styles.titleText}>{element.nombre}</Text>
          <Text style={styles.descriptionText}>
            {element.descripcion}
          </Text>
          <Text>
            Vigente desde el {fechaHoraInicio}
            hasta {fechaHoraFin}
          </Text>
        </Card>

      );*/
    }

  });



  const flatlist = () => {
    return (
      <View>
        <FlatList
          data={data}
          keyExtractor={(item) => String(item)}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          horizontal
          snapToAlignment={'start'}
          scrollEventThrottle={16}
          decelerationRate='fast'
          style={{ marginTop: 20 }}
          renderItem={({ item }) => {
            return (
              console.log(item),
              <SafeAreaView style={{
                elevation: 10,
                backgroundColor: "#e8ded3",
                width: width * 0.8 - 20,
                marginHorizontal: 10,
                paddingBottom: 20,
                borderRadius: 12,
              }}>
                <Image
                  source={item.image}
                  style={{ margin: "2%", width: "96%", height: 200, borderRadius: 12 }}
                />
                <Text style={styles.titleText}>{item.title}</Text>
                <Text style={styles.descriptionText}>
                  {item.description}
                </Text>
                <Text style={styles.fechaText}>
                  Vigente desde el {item.fechaInicio}
                  Hasta el {item.fechaFin}
                </Text>
              </SafeAreaView>
            );
          }
          } />
      </View >
    )
  }

  return (
    <>
      {cant ? (
        //Tiene Eventos
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ScrollView>
            <View >{flatlist()}</View>
          </ScrollView>
        </View>
      ) : (
        //No tiene locales
        <>
          <Text style={styles.titulos}>
            No hay eventos próximos
          </Text>
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({

  titleText: {
    fontSize: 20,
    fontWeight: "bold",
    paddingStart: 10,
  },
  descriptionText: {
    paddingStart: 10,
    fontSize: 15,
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    backgroundColor: '#A1A1A1',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: "space-between",
  },
  container2: {
    width: '90%',
    height: '100%',
    backgroundColor: '#fff',
    paddingVertical: 110
  },
  fechaText: {
    paddingStart: 10,
  }
});