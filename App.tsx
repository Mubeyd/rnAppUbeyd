import React from 'react';
import { QueryProvider } from './src/containers/QueryProvider';
import { ReduxProvider } from './src/containers/ReduxProvider';
import Routes from './src/navigation/Routes';

function App(): JSX.Element {
  return (
    <QueryProvider>
      <ReduxProvider>
        <Routes />
      </ReduxProvider>
    </QueryProvider>
  );
}

export default App;
