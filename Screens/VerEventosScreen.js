import {Alert, StyleSheet, Button} from 'react-native';
import * as Backend from '../backlog';
import { View, Text, Image, ScrollView, Dimensions, ImageBackground } from 'react-native';
import React, { useState } from "react";
import {  Card } from 'react-native-elements';
import Moment from 'moment';
import 'moment/locale/es';

export function VerEventosScreen({ route, navigation }) {
  const [eventos, setEventos] = React.useState([])
  const [cant, setCant] = React.useState([]);

  const { idLocal } = route.params;

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

    const list = () => {
              
      return eventos.map((element) => {
          if(idLocal == element.idLocal){
              const fechaHoraInicio = Moment(element.fechaHoraInicio).format('DD/MM/YYYY [a las] HH:mm ');
              const fechaHoraFin = Moment(element.fechaHoraFin).format('DD/MM/YYYY [a las] HH:mm ');

          return(

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
          
          );
          }
      
      });
  }

  return (
    <>
      {cant ? (
        //Tiene Eventos
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <ScrollView>
                
                <View >{list()}</View>
              
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
    },
  descriptionText: {
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

});