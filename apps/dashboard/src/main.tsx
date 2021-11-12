import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { blackAndWhiteTheme } from './theme';
import { initializeIcons, loadTheme } from '@fluentui/react';
import App from './app/app';

loadTheme(blackAndWhiteTheme);
initializeIcons();

ReactDOM.render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
  document.getElementById('root')
);
