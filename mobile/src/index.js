import React from 'react';
import { Provider } from 'react-redux';

import './config/ReactotronConfig';

import store from './store';

import App from './App';

export default function Index() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}
