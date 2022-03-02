import React from 'react';
import ReactDOM from 'react-dom';

import { Calendar } from './Calendar';
import { Text } from './primitives';

import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <>
      <Text>Lorem lasdjklasjd alskdjalskdj alskdj aslkdjasl kdjaslkdjasl kdjaslkdjalk djalkjd</Text>

      <p>Lorem lasdjklasjd alskdjalskdj alskdj aslkdjasl kdjaslkdjasl kdjaslkdjalk djalkjd</p>
      <Calendar locale="es-ES" />
    </>
  </React.StrictMode>,
  document.getElementById('root'),
);
