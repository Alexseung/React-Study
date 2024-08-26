import React, {isValidElement} from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';
import DefaultBox from './box';

const root = ReactDOM.createRoot(
  document.querySelector('#rootReact') as HTMLElement
);

root.render(
  <>
    <App />
  </>
);
