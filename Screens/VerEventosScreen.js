import { Alert, StyleSheet, Button } from 'react-native';
import * as Backend from '../backlog';
import { SafeAreaView, FlatList, View, Text, Image, ScrollView, Dimensions, ImageBackground, Pressable, RefreshControl } from 'react-native';
import React, { useState, useEffect } from "react";
import Moment from 'moment';
import 'moment/locale/es';
import { Icon } from '@rneui/themed';
import { useNavigation, CommonActions, StackActions } from '@react-navigation/native';




export function VerEventosScreen({ route, navigation }) {
  const [eventos, setEventos] = React.useState([])
  const [promociones, setPromociones] = React.useState([]);
  const [locales, setLocales] = React.useState([]);
  const [cantEventos, setCantEventos] = React.useState([]);
  const [cantEventosActuales, setCantEventosActuales] = React.useState([]);
  const [cantPromos, setCantPromos] = React.useState([]);
  const [cant, setCant] = React.useState([]);
  const { idLocal, latitud, longitud } = route.params;
  const { width } = Dimensions.get('window')
  const idDueno = 5;
  const fecha=new Date();



  React.useEffect(() => {

    Backend.getEventosxIdLocal(idLocal)
      .then((items) => {
        setEventos(items)
        if (items.length > 0) {
          setCantEventos(true);
        } else {
          setCantEventos(false);
          sinEventos();
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

        }),

      Backend.getLocalesXUser(idDueno).then((items) => {
        setLocales(items);
        console.log("EL LOCAL QUE ESTAS BUSCANDO ES ESTE: ", items)
        if (items.length > 0) {

          setCant(true);
        } else {
          setCant(false);
        }
      })

  }, [])


  // inicializo los vectores de data 
  const dataEventos = [];
  const dataPromos = [];

  // Mapeo y agrego los eventos y promos a dataEventos y dataPromos
  eventos.map((element) => {
    console.log(element)
    if (idLocal == element.idLocal) {
      const fechaHoraInicio = Moment(element.fechaHoraInicio).format('DD/MM/YYYY [a las] HH:mm ');
      const fechaHoraFin = Moment(element.fechaHoraFin).format('DD/MM/YYYY [a las] HH:mm ');
      //console.log(element)
      dataEventos.push(
        {
          id: element.id,
          idLocal: element.idLocal,
          title: element.nombre,
          description: element.descripcion,
          image: { uri: element.path },
          fechaInicio: fechaHoraInicio,
          fechaFin: fechaHoraFin,
          idTipoEvento: element.idTipoEvento
        }
      )
    }
  });


  promociones.map((element) => {
    if (idLocal == element.idLocal) {
      const fechaHoraInicio = Moment(element.fechaHoraInicio).format('DD/MM/YYYY [a las] HH:mm ');
      const fechaHoraFin = Moment(element.fechaHoraFin).format('DD/MM/YYYY [a las] HH:mm ');
      //console.log(element)
      dataPromos.push(
        {
          id: element.id,
          idLocal: element.idLocal,
          title: element.nombre,
          description: element.descripcion,
          image: { uri: element.idPromocion },
          fechaInicio: fechaHoraInicio,
          fechaFin: fechaHoraFin
        }
      )
    }
  });

  const localDueño = [];

  if (cant) {
    locales.map((element) => {
      console.log("id local del dueño 5", element.id)
      localDueño.push(element.id)
    })
  } else {
    localDueño.push(0)
  }
/* 
  const evento = () =>{
    eventos.map((item) =>{
      return (
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
          {item.idLocal == localDueño[0] ?
            <View style={{ alignItems: 'center' }}>
              <Pressable
                style={styles.button2}
                onPress={() => Alert.alert(
                  "Eliminar",
                  "¿Desea eliminar el evento?",
                  [
                    {
                      text: "Cancelar",
                      onPress: () => console.log("Cancel Pressed"),
                      style: "cancel"
                    },
                    {
                      text: "Aceptar",
                      onPress: () => Backend.deleteEvento(item.id).then((items) => Alert.alert("Evento eliminado con éxito"), navigation.dispatch({
                        ...StackActions.replace('VerEventos', {
                          idLocal: idLocal, latitud: latitud, longitud: longitud
                        }),
                        source: route.key,
                        target: navigation.getState().key,
  
                      })
  
                      )
                    }
  
  
                  ]
                )}
              >
                <Text style={styles.titleButton}>Eliminar</Text>
              </Pressable>
            </View>
            :
            console.log(fecha)
          }
  
        </SafeAreaView>
     
      );
    })
    
  } */
  const sinEventos = () => {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
          <View>
            <Text style={{
              width: 200, textAlign: 'center', fontWeight: "bold",
              fontSize: 25,
              margin: 5
            }}>Eventos</Text>
          </View>
          <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
        </View>
        <View style={{ width: "100%", justifyContent: 'center', alignItems: 'center', marginBottom: 15, marginTop: 15 }}>
          <Image style={{ height: 150, width: 110, marginBottom: 15 }} source={require("../assets/logo2.png")} />
          <Text style={{ fontFamily: 'sans-serif', fontStyle: 'italic', fontSize: 25, fontWeight: 'bold', textAlign: 'center' }}>
            No hay eventos próximos
          </Text>
        </View>
        {idLocal == localDueño[0] ?
          <Pressable
            style={styles.button}
            onPress={() => {
              navigation.navigate("Eventos", {
                idLocal: idLocal
              });
            }}
          >
            <Text style={styles.text}>NUEVO EVENTO</Text>
          </Pressable>
          :
          console.log('bien')
        }
      </View>

    );
  }

  //console.log("DUEÑOOOOOO", localDueño[0])
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
            const dia = item.fechaFin.substring(0,2)
            const mes = item.fechaFin.substring(3,5)
            const anio = item.fechaFin.substring(6,10)
            const FechaFin = anio + '-'+ mes +'-'+dia
            const hora = item.fechaFin.substring(17,19)
            const mins = item.fechaFin.substring(20,22)
            const seg = '00'
            const horaFin = hora +':'+mins+':'+seg
            const fechaYHoraFinal= FechaFin + ' '+horaFin 

            if((new Date(FechaFin)) >= fecha){
              //console.log('EVENTO',item.idTipoEvento)
              return (
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
                  {item.idLocal == localDueño[0] ?
                    <View style={{ alignItems: 'center' }}>
                      <Pressable
                        style={styles.button2}
                        onPress={() => Alert.alert(
                          "Eliminar",
                          "¿Desea eliminar el evento?",
                          [
                            {
                              text: "Cancelar",
                              onPress: () => console.log("Cancel Pressed"),
                              style: "cancel"
                            },
                            {
                              text: "Aceptar",
                              onPress: () => Backend.deleteEvento(item.id).then((items) => Alert.alert("Evento eliminado con éxito"), navigation.dispatch({
                                ...StackActions.replace('VerEventos', {
                                  idLocal: idLocal, latitud: latitud, longitud: longitud
                                }),
                                source: route.key,
                                target: navigation.getState().key,
          
                              })
          
                              )
                            }
          
          
                          ]
                        )}
                      >
                        <Text style={styles.titleButton}>Eliminar</Text>
                      </Pressable>
                      <Pressable
                        style={styles.button2}
                        onPress={() =>
                          {
                            navigation.navigate("EditarEvento", {
                              nombre: item.title,
                              descripcion: item.description,
                              fechaHoraInicio: fechaYHoraFinal,
                              fechaHoraFin: fechaYHoraFinal,
                              id: item.id,
                              imagen: item.image,
                              idEvento: item.idTipoEvento
                          

                            });
                            }}
                      >
                        <Text style={styles.titleButton}>Editar</Text>
                      </Pressable>
                    </View>
                    :
                    console.log(fecha)
                  }
          
                </SafeAreaView>
             
              );
            }else{
        
              if((new Date(FechaFin)) < fecha){
                return (
                  <SafeAreaView style={{
                    backgroundColor: "#e8ded3",
                    width: width * 0.8 - 20,
                    marginHorizontal: 10,
                    paddingBottom: 20,
                    borderRadius: 12,
                    opacity: 0.35,
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
                    {item.idLocal == localDueño[0] ?
                      <View style={{ alignItems: 'center' }}>
                        <Pressable
                          style={styles.button2}
                          onPress={() => Alert.alert(
                            "Eliminar",
                            "¿Desea eliminar el evento?",
                            [
                              {
                                text: "Cancelar",
                                onPress: () => console.log("Cancel Pressed"),
                                style: "cancel"
                              },
                              {
                                text: "Aceptar",
                                onPress: () => Backend.deleteEvento(item.id).then((items) => Alert.alert("Evento eliminado con éxito"), navigation.dispatch({
                                  ...StackActions.replace('VerEventos', {
                                    idLocal: idLocal, latitud: latitud, longitud: longitud
                                  }),
                                  source: route.key,
                                  target: navigation.getState().key,
            
                                })
            
                                )
                              }
            
            
                            ]
                          )}
                        >
                          <Text style={styles.titleButton}>Eliminar</Text>
                        </Pressable>
                        <Pressable
                        style={styles.button2}
                        onPress={() =>
                        
                          {
                            navigation.navigate("EditarEvento", {
                              nombre: item.title,
                              descripcion: item.description,
                              fechaHoraInicio: fechaYHoraFinal,
                              fechaHoraFin: fechaYHoraFinal,
                              id: item.id,
                              imagen: item.image,
                              idTipoEvento: item.idTipoEvento

                            });
                            }}
                      >
                        <Text style={styles.titleButton}>Editar</Text>
                      </Pressable>
                      </View>
                      :
                      console.log(fecha)
                    }
            
                  </SafeAreaView>
               
                );
              }
              
            }
            
         
          }
  
        }/>
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
            const dia = item.fechaFin.substring(0,2)
            const mes = item.fechaFin.substring(3,5)
            const anio = item.fechaFin.substring(6,10)
            const FechaFin = anio + '-'+ mes +'-'+dia
            //console.log(new Date(FechaFin), fecha)
            if((new Date(FechaFin)) >= fecha){
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
                {item.idLocal == localDueño[0] ?
                  <View style={{ alignItems: 'center' }}>
                    <Pressable
                      style={styles.button2}
                      onPress={() => Alert.alert(
                        "Eliminar",
                        "¿Desea eliminar la promoción?",
                        [
                          {
                            text: "Cancelar",
                            onPress: () => console.log("Cancel Pressed"),
                            style: "cancel"
                          },
                          {
                            text: "Aceptar",
                            onPress: () => Backend.deletePromocion(item.id).then((items) => Alert.alert("Promoción eliminada con éxito"), navigation.dispatch({
                              ...StackActions.replace('VerEventos', {
                                idLocal: idLocal, latitud: latitud, longitud: longitud
                              }),
                              source: route.key,
                              target: navigation.getState().key,

                            }))
                          }


                        ]
                      )}
                    >
                      <Text style={styles.titleButton}>Eliminar</Text>
                    </Pressable>
                  </View>
                  :
                  console.log('bien')
                }
              </SafeAreaView>
            );}else{
              console.log(new Date(FechaFin), fecha)
              if((new Date(FechaFin)) < fecha){
              return (
                console.log(item),
                <SafeAreaView style={{
                  backgroundColor: "#e8ded3",
                  width: width * 0.8 - 20,
                  marginHorizontal: 10,
                  paddingBottom: 20,
                  borderRadius: 12,
                  opacity:0.35,
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
                  {item.idLocal == localDueño[0] ?
                    <View style={{ alignItems: 'center' }}>
                      <Pressable
                        style={styles.button2}
                        onPress={() => Alert.alert(
                          "Eliminar",
                          "¿Desea eliminar la promoción?",
                          [
                            {
                              text: "Cancelar",
                              onPress: () => console.log("Cancel Pressed"),
                              style: "cancel"
                            },
                            {
                              text: "Aceptar",
                              onPress: () => Backend.deletePromocion(item.id).then((items) => Alert.alert("Promoción eliminada con éxito"), navigation.dispatch({
                                ...StackActions.replace('VerEventos', {
                                  idLocal: idLocal, latitud: latitud, longitud: longitud
                                }),
                                source: route.key,
                                target: navigation.getState().key,
  
                              }))
                            }
  
  
                          ]
                        )}
                      >
                        <Text style={styles.titleButton}>Eliminar</Text>
                      </Pressable>
                    </View>
                    :
                    console.log('bien')
                  }
                </SafeAreaView>
              );}
              
            }
          }
          } />
      </View >
    )
  }

  const sinPromos = () => {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
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

        <View style={{ width: "100%", justifyContent: 'center', alignItems: 'center', marginBottom: 15, marginTop: 15 }}>
          <Image style={{ height: 150, width: 110, marginBottom: 15 }} source={require("../assets/logo2.png")} />
          <Text style={{ fontFamily: 'sans-serif', fontStyle: 'italic', fontSize: 25, fontWeight: 'bold', textAlign: 'center' }}>
            No hay promociones vigentes
          </Text>
        </View>

        {idLocal == localDueño[0] ?
          <Pressable
            style={styles.button}
            onPress={() => {
              navigation.navigate("Promociones", {
                idLocal: idLocal
              });
            }}
          >
            <Text style={styles.text}>NUEVA PROMOCION</Text>
          </Pressable>
          :
          console.log('bien')
        }
      </View>

    );
  }
  if (cantPromos || cantEventos) {
    return (
      <View>
        <ScrollView>
          {cantPromos ?
            <View>
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
            </View> :
            <View>
              <ScrollView>
                <View>{sinPromos()}</View>
              </ScrollView>
            </View>
          }
          {cantEventos ?
            <View>
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
            </View> :
            <View>
              <ScrollView>
                <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
                <View>{sinEventos()}</View>
              </ScrollView>
            </View>
          }
        </ScrollView>
      </View>
    );
  }
  else {

    return (
      <View>
        <ScrollView>
          <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
          <View>{sinPromos()}</View>
          <View>{sinEventos()}</View>
        </ScrollView>
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
    paddingHorizontal: 32,
    borderRadius: 30,
    elevation: 3,
    backgroundColor: "#ebe6d9",
    marginVertical: 10,
  },
  button2: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 30,
    elevation: 3,
    backgroundColor: "#a73d4c",
    marginVertical: 10,
    width: "50%"
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
  text: {
    fontSize: 15,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "black",
    textAlign: "center",
  },
  deshabilitar:{
      opacity: 0.5,
    
  }
});