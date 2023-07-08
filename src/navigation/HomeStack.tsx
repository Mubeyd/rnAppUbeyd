import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { Camera, CameraPermissionStatus } from 'react-native-vision-camera';
import { CameraScreen } from '../features/penaltyCalculator/screens/CameraScreen';
import ContactsScreen from '../features/penaltyCalculator/screens/ContactsScreen';
import { MediaScreen } from '../features/penaltyCalculator/screens/MediaScreen';
import PCDetailsScreen from '../features/penaltyCalculator/screens/PCDetailsScreen';
import PCSummaryScreen from '../features/penaltyCalculator/screens/PCSummaryScreen';
import { PermissionsScreen } from '../features/penaltyCalculator/screens/PermissionsScreen';

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
        name="ContactsScreen"
        component={ContactsScreen}
        options={{
          title: 'Contacts Screen',
        }}
      />
      <Stack.Screen
        name="PCDetailsScreen"
        component={PCDetailsScreen}
        options={{
          title: 'PC Details Screen',
        }}
      />
      <Stack.Screen
        name="PCSummaryScreen"
        component={PCSummaryScreen}
        options={{
          title: 'PC Summary Screen',
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
