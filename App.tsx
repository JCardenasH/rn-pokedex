import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider } from 'native-base';
import React, { type FC } from 'react';
import RootStack from './src/navigation/root.stack';

const App: FC = () => {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
    </NativeBaseProvider>
  );
};

export default App;
