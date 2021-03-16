import React from 'react';
import ReactDOM from 'react-dom';
import { NearProvider, NearEnvironment } from 'near-react-hooks';
import App from './components/app/App';

ReactDOM.render(
  <NearProvider environment={NearEnvironment.TestNet}>
    <App />
  </NearProvider>,
  document.getElementById('root')
);
