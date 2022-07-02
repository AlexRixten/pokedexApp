import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';

import PokemonGens from './src/components/components/Screens/PokemonGens/PokemonGens';
import { PokemonItem } from './src/components/components/Screens/PokemonItem/PokemonItem';
const Stack = createNativeStackNavigator();

function App() {
  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' && 'padding'} style={{ flex: 1 }}>

      <StatusBar barStyle="dark-content" />

      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={PokemonGens} />
          <Stack.Screen name="PokemonItem" component={PokemonItem} />
        </Stack.Navigator>
      </NavigationContainer>
    </KeyboardAvoidingView>
  );
}

export default App;
