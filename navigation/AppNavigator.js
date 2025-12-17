import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CharactersListScreen from '../screens/CharactersListScreen';
import CharacterDetailScreen from '../screens/CharacterDetailScreen';
import Colors from '../constants/Colors';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: Colors.primary },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        <Stack.Screen
          name="List"
          component={CharactersListScreen}
          options={{ title: 'Rick and Morty Characters' }}
        />
        <Stack.Screen
          name="Detail"
          component={CharacterDetailScreen}
          options={{ title: 'Detalhes do Personagem' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;