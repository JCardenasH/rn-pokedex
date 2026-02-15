import { StatusBar } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';

import Navigation from '@/navigation';
import store from '@/store';
import theme from '@/theme';

export function App() {
  return (
    <PaperProvider theme={theme}>
      <Provider store={store}>
        <SafeAreaProvider>
          <StatusBar backgroundColor="#222224" barStyle="light-content" />

          <Navigation />
        </SafeAreaProvider>
      </Provider>
    </PaperProvider>
  );
}
