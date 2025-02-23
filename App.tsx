import { NativeBaseProvider } from 'native-base';
import React, { type FC } from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import Navigation from './src/navigation';
import store from './src/store';
import theme from './src/theme';

const App: FC = () => {
  return (
    <Provider store={store}>
      <NativeBaseProvider theme={theme}>
        <StatusBar backgroundColor="#222224" />

        <Navigation />
      </NativeBaseProvider>
    </Provider>
  );
};

export default App;
