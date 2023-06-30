import 'react-native-gesture-handler';

import React from 'react';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';

import { PersistGate } from 'redux-persist/integration/react';

import Root from './app/Root';
import i18n from './app/shared/config/i18n/i18n';
import { ThemeProvider } from './app/shared/lib/providers/ThemeProvider';
import { persistor, store } from './app/shared/lib/store/store';

import type { FC } from 'react';

const App: FC = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ThemeProvider>
        <I18nextProvider i18n={i18n}>
          <Root />
        </I18nextProvider>
      </ThemeProvider>
    </PersistGate>
  </Provider>
);

export default App;
