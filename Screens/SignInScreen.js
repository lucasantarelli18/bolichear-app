function SignInScreen() {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
  
    const { signIn } = React.useContext(AuthContext);
  
    return (
      <View style = {styles.container}>
        
        <Image style = {styles.imagen} source={require('./assets/logo.png')} />
        <View style = {styles.container2}>
        <TextInput
          style = {styles.input}
          placeholder="Nombre de usuario"
          value={username}
          onChangeText={setUsername}
          
        />
        <TextInput
          style = {styles.input}
          placeholder="Contraseña"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Button style = {styles.input} title="Ingresar" onPress={() => signIn({ username, password })} />
  
        </View>
      </View>
    );
  }