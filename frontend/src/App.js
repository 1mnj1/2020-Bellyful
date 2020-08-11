import React from 'react';
import './App.css';
import MainAppBar from './Menu'
import LoginTab from './LoginExample'
import Vol_Table from './Volunteers'
import AutoTable from './AutoTable'
import { useCookies} from 'react-cookie'


function App() {
  // const [loggedIn, setLoggedIn] = React.useState(0)
  const [cookie, setCookie] = useCookies(["user_level"]);
  console.log("Logged status: ",cookie)



  return (
    <div className="App">
      < MainAppBar setLogged = {(status)=>{ setCookie("user_level", status, { path: '/' }) }} loggedIn = {cookie.user_level>0}/>
      <header className="App-header">
      <LoginTab setLogged = {(status)=>{ setCookie("user_level", status, { path: '/' }) }} loggedIn = {cookie.user_level>0} />
      </header>
      {/* <Vol_Table loggedIn = {cookie.user_level}/> */}

      
      <AutoTable/>


     
      
    </div>
  );
}

export default App;
