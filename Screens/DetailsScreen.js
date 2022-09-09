import * as React from 'react';
import { Text, View, Button } from 'react-native';
import * as Backend from '../backlog';

export function DetailsScreen({ navigation }) {



  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
      <Button 
        title="Ir al Inicio"
        onPress={() => navigation.navigate('Home')}
      />
    </View>
  );
}