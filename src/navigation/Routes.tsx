import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { HomeStack } from './HomeStack';

const Routes = () => {
  return (
    <NavigationContainer>
      <HomeStack />
    </NavigationContainer>
  );
};

export default Routes;
