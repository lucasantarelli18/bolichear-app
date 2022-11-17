import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, Button, TouchableOpacity, Image, ImageBackground, Pressable } from 'react-native';
import { supabase } from './supabase';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SplashScreen } from './Screens/SplashScreen';
import { MapScreen } from './Screens/MapScreen';
import { HomeScreen } from './Screens/HomeScreen';
import { UbicationScreen } from './Screens/UbicationScreen';
import { DetailsScreen } from './Screens/DetailsScreen';
import { LocalesScreen } from './Screens/LocalesScreen';
import { AltaLocalScreen } from './Screens/AltaLocalScreen';
import { VerInfoScreen } from "./Screens/VerInfoScreen";
import { EventosScreen } from "./Screens/EventosScreen";
import { PromocionesScreen } from './Screens/PromocionesScreen';
import { VerPromocionesScreen } from './Screens/VerPromocionesScreen';
import { VerEventosScreen } from "./Screens/VerEventosScreen";
import { SignInScreen } from "./Screens/SignInScreen";
import { LinearGradient } from 'expo-linear-gradient';
import 'react-native-url-polyfill/auto';
//import MapView, { Marker, Polyline } from 'react-native-maps';
//import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
//import ImageBlurShadow from 'react-native-image-blur-shadow';
import * as Font from 'expo-font';
import { LogBox } from "react-native";
import AuthContext from "./AuthContext"
 
LogBox.ignoreAllLogs();

//const AuthContext = React.createContext();
const image = { uri: "./assets/FondoDesenfocado.jpg" };

const Stack = createNativeStackNavigator();

export default function App({ navigation }) {

  const [fontsLoaded, setFontsLoaded] = React.useState(false);

  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case "RESTORE_TOKEN":
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case "SIGN_IN":
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case "SIGN_OUT":
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        // Restore token stored in `SecureStore` or any other encrypted storage
        // userToken = await SecureStore.getItemAsync('userToken');
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: "RESTORE_TOKEN", token: userToken });
    };

    if (!fontsLoaded) {
      Font.loadAsync({
        "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
      });
    }
    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (data) => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `SecureStore` or any other encrypted storage
        // In the example, we'll use a dummy token

        dispatch({ type: "SIGN_IN", token: "dummy-auth-token" });
      },
      signOut: () => dispatch({ type: "SIGN_OUT" }),
      signUp: async (data) => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `SecureStore` or any other encrypted storage
        // In the example, we'll use a dummy token

        dispatch({ type: "SIGN_IN", token: "dummy-auth-token" });
      },
    }),
    []
  );
  //const {signOut} = React.useContext(AuthContext);
  //<Button title="Cerrar sesion" onPress={signOut}/>
  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator>
          {state.isLoading ? (
            // We haven't finished checking for the token yet
            <Stack.Screen name="Splash" component={SplashScreen} />
          ) : state.userToken == null ? (
            // No token found, user isn't signed in
            <Stack.Screen
              name="SignIn"
              component={SignInScreen}
              options={{
                title: "Sign in",
                headerShown: false,
                // When logging out, a pop animation feels intuitive
                animationTypeForReplace: state.isSignout ? "pop" : "push",
              }}
            />
          ) : (
            // User is signed in

            <>
              <Stack.Screen name="Ubication" component={UbicationScreen} options={{
                title: 'Ubicación',
                headerShown: false
              }} />
              <Stack.Screen name="Home" component={HomeScreen} options={{
                title: 'Inicio',
                headerTitleAlign: "center",
                headerTitleStyle: { color: 'black' },
                headerStyle: { backgroundColor: '#fff', justifyContent: "center", fontColor: 'white' },
              }} />
              <Stack.Screen name="Details" component={DetailsScreen} />
              <Stack.Screen name="VerInfo" component={VerInfoScreen} options={{
                title: 'Detalles de mi Local', headerTitleAlign: "center",
                headerTitleStyle: { color: 'black' },
                headerStyle: { backgroundColor: '#fff', justifyContent: "center", fontColor: 'white' }
              }} />
              <Stack.Screen name="Locales" component={LocalesScreen} options={{
                title: 'Mi Local', headerTitleAlign: "center",
                headerTitleStyle: { color: 'black' },
                headerStyle: { backgroundColor: '#ebe6d9', justifyContent: "center", fontColor: 'white' }
              }} />
              <Stack.Screen name="AltaLocal" component={AltaLocalScreen} options={{
                title: 'Carga tu Local', headerTitleAlign: "center",
                headerTitleStyle: { color: 'black' },
                headerStyle: { backgroundColor: '#ebe6d9', justifyContent: "center", fontColor: 'white' }
              }} />
              <Stack.Screen name="Eventos" component={EventosScreen} options={{
                title: "Nuevo Evento", headerTitleAlign: "center",
                headerTitleStyle: { color: 'black' },
                headerStyle: { backgroundColor: '#ebe6d9', justifyContent: "center", fontColor: 'white' }
              }} />
              <Stack.Screen name="VerEventos" component={VerEventosScreen} options={{
                title: 'Detalles', headerTitleAlign: "center",
                headerTitleStyle: { color: 'black' },
                headerStyle: { backgroundColor: '#fff', justifyContent: "center", fontColor: 'white' },
              }} />
              <Stack.Screen name="Promociones" component={PromocionesScreen} options={{
                title: 'Nueva Promocion', headerTitleAlign: "center",
                headerTitleStyle: { color: 'black' },
                headerStyle: { backgroundColor: '#ebe6d9', justifyContent: "center", fontColor: 'white' }
              }} />
              <Stack.Screen name="VerPromociones" component={VerPromocionesScreen} options={{ title: 'Promociones' }} />
              <Stack.Screen name="MapScreen" component={MapScreen} options={{
                title: 'Mapa', headerTitleAlign: "center",
                headerTitleStyle: { color: 'black' },
                headerStyle: { backgroundColor: '#fff', justifyContent: "center", fontColor: 'white' },
              }} />
            </>)}

        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
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
  texto: {
    marginTop: 10,
    fontSize: 12,
    color: "white",
    fontStyle: 'italic',
    textDecorationLine: "underline"
  }
});
