import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { Camera, CameraPermissionStatus } from 'react-native-vision-camera';
import { CameraScreen } from '../screens/CameraScreen';
import DetailsScreen from '../screens/DetailsScreen';
import HomeScreen from '../screens/HomeScreen';
import { MediaScreen } from '../screens/MediaScreen';
import { PermissionsScreen } from '../screens/PermissionsScreen';
import SummaryScreen from '../screens/SummaryScreen';

const Stack = createStackNavigator();

export function HomeStack() {
  const [cameraPermission, setCameraPermission] = useState<CameraPermissionStatus>();
  const [microphonePermission, setMicrophonePermission] = useState<CameraPermissionStatus>();

  useEffect(() => {
    Camera.getCameraPermissionStatus().then(setCameraPermission);
    Camera.getMicrophonePermissionStatus().then(setMicrophonePermission);
  }, []);

  if (cameraPermission == null || microphonePermission == null) {
    // still loading
    return null;
  }

  const showPermissionsPage = cameraPermission !== 'authorized' || microphonePermission === 'not-determined';
  return (
    <Stack.Navigator initialRouteName={showPermissionsPage ? 'PermissionsScreen' : 'HomeScreen'}>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          title: 'Home Screen',
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
        name="SummaryScreen"
        component={SummaryScreen}
        options={{
          title: 'Summary Screen',
        }}
      />
      <Stack.Screen
        name="PermissionsScreen"
        component={PermissionsScreen}
        options={{
          title: 'Permissions Screen',
        }}
      />
      <Stack.Screen
        name="CameraScreen"
        component={CameraScreen}
        options={{
          title: 'Camera Screen',
        }}
      />
      <Stack.Screen
        name="MediaScreen"
        component={MediaScreen}
        options={{
          title: 'Media Screen',
        }}
      />
    </Stack.Navigator>
  );
}
