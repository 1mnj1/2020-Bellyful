import React from 'react';
import AutoTable from './AutoTable'
// import CreateDeliveryNavigation from './CreateDeliveryNavigation'
import VolunteerForm from '../c_Forms/VolunteerForm';
import $ from 'jquery'
import FreezerForm from '../c_Forms/FreezerForm';
import { makeStyles } from '@material-ui/core/styles';
import {Typography, List, ListItem} from '@material-ui/core'

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  
  mainview : {
    width : '75%',
    float : 'right',
    padding : '2.5%',
    height : '100vh',
    overflow : 'scroll',
  },
  sidebar : {
    width : '25%',
    float : 'left',
    backgroundColor : 'white',
    height : '100vh',
    border : 'none',
    borderColor : 'gray',
    borderRightStyle : 'none',
    ...theme.typography.h5,
    
  },
  root : {
    
  },
  list : {

  },
  listItem : {
    padding : '5vh',
  }
}));

function Reporting() {
  
  const classes = useStyles();

  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  
  return (
        //reporting screen
      <div className = {classes.root}>
        <div className = {classes.sidebar}>        
          <List component = 'nav' >
            <ListItem button selected = {selectedIndex == 0} 
            onClick = {(event) => handleListItemClick(event, 0)} className = {classes.listItem} onClick>Dashboard</ListItem>
            <ListItem button selected = {selectedIndex == 1} 
            onClick = {(event) => handleListItemClick(event, 1)} className = {classes.listItem}>Delivery Queue</ListItem>
            <ListItem button selected = {selectedIndex == 2} 
            onClick = {(event) => handleListItemClick(event, 2)} className = {classes.listItem}>Reporting</ListItem>
            <ListItem button selected = {selectedIndex == 3} 
            onClick = {(event) => handleListItemClick(event, 3)} className = {classes.listItem}>Volunteers</ListItem>
            <ListItem button selected = {selectedIndex == 4} 
            onClick = {(event) => handleListItemClick(event, 4)} className = {classes.listItem}>Account</ListItem>
          </List>
        </div>
        <div className={classes.mainview}>
          
        </div>
      </div>
      
      

  );
}

export default Reporting;
