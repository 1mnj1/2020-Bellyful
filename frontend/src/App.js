import React from 'react';
import { useCookies} from 'react-cookie'
import './App.css';
import MainAppBar from './c_Navigation/Menu'
import LoginTab from './c_Navigation/Login'
import Reporting from './c_WebApp/Reporting'
import DelivererPortal from './c_Portals/c_Delivery/DelivererPortal'
import DeliveryReporting from './c_WebApp/DeliveryReporting'
import FreezerPortal from './c_Portals/c_Freezer/FreezerPortal'
import ProfilePage from './c_Portals/ProfilePage'
import {theme}  from './theme'
import {ThemeProvider} from '@material-ui/core'

const pageIndex = require('./c_Navigation/pageIndexer')

function App() {
  // const [loggedIn, setLoggedIn] = React.useState(0)
  const [cookie, setCookie] = useCookies(["user_level"]);
  
  console.log(cookie.user_level)
  
  const [page,setPage] = React.useState(0)
  const resetPage = (newPage)=>(page === newPage? setPage(0) : setPage(newPage))

  
  if(cookie.user_level === undefined || cookie.user_level == null){
    setCookie("user_level", [0,-1], { path: '/' }) 
    return null
  }

  function greeting() {
    var greeting
    var date = new Date()
    var hour = date.getHours()

    if (hour < 12) {
      greeting = "Good Morning"
    } else if (hour < 17) {
      greeting = "Good Afternoon"
    } else {
      greeting = "Good Evening"
    }
    return greeting
  }

  return (
    
    <ThemeProvider theme={theme}>
      <div className="App">
        < MainAppBar setPage = {resetPage} setLogged = {(status)=>{ setCookie("user_level", status, { path: '/' }) }} loggedIn = {cookie.user_level[0]}/>
        {/* ONLY THE LOGIN PAGE IS DISPLAYED IF THE USER LEVEL IS 0 */}
        {/* eslint-disable-next-line*/}
        {cookie.user_level[0]!=0? null: <LoginTab setLogged = {(status)=>{ setCookie("user_level", status, { path: '/' }) }} loggedIn = {cookie.user_level[0]>0} />}
        {page === pageIndex["deliveryreporting"] && cookie.user_level[0]>2 ? <DeliveryReporting/> : null}
        {page === pageIndex["reporting"] && cookie.user_level[0]>2 ? <Reporting/> : null}
        {page === pageIndex["freezerportal"] && cookie.user_level[0]>=1 ? <FreezerPortal user_id = {cookie.user_level[1]} user_level = {cookie.user_level[0]}/> : null}
        {page === pageIndex["delivererportal"] && cookie.user_level[0]>=1 ? <DelivererPortal user_id = {cookie.user_level[1]}/> : null}
        {page === pageIndex["profile"] && cookie.user_level[0]>=1 ? <ProfilePage user_id = {cookie.user_level[1]}/> : null}
        {/* {page === pageIndex["base"] && cookie.user_level[0]>=1 ? <DeliveryDriving  delivery_id = {1} />: null}  */}
        
      </div>
    </ThemeProvider>
  );
}

export default App;
