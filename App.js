/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import Routing from './src/App/Routing';
import { Provider } from 'react-redux'
import store from './src/Store'

const App = () => {
  return (
    <Provider store={store}>
      <Routing/>
    </Provider>
  );
};

export default App;
