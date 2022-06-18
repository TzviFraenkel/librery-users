import React from 'react';
// import logo from './logo.svg';
// import { Counter } from './features/counter/Counter';
import { UsersList } from './features/components/usersList';

function App() {
  // console.log('render from app');
  return (
    <div className="App">
      <UsersList/>
    </div>
  );
}

export default App;
