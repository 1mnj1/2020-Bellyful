import React from 'react';
import './App.css';
import MainAppBar from './Menu'
import LoginTab from './Login'
// import Vol_Table from './Volunteers'
import AutoTable from './AutoTable'
import { useCookies} from 'react-cookie'
import Reporting from './Reporting'


function App() {
  // const [loggedIn, setLoggedIn] = React.useState(0)
  const [cookie, setCookie] = useCookies(["user_level"]);
  const [page,setPage] = React.useState(0)
  console.log("Logged status: ",cookie)
  


  return (
    

    <div className="App" style={{
      backgroundColor: "rgb(239, 230, 215)"
    }}>
      < MainAppBar  setPage = {setPage} setLogged = {(status)=>{ setCookie("user_level", status, { path: '/' }) }} loggedIn = {cookie.user_level}/>
      <LoginTab setLogged = {(status)=>{ setCookie("user_level", status, { path: '/' }) }} loggedIn = {cookie.user_level>0} />

      {page == 1 && cookie.user_level>2 ? <Reporting/> : null}
      
    </div>
  );
}

export default App;
