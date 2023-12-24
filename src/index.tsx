import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { App } from './App';

import './i18n';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import { Provider } from 'react-redux';
import { store } from './store';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <I18nextProvider i18n={i18n}>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </I18nextProvider>,
);
