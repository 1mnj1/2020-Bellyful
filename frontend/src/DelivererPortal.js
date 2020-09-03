import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
// import BottomNavigation from '@material-ui/core/BottomNavigation';
// import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SwipeableViews from 'react-swipeable-views';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import $ from 'jquery'
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive'
import LocalShippingIcon from '@material-ui/icons/LocalShipping'
import AcUnitIcon from '@material-ui/icons/AcUnit'
import PersonIcon from '@material-ui/icons/Person'

import { makeStyles, useTheme } from '@material-ui/core/styles';
import UnassignedDeliveries from './UnassignedDeliveries';

import MyOustanding from './MyOutstanding'
import PickMeals from './PickMeals'
import DynamicComponent from './Dynamic';
import MyConfirmed from './MyConfirmed'
import DeliveryDriving from './DeliveryDriving'

const useStyles = makeStyles((theme) => ({
    Navigation_root: {
      width: '100%',
      position: 'fixed',
      bottom: 0
    },
    root: {
        backgroundColor: 'rgb(239, 230, 215)',
        flexGrow: 1
    },
    fullPanel : {
        width :'100%',
        height : '100%',
        backgroundColor : 'blue'
    }

}));

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
        >
        {value === index && (
            <Box p={3}>
            <Typography>{children}</Typography>
            </Box>
        )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };

function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  
function DelivererPortal(props) {

  
    //Used for the Navigation Drawer
    const classes = useStyles();
    const theme = useTheme();

    //Portal has global deliveryID, if it is -1 then no delivery is selected, else = Del ID of selected delivery
    const [deliveryID, setdeliveryID] = React.useState(-1);
    const [myOustanding, setMyOutstanding] = React.useState({
            visible: null,
            columns: [ {}, ],
            data: [  ],
        });
    const [myConfirmed, setMyConfirmed] = React.useState({
        columns: [ {}, ],
        data: [  ],
        deliveryID: null
    });

    const [value, setValue] = React.useState('0');
    const [branchID, setBranchID] = React.useState(null)
    const handleChange = (event, newValue) => {
        console.log("Set Value to : " + newValue);
        console.log("DeliveryID for Portal = ", deliveryID)
        setValue(newValue);
    }

    const handleChangeIndex = (index) => {
        setValue(index);
    }

    React.useEffect(()=>{
        $.post( "http://"+window.location.hostname+":3000/volunteer/getBranch",[{name: "vol_id", value: props.user_id}], function(returnable) {
            if(returnable === null) return 
            if (returnable === undefined) return 
            if(returnable.length === 0) return
            $(setBranchID(returnable))
            return
             
    })}, [props.user_id]);
    //For more information follow    https://material-ui.com/components/bottom-navigation/#bottom-navigation
    

    return (
        <div className={classes.root}>
            
                
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}
            >
                <TabPanel value={value} index={0} dir={theme.direction}>
                        {/* Assigned Deliveries */}
                        <UnassignedDeliveries 

                            title = "Branch Outstanding" 
                            url = {"http://"+window.location.hostname+":3000/volunteer/getNewDeliveries"}
                            user_id = {props.user_id}
                            branch_id = {branchID}
                        >
                    </UnassignedDeliveries>
                    
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>

                    {deliveryID > -1 ? 
                        <PickMeals del_ID = {deliveryID} user_id = {props.user_id} resetDelivery = {()=>setdeliveryID(-1)}></PickMeals>
                        : 
                        <MyOustanding user_id = {props.user_id} title = "My Outstanding" 
                        setdeliveryID = {setdeliveryID}
                        url = {"http://"+window.location.hostname+":3000/volunteer/getToContactDeliveries"}
                        myOustanding = {myOustanding} setMyOutstanding = {setMyOutstanding}/>
                    }
                </TabPanel>
                <TabPanel value={value} index={2} dir={theme.direction}>
                        
                    {myConfirmed.deliveryID == null ? 
                        <MyConfirmed 
                        state = {myConfirmed} 
                        setState = {setMyConfirmed}
                        user_id = {props.user_id} title = "My confirmed" 
                        url = {"http://"+window.location.hostname+":3000/volunteer/getAssignedIntransit"}/>
                        
                        : deliveryID > -1 ? 
                            <PickMeals del_ID = {deliveryID} user_id = {props.user_id} resetDelivery = {()=>setdeliveryID(-1)}></PickMeals>
                            : <DeliveryDriving  
                                delivery_id = {myConfirmed.deliveryID} 
                                confirmedState = {myConfirmed}
                                setConfirmedState = {setMyConfirmed}
                                setdeliveryID = {setdeliveryID}/>
                            }
                </TabPanel>
                <TabPanel value={value} index={3} dir={theme.direction}>
                    Item Three
                </TabPanel>
                
            </SwipeableViews>
            
            
            <AppBar position="static" color="default" className={classes.Navigation_root}>
            <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
                aria-label="full width tabs example"
                >
                <Tab label="Branch Outstanding" icon={<NotificationsActiveIcon/>} {...a11yProps(0)} />
                <Tab label="My Outstanding" icon={<LocalShippingIcon/>} {...a11yProps(1)} />
                <Tab label="My Confirmed" icon={<AcUnitIcon/>} {...a11yProps(2)} />
                <Tab label="Profile" icon={<PersonIcon/>} {...a11yProps(3)} />
                </Tabs>
            </AppBar>
        </
        div>

    );
}

export default DelivererPortal;
