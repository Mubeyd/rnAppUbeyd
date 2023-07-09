import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import NewUserScreen from '../features/dummyUsers/screens/NewUserScreen';
import UserDetailsScreen from '../features/dummyUsers/screens/UserDetailsScreen';
import UsersListScreen from '../features/dummyUsers/screens/UsersListScreen';

const Stack = createStackNavigator();

export function HomeStack() {
  return (
    <Stack.Navigator initialRouteName="UsersListScreen">
      <Stack.Screen
        name="UsersListScreen"
        component={UsersListScreen}
        options={{
          title: 'Users list screen',
        }}
      />
      <Stack.Screen
        name="DetailsScreen"
        component={UserDetailsScreen}
        options={{
          title: 'User Details Screen',
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
