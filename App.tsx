import React from 'react';
import { useColorScheme } from 'react-native';
import 'react-native-gesture-handler';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { ReduxProvider } from './src/containers/ReduxProvider';
import Routes from './src/navigation/Routes';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <ReduxProvider>
      <Routes />
    </ReduxProvider>
  );
}

export default App;
