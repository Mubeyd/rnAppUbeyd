'use strict';

import React from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { useBounceAnimation, useViewportUnits } from '../hooks';

const Header = () => {
  const { vh } = useViewportUnits();
  const bounce = useBounceAnimation();
  const height = 40 * vh;

  return (
    <View style={styles.container}>
      <Animated.Image
        accessibilityRole={'image'}
        source={require('./logo.gif')}
        style={{ height, transform: [{ translateY: bounce }] }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
});
export default Header;
