import React from 'react';
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
import FreezerLog from './FreezerLog';
import FreezerManagers from './FreezerManagers';
import FreezerManagerDetail from './FreezerManagerDetail';

const useStyles = makeStyles((theme) => ({
    Navigation_root: {
      width: '100%',
      position: 'fixed',
      bottom: 0
    },
    root: {
        backgroundColor: 'rgb(239, 230, 215)',
        flexGrow: 1
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


  
function FreezerPortal(props) {

  
    //Used for the Navigation Drawer
    const classes = useStyles();
    const theme = useTheme();


    const [value, setValue] = React.useState('0');
    //Portal has global deliveryID, if it is -1 then no delivery is selected, else = Del ID of selected delivery
    const [deliveryID, setdeliveryID] = React.useState(-1);


    const [myConfirmed, setMyConfirmed] = React.useState({
        columns: [ {}, ],
        data: [  ],
        deliveryID: null
    });

    const [branchManagerClicked, setBranchManagerClicked] = React.useState(-1);
    const [freezerManagerId, setFreezerManagerId] = React.useState(-1);

    const [branchManagers, setBranchManagers] = React.useState({
        columns: [ {}, ],
        data: [  ],
        branchManagerClicked: null,
        freezerManagerId: null
    })

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
    

    
    //For more information follow    https://material-ui.com/components/bottom-navigation/#bottom-navigation

    return (
        <>
        <div className={classes.root}>
            {/* <BottomNavigation value={value} onChange={handleChange} className={classes.Navigation_root}>
                <BottomNavigationAction lable="New Deliveries" value="0" icon={<NotificationsActiveIcon/>} {...a11yProps(0)}/>
                <BottomNavigationAction lable="Deliveries" value="1" icon={<LocalShippingIcon/>} {...a11yProps(1)}/>
                <BottomNavigationAction lable="Freezers" value="2" icon={<AcUnitIcon/>} {...a11yProps(2)}/>
                <BottomNavigationAction lable="My Profile" value="3" icon={<PersonIcon/>} {...a11yProps(3)}/>
            </BottomNavigation> */}
            
                
                <SwipeableViews
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={value}
                    onChangeIndex={handleChangeIndex}
                >
                    <TabPanel value={value} index={0} dir={theme.direction}>

                        <UnassignedDeliveries title = "Assigned Deliveries" url = {"http://"+window.location.hostname+":3000/volunteer/getNewDeliveries"}>
                        </UnassignedDeliveries>       

                    </TabPanel>
                    <TabPanel value={value} index={1} dir={theme.direction}>

                       {/* <FreezerManagers title="Freezer Managers" url={"http://"+window.location.hostname+":3000/volunteers/getFreezerManagers"}> */}


                
                    {branchManagers.branchManagerClicked == null? 
                        <FreezerManagers 
                            title="Freezer Managers" 
                            state = {branchManagers} 
                            setState = {setBranchManagers}
                            user_id = {props.user_id}
                            branch_id = {branchID}
                            // url={"http://"+window.location.hostname+":3000/volunteer/getFreezerManagers"}>
                            url={"http://"+window.location.hostname+":3000/volunteer/getFreezerManagers2"}>
                        </FreezerManagers>
                        // <MyConfirmed 
                        // state = {myConfirmed} 
                        // setState = {setMyConfirmed}
                        // user_id = {props.user_id} title = "My confirmed" 
                        // branch_id = {branchID}
                        // url = {"http://"+window.location.hostname+":3000/volunteer/getAssignedIntransit"}/>
                        
                        :  
                    
                    // branchManagerClicked > -1 ?
                        <FreezerManagerDetail 
                            title = 'Freezer Manager Detail Page'
                            url={"http://"+window.location.hostname+":3000/volunteer/getFreezerLog"}
                            // person_id = {freezerManagerId}
                            delivery_id = {branchManagers.branchManagerClicked} 
                            person_id = {branchManagers.freezerManagerId} 
                            // freezerManagerId = {freezerManagerId}
                            confirmedState = {branchManagers}
                            setConfirmedState = {setBranchManagers}
                            setdeliveryID = {setBranchManagerClicked}
                        >
                    
                        </FreezerManagerDetail> 
                    }
                        
                    
{/* 
                    ////// ADDED   
                    // {myConfirmed.deliveryID == null? 
                    //     <MyConfirmed 
                    //     state = {myConfirmed} 
                    //     setState = {setMyConfirmed}
                    //     user_id = {props.user_id} title = "My confirmed" 
                    //     branch_id = {branchID}
                    //     url = {"http://"+window.location.hostname+":3000/volunteer/getAssignedIntransit"}/>:  
                    
                    // deliveryID > -1 ? 
                    //     <PickMeals del_ID = {deliveryID} user_id = {props.user_id} resetDelivery = {()=>setdeliveryID(-1)}></PickMeals>
                    //     :
                    //     <DeliveryDriving  
                    //         delivery_id = {myConfirmed.deliveryID} 
                    //         confirmedState = {myConfirmed}
                    //         setConfirmedState = {setMyConfirmed}
                    //         setdeliveryID = {setdeliveryID}/>
                    //     }
                    ////// ADDED   */}

                    </TabPanel>
                    <TabPanel value={value} index={2} dir={theme.direction}>

                        <FreezerLog 
                            title = "Freezer Log" 
                            url = {"http://"+window.location.hostname+":3000/volunteer/getFreezerLog"}
                            user_id = {props.user_id}>
                        </FreezerLog>

                    </TabPanel>
                    <TabPanel value={value} index={3} dir={theme.direction}>

                        <FreezerManagers title="Freezer Managers" url={"http://"+window.location.hostname+":3000/volunteer/getFreezerManagers222"}>
                       </FreezerManagers>

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
                    <Tab label="Test 1" icon={<NotificationsActiveIcon/>} {...a11yProps(0)} />
                    <Tab label="Test 2 " icon={<LocalShippingIcon/>} {...a11yProps(1)} />
                    <Tab label="Freezers" icon={<AcUnitIcon/>} {...a11yProps(2)} />
                    <Tab label="Profile" icon={<PersonIcon/>} {...a11yProps(3)} />
                    </Tabs>
                </AppBar>
                </div>
        </>
        
        

    );
}

export default FreezerPortal;
