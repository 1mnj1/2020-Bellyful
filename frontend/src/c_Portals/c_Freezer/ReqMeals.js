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
import AcUnitIcon from '@material-ui/icons/AcUnit'
import PersonIcon from '@material-ui/icons/Person'

import { makeStyles, useTheme } from '@material-ui/core/styles';
//import UnassignedDeliveries from './UnassignedDeliveries';
import FreezerLog from './FreezerLog';
import FreezerManagers from './FreezerManagers';
import FreezerManagerDetail from './FreezerManagerDetail';


export default function AllReqMeals (props) {
    const [requiredMeals,setrequiredMeals ] = React.useState({
        data: [],
        columns: [],
        req_meals: "0"
    })

    React.useEffect(()=>{
    console.log("delivery_id: ", props.delivery_id)
    $.post("http://"+window.location.hostname+":3000/volunteer/getMealsRequired",[{"name":"delivery_id", "value":props.delivery_id}],(returnable)=>{
        // console.log("Meal Detials: ",returnable)
        if(returnable === null) return 
        if (returnable === undefined) return 
        var fields = Object.keys(returnable[0])
        $(setrequiredMeals(requiredMeals => ({ ...requiredMeals,columns:fields, data : returnable})))
    })
    

    }, [props.user_id])
    const renderMeals = (stateObject)=>{
    return stateObject.data.map((row)=>{
        
        return (
            
            <React.Fragment>
                    <Typography
                        component="span"
                        variant="body2"
                        style = {{"textAlign" : "left"}}
                        color="textPrimary"
                    >
                    <b> {row[stateObject.columns[0]]}:   x {row[stateObject.columns[1]]}</b><br/>
                    </Typography>     
            </React.Fragment> 
        ) 
    })               
    }
    return (
        <div>
            {renderMeals(requiredMeals)}
        </div>
    )
}
