import { Alert, StyleSheet, Button } from 'react-native';
import * as Backend from '../backlog';
import { SafeAreaView, FlatList, View, Text, Image, ScrollView, Dimensions, ImageBackground, Pressable, RefreshControl} from 'react-native';
import React, { useState, useEffect } from "react";
import Moment from 'moment';
import 'moment/locale/es';
import {Icon } from '@rneui/themed';


export function VerEventosScreen({ route, navigation }) {
  const [eventos, setEventos] = React.useState([])
  const [promociones, setPromociones] = React.useState([]);

  const [cantEventos, setCantEventos] = React.useState([]);
  const [cantPromos, setCantPromos] = React.useState([]);
  const { idLocal } = route.params;
  const { width } = Dimensions.get('window')
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh =  React.useEffect(() => {
    setRefreshing(false);
    Backend.getEventosxIdLocal(idLocal)
      .then((items) => {
        setEventos(items)
        if (items.length > 0) {
          setCantEventos(true);
        } else {
          setCantEventos(false);
        }
        console.log(items.length)

      }),
      Backend.getPromosxIdLocal(idLocal)
        .then((items) => {
          setPromociones(items)
          if (items.length > 0) {
            setCantPromos(true);
          } else {
            setCantPromos(false);
          }
          console.log(items.length)

        })
        

  }, [])

  // inicializo los vectores de data 
  const dataEventos = [];
  const dataPromos = [];

  // Mapeo y agrego los eventos y promos a dataEventos y dataPromos
  eventos.map((element) => {
    if (idLocal == element.idLocal) {
      const fechaHoraInicio = Moment(element.fechaHoraInicio).format('DD/MM/YYYY [a las] HH:mm ');
      const fechaHoraFin = Moment(element.fechaHoraFin).format('DD/MM/YYYY [a las] HH:mm ');
      console.log(element)
      dataEventos.push(
        {
          id: element.id,
          title: element.nombre,
          description: element.descripcion,
          image: { uri: element.path },
          fechaInicio: fechaHoraInicio,
          fechaFin: fechaHoraFin
        }
      )
    }
  });

  promociones.map((element) => {
    if (idLocal == element.idLocal) {
      const fechaHoraInicio = Moment(element.fechaHoraInicio).format('DD/MM/YYYY [a las] HH:mm ');
      const fechaHoraFin = Moment(element.fechaHoraFin).format('DD/MM/YYYY [a las] HH:mm ');
      console.log(element)
      dataPromos.push(
        {
          id: element.id,
          title: element.nombre,
          description: element.descripcion,
          image: { uri: element.idPromocion },
          fechaInicio: fechaHoraInicio,
          fechaFin: fechaHoraFin
        }
      )
    }
  });

  // Creo constantes para mostrar el FlatList en la pantalla
  const flatlistEventos = () => {
    return (
      <View>
        <FlatList
          data={dataEventos}
          keyExtractor={(item) => String(item)}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          horizontal
          snapToAlignment={'start'}
          scrollEventThrottle={16}
          decelerationRate='fast'
          style={{ marginBottom: 20 }}
          renderItem={({ item }) => {
            return (
              console.log(item),
              <SafeAreaView style={{
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
                <Pressable
                  style={styles.button}
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
                          onPress: () => Backend.deleteEvento(item.id).then((items) => Alert.alert("Evento eliminado con éxito"), navigation.reset({
                          
                            routes: [
                              {
                                name: 'VerEventos',
                                params: {idLocal: idLocal}
                              },
                            ],
                          }))
                          }
                          

                        ]
                  )}

                          
                >
                  <Text style={styles.titleButton}>Eliminar</Text>
                  </Pressable>
              </SafeAreaView>
            );
          }
          } />
      </View >
    )
  }

  const flatlistPromos = () => {
    return (
      <View>
        <FlatList
          data={dataPromos}
          keyExtractor={(item) => String(item)}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          horizontal
          snapToAlignment={'start'}
          scrollEventThrottle={16}
          decelerationRate='fast'
          style={{ marginBottom: 20 }}
          renderItem={({ item }) => {
            return (
              console.log(item),
              <SafeAreaView style={{
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
                <Pressable
                  style={styles.button}
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
                          onPress: () => Backend.deleteEvento(item.id).then((items) => Alert.alert("Evento eliminado con éxito"), navigation.reset({
                          
                            routes: [
                              {
                                name: 'VerEventos',
                                params: {idLocal: idLocal}
                              },
                            ],
                          }))
                          }
                          

                        ]
                  )}

                          
                >
                  <Text style={styles.titleButton}>Eliminar</Text>
                  </Pressable>
              </SafeAreaView>
            );
          }
          } />
      </View >
    )
  }
  if (cantEventos || cantPromos) {
      return(
        <View>
        <ScrollView>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
          <View>
            <Text style={{
              width: 200, textAlign: 'center', fontWeight: "bold",
              fontSize: 25,
              margin: 5
            }}>Promociones</Text>
          </View>

          <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
        </View>
        <View>{flatlistPromos()}</View>
          <View >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
              <View>
                <Text style={{
                  width: 150, textAlign: 'center', fontWeight: "bold",
                  fontSize: 25,
                  margin: 5
                }}>Eventos</Text>
              </View>
              <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
            </View>
            {flatlistEventos()}
          </View>
      </ScrollView>
      </View>
    );
  

  } else {
    return (
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
         
    );
  }
    
      

  
  


          
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
  },
  titulo: {
    fontWeight: "bold",
    fontSize: 25,
    margin: 5
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
 
  },
  titulos: {
    fontSize: 19,
    textTransform: "uppercase",
    fontWeight: "bold",
    fontFamily: "Roboto-Medium",
  },
  titleButton: {
    fontSize: 15,
    fontWeight: "bold",
    color: "white"
},
});