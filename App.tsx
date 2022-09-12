import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider } from 'native-base';
import React, { type FC } from 'react';
import { Provider } from 'react-redux';
import RootStack from './src/navigation/RootStack';
import store from './src/store';

const App: FC = () => {
  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <NavigationContainer>
          <RootStack />
        </NavigationContainer>
      </NativeBaseProvider>
    </Provider>
  );
};

export default App;
