import React, { Fragment } from 'react';
import {BrowserView, MobileView} from 'react-device-detect';

import Title from './components/title/title'
import ToDo from './components/todo';
import './App.css'


const App = () => (
  <Fragment>
    <div className='background'> 
      <Title title="T O D O" />
      <ToDo />
    </div>
  </Fragment>
)

export default App;
