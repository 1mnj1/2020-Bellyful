import React from 'react';
import './App.css';
import MainAppBar from './Menu'
import LoginTab from './Login'
import { useCookies} from 'react-cookie'
import Reporting from './Reporting'
import DelivererPortal from './DelivererPortal'
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive'
import LocalShippingIcon from '@material-ui/icons/LocalShipping'
import AcUnitIcon from '@material-ui/icons/AcUnit'
import PersonIcon from '@material-ui/icons/Person'

const useStyles = makeStyles({
  root: {
    width: '100%',
    position: 'fixed',
    bottom: 0
  },
});

function App() {

  // const [loggedIn, setLoggedIn] = React.useState(0)
  const [cookie, setCookie] = useCookies(["user_level"]);
  const [page,setPage] = React.useState(0)
  console.log("Logged status: ",cookie)
  const resetPage = (newPage)=>(page == newPage? setPage(0) : setPage(newPage))

  //Used for the Navigation Drawer
  const classes = useStyles();
  const [value, setValue] = React.useState('pending');
  const handleChange = (event, newValue) => {
      setValue(newValue);
  }

  
//For more information follow    https://material-ui.com/components/bottom-navigation/#bottom-navigation

  const DelivererNavigation = (
    <BottomNavigation value={value} onChange={handleChange} className={classes.root}>
        <BottomNavigationAction lable="New Deliveries" value="new" icon={<NotificationsActiveIcon/>}/>
        <BottomNavigationAction lable="Deliveries" value="deliveries" icon={<LocalShippingIcon/>}/>
        <BottomNavigationAction lable="Freezers" value="freezers" icon={<AcUnitIcon/>}/>
        <BottomNavigationAction lable="My Profile" value="profile" icon={<PersonIcon/>}/>
    </BottomNavigation>
  )


  return (
    

    <div className="App" style={{
      backgroundColor: "rgb(239, 230, 215)"
    }}>
      < MainAppBar  setPage = {resetPage} setLogged = {(status)=>{ setCookie("user_level", status, { path: '/' }) }} loggedIn = {cookie.user_level}/>
      {/* ONLY THE LOGIN PAGE IS DISPLAYED IF THE USER LEVEL IS 0 */}
      {cookie.user_level!=0 ? null: <LoginTab setLogged = {(status)=>{ setCookie("user_level", status, { path: '/' }) }} loggedIn = {cookie.user_level>0} />}

      {page == 1 && cookie.user_level>2 ? <Reporting/> : null}
      {/* Navigation will only show when on the DeliveryPortal Page */}
      {page == 2 && cookie.user_level>2 ? DelivererNavigation : null}
      {/* {page == 2 && cookie.user_level>2 ? <DelivererPortal tabPageNumber = {value}/> : null} */}
      
    </div>
  );
}

export default App;
