import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, Button, Image, ImageBackground, Pressable } from 'react-native';
import { supabase } from './supabase';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SplashScreen } from './Screens/SplashScreen'
import { HomeScreen } from './Screens/HomeScreen'
import { UbicationScreen } from './Screens/UbicationScreen'
import { DetailsScreen } from './Screens/DetailsScreen'
import { LocalesScreen } from './Screens/LocalesScreen'
import { AltaLocalScreen } from './Screens/AltaLocalScreen'
import { VerInfoScreen } from "./Screens/VerInfoScreen";
import 'react-native-url-polyfill/auto';
//import MapView, { Marker, Polyline } from 'react-native-maps';
//import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
//import ImageBlurShadow from 'react-native-image-blur-shadow';
import * as Font from 'expo-font';

const AuthContext = React.createContext();
const image = { uri: "./assets/FondoDesenfocado.jpg" };

function SignInScreen() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const { signIn } = React.useContext(AuthContext);

  return (
    <ImageBackground
      source={require("./assets/fondoLogIn7.jpg")}
      style={styles.container}
    >
      <Image style={styles.imagen} source={require("./assets/logo.png")} />
      <View style={styles.container2}>
        <TextInput
          style={styles.input}
          placeholder="Usuario"
          value={username}
          onChangeText={setUsername}
          //secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          value={password}
          onChangeText={setPassword}
          //secureTextEntry
        />
        <Pressable
          style={styles.button}
          onPress={() => signIn({ username, password })}
        >
          <Text style={styles.text}>LOG IN</Text>
        </Pressable>
      </View>
    </ImageBackground>
  );
}

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
                // When logging out, a pop animation feels intuitive
                animationTypeForReplace: state.isSignout ? "pop" : "push",
              }}
            />
          ) : (
            // User is signed in

            <>
              <Stack.Screen name="Ubication" component={UbicationScreen} options={{title:'Ubicación'}}/>
              <Stack.Screen name="Home" component={HomeScreen} options={{title:'Inicio'}}/>
              <Stack.Screen name="Details" component={DetailsScreen} />
              <Stack.Screen name="VerInfo" component={VerInfoScreen} />
              <Stack.Screen name="Locales" component={LocalesScreen} options={{title:'Mi Local'}}/>
              <Stack.Screen name="AltaLocal" component={AltaLocalScreen} options={{title:'Alta de Local'}}/>
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
    width: "50%",
    height: 132,
    //backgroundColor: '#fff',
    elevation: 10,
  },
  imagen: {
    width: 300,
    height: 300,
  },
  input: {
    height: 39,
    marginBottom: 10,
    paddingLeft: 10,
    borderWidth: 1,
    borderRadius: 4,
    fontSize: 16,
    fontFamily: "Roboto-Medium",
    //borderColor: 'white',
  },
  places: {
    //flex: 0,
    //position: "absolute",
    width: "50%",
    //zIndex: 1,
    //backgroundColor: "black",
  },
  image: {
    //flex: 1,
    //justifyContent: "center"
    alignItems: "center",
    flexGrow: 1,
    height: "100%",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "black",
    fontFamily: "Roboto-Medium",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});
