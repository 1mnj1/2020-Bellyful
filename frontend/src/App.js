import React from 'react';
import './App.css';
import MainAppBar from './Menu'
import LoginTab from './Login'
import { useCookies} from 'react-cookie'
import Reporting from './Reporting'
// import DelivererPortal from './DelivererPortal'
import DeliveryReporting from './DeliveryReporting'


import RecipientForm from './RecipientForm'



const pageIndex = require('./pageIndexer')

function App() {

  // const [loggedIn, setLoggedIn] = React.useState(0)
  const [cookie, setCookie] = useCookies(["user_level"]);
  const [page,setPage] = React.useState(0)
  console.log("Logged status: ",cookie)
  const resetPage = (newPage)=>(page === newPage? setPage(0) : setPage(newPage))


  
//For more information follow    https://material-ui.com/components/bottom-navigation/#bottom-navigation

  
  return (
    

    <div className="App" style={{
      backgroundColor: "rgb(239, 230, 215)"
    }}>
      < MainAppBar  setPage = {resetPage} setLogged = {(status)=>{ setCookie("user_level", status, { path: '/' }) }} loggedIn = {cookie.user_level}/>
      {/* ONLY THE LOGIN PAGE IS DISPLAYED IF THE USER LEVEL IS 0 */}
      {/* eslint-disable-next-line*/}
      {cookie.user_level!=0 ? null: <LoginTab setLogged = {(status)=>{ setCookie("user_level", status, { path: '/' }) }} loggedIn = {cookie.user_level>0} />}
      {page === pageIndex["deliveryreporting"] && cookie.user_level>2 ? <DeliveryReporting/> : null}
      {page === pageIndex["reporting"] && cookie.user_level>2 ? <Reporting/> : null}
      <RecipientForm/>
    </div>
  );
}

export default App;
