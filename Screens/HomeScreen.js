import * as React from 'react';
import { Text, View, Button } from 'react-native';

export function HomeScreen({navigation}) {
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