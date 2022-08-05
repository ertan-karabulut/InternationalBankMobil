import React from 'react';
import { Provider } from 'react-redux';
import { Store } from './src/redux/store';
import Navi from './src/navigation/Index';
import { Provider as PaperProvider } from 'react-native-paper';


const App = () => {
  return (
    <Provider store={Store}>
      <PaperProvider>
        <Navi />
      </PaperProvider>
    </Provider>

  );
}

export default App;
