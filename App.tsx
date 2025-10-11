import { FC } from 'react';
import { StatusBar, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';

import store from './src/store';

const App: FC = () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <StatusBar backgroundColor="#222224" barStyle="light-content" />

        <AppContent />
      </SafeAreaProvider>
    </Provider>
  );
};

const AppContent: FC = () => {
  return <View />;
};

export default App;
