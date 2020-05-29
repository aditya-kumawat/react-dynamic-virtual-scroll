import React from 'react';
import logo from './logo.svg';
import './App.css';
import data from './data';

import List from './List'

function App() {
  return (
    <List
      data={data}
    />
  );
}

export default App;
