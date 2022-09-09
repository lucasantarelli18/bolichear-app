import {Alert, StyleSheet} from 'react-native';
import * as Backend from '../backlog';
import { View, Text, Image, ScrollView, Dimensions } from 'react-native';
import React, { useState } from "react";
import {  Card } from 'react-native-elements';
import Moment from 'moment';
import 'moment/locale/es';


export function VerPromocionesScreen({route, navigation}) {
    
    const [promociones, setPromociones] = React.useState([]);
    const [promocionXLocal, setPromocionXLocal] = React.useState([]);
    const [image, setImage] = useState(null);
    const [cant, setCant] = React.useState([]); 
    const { idLocal } = route.params;

    console.log(idLocal)

    React.useEffect(() => {
        Backend.getPromociones()
        .then((items) => {
          setPromociones(items)
          
              promociones.map((element) =>{
                if(element.idLocal == idLocal){
                    if (items.length > 0) {
                    console.log(element.idLocal, idLocal)
                    setCant(true)
                  } else {
                      console.log(idLocal)
                    setCant(false)
                  }}
              })
              
            
          
        }),
        Backend.getFotos()
        .then((items) => {
            //console.log(items)
            setImage(items)
        })
        }, [])

    const list = () => {
              
        return promociones.map((element) => {
            if(idLocal == element.idLocal){
                const fechaHoraInicio = Moment(element.fechaHoraInicio).format('DD/MM/YYYY [a las] HH:mm ');
                const fechaHoraFin = Moment(element.fechaHoraFin).format('DD/MM/YYYY [a las] HH:mm ');

            return(

                    <Card style={styles.card}>
                    <Image
                        source={{ uri: element.idPromocion }}
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

        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <ScrollView>
                
                <View >{list()}</View>
              
            </ScrollView>
        </View>
   
    );
    };



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