import React from 'react';
import logo from './logo.svg';
import './App.css';
import MainAppBar from './Menu'
import LoginTab from './LoginExample'
import Vol_Table from './Volunteers'


function App() {
  return (
    <div className="App">
      <MainAppBar/>
      <header className="App-header">
      {/* <LoginTab/> */}
      <Vol_Table/>
      </header>
      
    </div>
  );
}

export default App;
