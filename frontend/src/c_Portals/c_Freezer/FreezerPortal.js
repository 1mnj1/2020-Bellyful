import React from 'react';
import PropTypes from 'prop-types';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SwipeableViews from 'react-swipeable-views';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import $ from 'jquery'

import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive'
import LocalShippingIcon from '@material-ui/icons/LocalShipping'

import { makeStyles, useTheme } from '@material-ui/core/styles';

import FreezerLog from './FreezerLog';
import FreezerManagers from './FreezerManagers';

const useStyles = makeStyles((theme) => ({
    Navigation_root: {
      width: '100%',
      position: 'fixed',
      bottom: 0
    },
    root: {
        // backgroundColor: 'rgb(239, 230, 215)',
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

    const [value, setValue] = React.useState(1);
    const [branchManagers, setBranchManagers] = React.useState({
        columns: [ {}, ],
        data: [  ],
        branchManagerClicked: null,
        freezerManagerId: null,
        hidden: []
    })

    const [branchID, setBranchID] = React.useState(null)


    const handleChange = (event, newValue) => {
        console.log("Set Value to : " + newValue);
        setValue(newValue);
    }
    const handleChangeIndex = (index) => {
        setValue(index);
    }

    React.useEffect(()=>{
        console.log("Testng use affect: ",  props.user_id)
        $.post( "http://"+window.location.hostname+":3000/volunteer/getBranch",[{name: "vol_id", value: props.user_id}], function(returnable) {
            if(returnable === null) return 
            if (returnable === undefined) return 
            if(returnable.length === 0) return

            $(setBranchID(returnable))
            return
             
    })}, [props.user_id]);
    React.useEffect(()=>{
        setValue(1)    
    }, [props.user_id]);
    //For more information follow    https://material-ui.com/components/bottom-navigation/#bottom-navigation

    return (
        <div>
            {props.user_level > 1 ?
            <div className={classes.root}>
                <SwipeableViews
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={value}
                    onChangeIndex={handleChangeIndex}
                >
                    <TabPanel value={value} index={0} dir={theme.direction}>

                       {/* <FreezerManagers title="Freezer Managers" url={"http://"+window.location.hostname+":3000/volunteers/getFreezerManagers"}> */}
                
                    {/* {branchManagers.branchManagerClicked == null */}
                        <FreezerManagers 
                            title="Freezer Managers" 
                            state = {branchManagers} 
                            setState = {setBranchManagers}
                            user_id = {props.user_id}
                            branch_id = {branchID}
                            delivery_id = {-1}
                            // url={"http://"+window.location.hostname+":3000/volunteer/getFreezerManagers"}>
                            url={"http://"+window.location.hostname+":3000/volunteer/getFreezerManagers2"}>
                        </FreezerManagers>
                    
                        
                    </TabPanel>
                    <TabPanel value={value} index={1} dir={theme.direction}>

                       {/* <FreezerManagers title="Freezer Managers" url={"http://"+window.location.hostname+":3000/volunteers/getFreezerManagers"}> */}
                
                    {/* {branchManagers.branchManagerClicked == null */}
                        <FreezerManagers 
                            title="Volunteer Freezers" 
                            state = {branchManagers} 
                            setState = {setBranchManagers}
                            user_id = {props.user_id}
                            branch_id = {branchID}
                            delivery_id = {-2}
                            reload = {1}
                            setReload = {(num)=>0}
                            // url={"http://"+window.location.hostname+":3000/volunteer/getFreezerManagers"}>
                            url={"http://"+window.location.hostname+":3000/volunteer/getFreezerManagers2"}>

                    

                        </FreezerManagers>
                    
                        
                    </TabPanel>
                    <TabPanel value={value} index={2} dir={theme.direction}>

                        <FreezerLog 
                            delivery_id = {-1}
                            title = "Freezer Log" 
                            url = {"http://"+window.location.hostname+":3000/volunteer/getFreezerLog"}
                            user_id = {props.user_id}>
                        </FreezerLog>

                    </TabPanel>

                </SwipeableViews>
                <AppBar position="static" color="default" className={classes.Navigation_root}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="secondary"
                    textColor="secondary"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                    >
                    <Tab hidden = "true" label="Freezer Managers" icon={<NotificationsActiveIcon/>} {...a11yProps(0)} />
                    <Tab label="Volunteer Freezer" icon={<LocalShippingIcon/>} {...a11yProps(1)} />
                    

                    </Tabs>
                </AppBar>
                </div> : 
                
                
                <FreezerManagers 
                            title="Volunteer Freezers" 
                            state = {branchManagers} 
                            setState = {setBranchManagers}
                            user_id = {props.user_id}
                            branch_id = {branchID}
                            delivery_id = {-2}
                            reload = {branchID}
                            setReload = {(num)=>0}
                            // url={"http://"+window.location.hostname+":3000/volunteer/getFreezerManagers"}>
                            url={"http://"+window.location.hostname+":3000/volunteer/getFreezerManagers2"}>

                    

                        </FreezerManagers>}
        </div>
        
        

    );
}

export default FreezerPortal;
