import React from 'react';
import './App.css';
import MainAppBar from './Menu'
import LoginTab from './Login'
// import Vol_Table from './Volunteers'
import AutoTable from './AutoTable'
import { useCookies} from 'react-cookie'



function App() {
  // const [loggedIn, setLoggedIn] = React.useState(0)
  const [cookie, setCookie] = useCookies(["user_level"]);
  console.log("Logged status: ",cookie)
  


  return (
    

    <div className="App" style={{
      backgroundColor: "rgb(239, 230, 215)"
    }}>
      < MainAppBar setLogged = {(status)=>{ setCookie("user_level", status, { path: '/' }) }} loggedIn = {cookie.user_level>0}/>
      <LoginTab setLogged = {(status)=>{ setCookie("user_level", status, { path: '/' }) }} loggedIn = {cookie.user_level>0} />

        
      
      <div className="App-MainContents">
        {/* <Vol_Table loggedIn = {cookie.user_level}/> */}
        <AutoTable url = {"http://"+window.location.hostname+":3000/manager/getVolunteers"}>
          Volunteers
        </AutoTable>
        <AutoTable url = {"http://"+window.location.hostname+":3000/manager/getFreezerManager"}>
          Freezer Managers
        </AutoTable>
        <AutoTable url = {"http://"+window.location.hostname+":3000/manager/getDeliveries"}>
          Deliveries
        </AutoTable>
      </div>
      
    </div>
  );
}

export default App;
