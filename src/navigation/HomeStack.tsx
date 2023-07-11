import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { Camera, CameraPermissionStatus } from 'react-native-vision-camera';
import NewUserScreen from '../features/dummyUsers/screens/NewUserScreen';
import UserDetailsScreen from '../features/dummyUsers/screens/UserDetailsScreen';
import UsersListScreen from '../features/dummyUsers/screens/UsersListScreen';
import HomeScreen from '../features/home/screens/HomeScreen';
import { CameraScreen } from '../features/penaltyCalculator/screens/CameraScreen';
import ContactsScreen from '../features/penaltyCalculator/screens/ContactsScreen';
import { MediaScreen } from '../features/penaltyCalculator/screens/MediaScreen';
import PCDetailsScreen from '../features/penaltyCalculator/screens/PCDetailsScreen';
import PCSummaryScreen from '../features/penaltyCalculator/screens/PCSummaryScreen';
import { PermissionsScreen } from '../features/home/screens/PermissionsScreen';
import { CameraScreenFormik } from '../features/penaltyCalculatorFormik/screens/CameraScreen';
import ContactsScreenFormik from '../features/penaltyCalculatorFormik/screens/ContactsScreen';
import { MediaScreenFormik } from '../features/penaltyCalculatorFormik/screens/MediaScreen';
import PCDetailsScreenFormik from '../features/penaltyCalculatorFormik/screens/PCDetailsScreen';
import PCSummaryScreenFormik from '../features/penaltyCalculatorFormik/screens/PCSummaryScreen';

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

      {/* Book Borrow with Formik */}

      <Stack.Screen
        name="ContactsScreenFormik"
        component={ContactsScreenFormik}
        options={{
          title: 'Contacts Screen',
        }}
      />
      <Stack.Screen
        name="PCDetailsScreenFormik"
        component={PCDetailsScreenFormik}
        options={{
          title: 'PC Details Screen',
        }}
      />
      <Stack.Screen
        name="PCSummaryScreenFormik"
        component={PCSummaryScreenFormik}
        options={{
          title: 'PC Summary Screen',
        }}
      />
      <Stack.Screen
        name="CameraScreenFormik"
        component={CameraScreenFormik}
        options={{
          title: 'Camera Screen',
        }}
      />
      <Stack.Screen
        name="MediaScreenFormik"
        component={MediaScreenFormik}
        options={{
          title: 'Media Screen',
        }}
      />
    </Stack.Navigator>
  );
}
