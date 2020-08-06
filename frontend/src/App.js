import React from 'react';
import logo from './logo.svg';
import './App.css';
import MainAppBar from './Menu'
import LoginTab from './LoginExample'


function App() {
  return (
    <div className="App">
      <MainAppBar/>
      <header className="App-header">
      <LoginTab/>
      </header>
      
    </div>
  );
}

export default App;
