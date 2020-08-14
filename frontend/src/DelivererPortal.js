import React from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive'
import LocalShippingIcon from '@material-ui/icons/LocalShipping'
import AcUnitIcon from '@material-ui/icons/AcUnit'
import PersonIcon from '@material-ui/icons/Person'

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
      width: '100%',
      position: 'fixed',
      bottom: 0
    },
  });


function DelivererPortal() {

  
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
        
        DelivererNavigation
        

    );
}

export default DelivererPortal;
