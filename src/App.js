import React from 'react';
import List from './List';
const data = Array.from({ length: 100 }, (_, index) => `List Item:- ${index}`);

function App() {
  return (
    <List
      data={data}
    />
  );
}

export default App;
