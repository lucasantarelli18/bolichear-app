import * as React from 'react';
import * as Backend from '../backlog';
import { Text, View, Button, ScrollView, StyleSheet, Alert, Image, TextInput, Pressable, ImageBackground } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import MapView, { Callout, Marker, Polyline } from 'react-native-maps';
import { StatusBar } from 'expo-status-bar';
import 'react-native-url-polyfill/auto';
import TabScreen from './TabScreen';
import { LinearGradient } from 'expo-linear-gradient';




export function NumSymScreen({ navigation }) {
  const [number, setNumber] = React.useState(1);
  const [palo, setPalo] = React.useState('BASTO');

  const getRandomNumber = () => {
    const randomNumber = Math.floor(Math.random() * 12) + 1;
    const numero = Math.floor(Math.random() * 4) + 1;
    if (numero === 1) {
      setPalo('BASTO');
    } else if (numero === 2) {
      setPalo('ESPADA');
    } else if (numero === 3) {
      setPalo('ORO');
    }  else {
      setPalo('COPA');
    }
    setNumber(randomNumber);

  }


  return (
    <View style={styles.container}>
      <View style={styles.innerContainer2}>
        <Text style={styles.title}>REGLAS</Text>
        <Text style={styles.text2}>1. Preparar un trago por persona</Text>
        <Text style={styles.text2}>2. Por turnos elegir numero y palo</Text>
        <Text style={styles.text3}>3. Genera tu carta!</Text>
        <Text style={styles.text4}>Si acertas numero tomas 1 trago</Text>
        <Text style={styles.text4}>Si acertas palo tomas 2 tragos</Text>
        <Text style={styles.text4}>Si acertas ambas tomas 5 tragos</Text>
      </View>
      <View style={styles.innerContainer}>
        <View style={styles.numberContainer}>
          <Text style={styles.text3a}>Tu carta es:</Text>
          <Text style={styles.text}>{number} de {palo}</Text>
        </View>
        <Pressable onPress={getRandomNumber}>
          <LinearGradient
            // Button Linear Gradient
            colors={['#C2454A', '#A32934', '#680008']}
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.button}>
            <Text style={styles.text}>GENERA TU CARTA!</Text>
          </LinearGradient>
        </Pressable>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    width: '90 %',
    height: '30%',
    borderRadius: 30,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  innerContainer2: {
    width: '80 %',
    justifyContent: 'center',
    alignItems: 'center',
  },
  numberContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  button: {
    width: '50%',
    height: 50,
    borderRadius: 30,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  text2: {
    fontSize: 20,
    fontWeight: "bold",
  },
  text4: {
    fontSize: 15,
    fontWeight: "bold",
  },
  text3: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 6,
  },
  text3a: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 6,
    color: "white",
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: "red",
    marginBottom: 15,
    marginTop: 40,
  },
});