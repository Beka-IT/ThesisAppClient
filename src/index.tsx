import ReactDOM from 'react-dom/client';
import { App } from './App';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import { Provider } from 'react-redux';
import { store } from './store';
import { BrowserRouter } from 'react-router-dom';
import { AppMantineProvider } from './utils/theme';
import { ThemeProvider } from './utils/theme-provider';
import './index.css';
import './i18n';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/dates/styles.css';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <I18nextProvider i18n={i18n}>
    <BrowserRouter>
      <Provider store={store}>
        <AppMantineProvider>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </AppMantineProvider>
      </Provider>
    </BrowserRouter>
  </I18nextProvider>,
);
