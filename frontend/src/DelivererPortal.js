import React from 'react';




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
        <div className="App-MainContents">
            DelivererNavigation
        </div>
        

    );
}

export default DelivererPortal;
