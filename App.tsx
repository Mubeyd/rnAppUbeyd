import React from 'react';
import 'react-native-gesture-handler';
import { ReduxProvider } from './src/containers/ReduxProvider';
import Routes from './src/navigation/Routes';

function App(): JSX.Element {
  return (
    <ReduxProvider>
      <Routes />
    </ReduxProvider>
  );
}

export default App;
