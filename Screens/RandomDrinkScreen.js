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





export function RandomDrinkScreen({ navigation }) {
  const [number, setNumber] = React.useState(1);
  const [bebida, setBebida] = React.useState('agua');

  const getRandomNumber = () => {
    const randomNumber = Math.floor(Math.random() * 10) + 1;
    const numero = Math.floor(Math.random() * 5) + 1;
    if (numero === 1) {
      setBebida('vodka');
    } else if (numero === 2) {
      setBebida('fernet');
    } else if (numero === 3) {
      setBebida('ron');
    } else if (numero === 4) {
      setBebida('vino');
    } else {
      setBebida('birra');
    }
    setNumber(randomNumber);

  }


  return (
    <View style={styles.container}>
      <Text style={styles.title}>REGLAS</Text>
      <View style={styles.innerContainer2}>
        <Text style={styles.text2}>1. Prepara las siguientes bebidas:</Text>
        <View style={styles.innerContainer3}>
          <Text style={styles.text3}>Vodka - Fernet - Ron - Vino - Birra</Text>
        </View>
        <Text style={styles.text3}>2. Establezcan los turnos</Text>
        <Text style={styles.text2}>3. A Probar suerte y TOMAR!</Text>
      </View>
      <View style={styles.innerContainer}>
        <View style={styles.numberContainer}>
          <Text style={styles.text}>Toma {number} trago/s de</Text>
          <Text style={styles.text}>{bebida}</Text>
        </View>
      </View>
      <View style={styles.innerContainer4}>
        <Pressable onPress={getRandomNumber}>
          <LinearGradient
            // Button Linear Gradient
            colors={['#C2454A', '#A32934', '#680008']}
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.button}>
            <Text style={styles.text4}>A TOMAR!</Text>
          </LinearGradient>
        </Pressable></View>

      <StatusBar style="white" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ebe6d9',
    alignItems: 'center',
  },
  innerContainer: {
    width: '90 %',
    height: '30%',
    borderRadius: 30,
    backgroundColor: '#C2454A',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  innerContainer2: {
    width: '80 %',
    justifyContent: 'center',
  },
  innerContainer3: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer4: {
    width: '80%',
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  numberContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  button: {
    width: '80%',
    height: 50,
    borderRadius: 30,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 35,
    fontWeight: "bold",
    color: "white",
  },
  text4: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  text2: {
    fontSize: 18,
    fontWeight: "bold",
  },
  text3: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 6,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#A32934",
    marginBottom: 15,
    marginTop: 40,
  },
});