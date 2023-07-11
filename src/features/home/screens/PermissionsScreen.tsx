import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { ImageRequireSource, Linking } from 'react-native';

import { StyleSheet, Text, View } from 'react-native';
import { Camera, CameraPermissionStatus } from 'react-native-vision-camera';
// import type { Routes } from './Routes';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const BANNER_IMAGE = require('../../components/logo.gif') as ImageRequireSource;

// type Props = NativeStackScreenProps<Routes, 'PermissionsScreen'>;
export function PermissionsScreen(): React.ReactElement {
  const { replace } = useNavigation() as any;
  const [cameraPermissionStatus, setCameraPermissionStatus] = useState<CameraPermissionStatus>('not-determined');
  const [microphonePermissionStatus, setMicrophonePermissionStatus] =
    useState<CameraPermissionStatus>('not-determined');

  const requestMicrophonePermission = useCallback(async () => {
    const permission = await Camera.requestMicrophonePermission();

    if (permission === 'denied') {
      await Linking.openSettings();
    }
    setMicrophonePermissionStatus(permission);
  }, []);

  const requestCameraPermission = useCallback(async () => {
    console.log('Requesting camera permission...');
    const permission = await Camera.requestCameraPermission();
    console.log(`Camera permission status: ${permission}`);

    if (permission === 'denied') {
      await Linking.openSettings();
    }
    setCameraPermissionStatus(permission);
  }, []);

  useEffect(() => {
    if (cameraPermissionStatus === 'authorized' && microphonePermissionStatus === 'authorized') {
      replace('HomeScreen');
    }
  }, [cameraPermissionStatus, microphonePermissionStatus, replace]);

  return (
    <View style={styles.container}>
      {/* <Image source={BANNER_IMAGE} style={styles.banner} /> */}
      <Text style={styles.welcome}>Welcome to{'\n'}Vision Camera.</Text>
      <View style={styles.permissionsContainer}>
        {cameraPermissionStatus !== 'authorized' && (
          <Text style={styles.permissionText}>
            Vision Camera needs <Text style={styles.bold}>Camera permission</Text>.{' '}
            <Text style={styles.hyperlink} onPress={requestCameraPermission}>
              Grant
            </Text>
          </Text>
        )}
        {microphonePermissionStatus !== 'authorized' && (
          <Text style={styles.permissionText}>
            Vision Camera needs <Text style={styles.bold}>Microphone permission</Text>.{' '}
            <Text style={styles.hyperlink} onPress={requestMicrophonePermission}>
              Grant
            </Text>
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    bottom: 0,
    left: 0,
    opacity: 0.4,
    position: 'absolute',
  },
  bold: {
    fontWeight: 'bold',
  },
  container: {
    backgroundColor: 'white',
    flex: 1,
    // ...SAFE_AREA_PADDING,
  },
  hyperlink: {
    color: '#007aff',
    fontWeight: 'bold',
  },
  permissionText: {
    fontSize: 17,
  },
  permissionsContainer: {
    marginTop: 15 * 2,
  },
  welcome: {
    fontSize: 38,
    fontWeight: 'bold',
    maxWidth: '80%',
  },
});
