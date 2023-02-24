import * as React from 'react';
import { StyleSheet, Text, TextInput, View, Button, TouchableOpacity, Image, ImageBackground, Pressable } from 'react-native';
import AuthContext from "../AuthContext"
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import * as Backend from '../backlog';

export function PreloginScreen({ route, navigation }) {

  const { signInSinPass } = React.useContext(AuthContext);

  const quieroBuscar = () => {
        Backend.updateLogged(0)
        signInSinPass({ })
  }

  return (
    
    <ImageBackground
      source={require("../assets/fondoLogIn.jpg")}
      style={styles.container}
    >
      <Image style={styles.imagen} source={require("../assets/logo.png")} />
      <View style={styles.container2}>
        <Pressable
          style={styles.container3}
          onPress={() => quieroBuscar()}>
          <LinearGradient
            // Button Linear Gradient
            colors={['#C2454A', '#A32934', '#680008']}
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.button}>
            <Text style={styles.text}>QUIERO BUSCAR BOLICHES</Text>
          </LinearGradient>
        </Pressable>
        <Pressable
          style={styles.container3}
          onPress={() => {
              navigation.navigate("SignIn");
            }}>
          <LinearGradient
            // Button Linear Gradient
            colors={['#C2454A', '#A32934', '#680008']}
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.button}>
            <Text style={styles.text}>SOY DUEÑO</Text>
          </LinearGradient>
        </Pressable>
      </View>
      <StatusBar style="dark" />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  test: {
    flex: 1,
  },
  container: {
    flex: 1,
    //backgroundColor: '#fff',
    alignItems: "center",
    //justifyContent: 'center',
    //alignContent: "space-between",
  },
  container2: {
    width: '100%',
    //backgroundColor: '#fff',
    alignItems: "center",
    justifyContent: "center"

  },
  imagen: {
    marginTop: 80,
    width: 300,
    height: 250,
  },
  input: {
    padding: 10,
    width: "80%",
    heigt: 10,
    marginTop: 25,
    borderRadius: 30,
    backgroundColor: '#f1f1f1',
    fontFamily: "Roboto-Medium",
    paddingStart: 30,
    fontSize: 16,
    elevation: 10,
  },
  image: {
    //flex: 1,
    //justifyContent: "center"
    alignItems: "center",
    flexGrow: 1,
    height: "100%",
  },
  container3: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    marginTop: 100,
    marginBottom: 50
  },
  button: {
    width: '75%',
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
  texto: {
    marginTop: 10,
    fontSize: 12,
    color: "white",
    fontStyle: 'italic',
    textDecorationLine: "underline"
  }
});
