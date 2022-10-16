import * as Backend from '../backlog';
import { View, Image, ScrollView, Pressable, Alert, StyleSheet,TouchableOpacity} from 'react-native';
import React, { useState } from "react";
import { Text, Card, Button, Icon } from '@rneui/themed';
import Moment from 'moment';
import 'moment/locale/es';

export function VerEventosScreen({ route, navigation }) {
  const [eventos, setEventos] = React.useState([])
  const [cant, setCant] = React.useState([]);

  const { idLocal, latitud, longitud } = route.params;

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
                      Vigente desde el {fechaHoraInicio} hasta {fechaHoraFin}
                  </Text>
                  <Button
                  icon={
                    <Icon
                      name="delete"
                      color="#ffffff"
                      iconStyle={{ marginRight: 10 }}
                    />
                  }
                  buttonStyle={{
                    backgroundColor: 'black',
                    borderRadius: 0,
                    marginRight: 10,
                    marginBottom: 0
                  }} 
                  onPress={()=>Alert.alert(
                        "Eliminar",
                        "¿Desea eliminar el evento?",
                        [
                          {
                            text: "Cancelar",
                            onPress: () => console.log("Cancel Pressed"),
                            style: "cancel"
                          },
                          { text: "Aceptar", 
                          onPress: () =>Backend.deleteEvento(element.id).then((items) => Alert.alert("Evento eliminado con éxito",navigation.navigate("VerEventos", {
                            idLocal: element.id,
                        }))), }
                        ]
                  )}

                  title='Eliminar'
                          
                />
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
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={styles.titulos}>
              No hay eventos próximos
          </Text>
          <Pressable
              style={styles.button}
              onPress={() => {
                navigation.navigate("Eventos", {
                  idLocal: idLocal,
                  latitud: latitud,
                  longitud: longitud,
                });
              }}
            >
              <Text style={styles.titleButton}>NUEVO EVENTO</Text>
            </Pressable>
        </View>
          
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
  titleButton: {
      fontSize: 15,
      fontWeight: "bold",
      color: "white"
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
    button: {
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 12,
      paddingHorizontal: 5,
      borderRadius: 4,
      elevation: 3,
      backgroundColor: "black",
      marginVertical: 20,
      width: "50%",
    },
    titulos: {
      fontSize: 19,
      textTransform: "uppercase",
      fontWeight: "bold",
      fontFamily: "Roboto-Medium",
    },

});