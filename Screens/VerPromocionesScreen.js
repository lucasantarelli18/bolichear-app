import {StyleSheet} from 'react-native';
import * as Backend from '../backlog';
import { View, Text, Image, ScrollView, Dimensions } from 'react-native';
import React, { useState } from "react";
import {  Card } from 'react-native-elements';
import Moment from 'moment';
import 'moment/locale/es';

export function VerPromocionesScreen({navigation}) {
    
    const [promociones, setPromociones] = React.useState([]);
    const [locales, setLocales] = React.useState([]);


    React.useEffect(() => {
        Backend.getPromociones()
        .then((items) => {
          console.log(items)
          setPromociones(items)
        }),
        Backend.getLocales()
        .then((items) => {
            console.log(items)
            setLocales(items)
        })
        }, [])


    const list = () => {
              
        return promociones.map((element) => {
            const fechaHoraInicio = Moment(element.fechaHoraInicio).format('DD/MM/YYYY [a las] HH:mm ');
            const fechaHoraFin = Moment(element.fechaHoraFin).format('DD/MM/YYYY [a las] HH:mm ');

            return(
                
                <Card style={styles.card}>
                    <Image
                        source={{ uri: "https://images.unsplash.com/photo-1497802176320-541c8e8de98d?&w=1600&h=900&fit=crop&crop=entropy&q=300" }}
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
        
        });
    }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <ScrollView>
                <View style={{backgroundColor: "#000000"}}>{list()}</View>
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
    }

  });