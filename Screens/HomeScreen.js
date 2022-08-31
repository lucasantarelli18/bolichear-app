import * as React from 'react';
import { Text, View, Button } from 'react-native';
import * as Backend from '../backlog';

export function HomeScreen({navigation}) {

  React.useEffect(() => {
    //Tomo provincias
    Backend.getUsuarios()
    .then((items) => {
      console.log(items)
    })
  }, [])

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button 
        title="Ir a Detalles"
        onPress={() => { navigation.navigate('Details', {
          itemId: 86,
          nombre: 'Pepe',
        });
      }}
      />
    </View>
  );
}