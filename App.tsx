import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider, StatusBar } from 'native-base';
import React, { type FC } from 'react';
import { Provider } from 'react-redux';
import RootStack from './src/navigation/RootStack';
import store from './src/store';
import theme from './src/theme';

const App: FC = () => {
  return (
    <Provider store={store}>
      <NativeBaseProvider theme={theme}>
        <StatusBar backgroundColor="#222224" />

        <NavigationContainer>
          <RootStack />
        </NavigationContainer>
      </NativeBaseProvider>
    </Provider>
  );
};

export default App;
