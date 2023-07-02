import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import DetailsScreen from '../screens/DetailsScreen';
import HomeScreen from '../screens/HomeScreen';
import NewUserScreen from '../screens/NewUserScreen';

const Stack = createStackNavigator();

export function HomeStack() {
  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          title: 'Home Screen RQ',
        }}
      />
      <Stack.Screen
        name="DetailsScreen"
        component={DetailsScreen}
        options={{
          title: 'Details Screen',
        }}
      />
      <Stack.Screen
        name="NewUserScreen"
        component={NewUserScreen}
        options={{
          title: 'New User Screen',
        }}
      />
    </Stack.Navigator>
  );
}
