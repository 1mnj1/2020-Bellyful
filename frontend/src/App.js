import React from 'react';
import logo from './logo.svg';
import './App.css';
import MainAppBar from './Menu'
import LoginTab from './LoginExample'
import Vol_Table from './Volunteers'


function App() {
  const [loggedIn, setLoggedIn] = React.useState(0)
  console.log("Logged status: ",loggedIn)


  return (
    
    <div className="App" style={{
      backgroundColor: 'pink'
    }}>
      < MainAppBar/>
      <header className="App-header">
      <LoginTab setLogged = {setLoggedIn} loggedIn = {loggedIn>0} />
      </header>
      
    </div>
  );
}

export default App;
