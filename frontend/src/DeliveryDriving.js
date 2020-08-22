// Delivery Driving is designed so that the deliverer can get to and from their destination with ease
// It consists of three parts:
//  - Form for the delivery start and delivery stop
//  - Google map conisisting of all the waypoints between the users current location, the freezers they need to pick up their food, and the recipients address.
// Finally the delivery details page which will be the same as the MY Outstanding page

// There are a series of props which is required for the delivery:
//  Delivery ID
//  volunteer ID


// There needs to be a state variable which checks to see that the button has been started; 
//  *if it has, the start button writes "Stop" instead.
// There needs to be a variable for the users current position





import React from 'react'
import DeliveryStartStop from './DeliveryStartStop'
import DeliveryMap from './DeliveryMap'
import DeliveryDetail from './DeliveryDetail'
import Typography from '@material-ui/core/Typography';

export default function  DeliveryDriving(props) {




    return (
        <div>

            <DeliveryStartStop delivery_id = {props.delivery_id}/>
            <DeliveryMap addressDetails = {[{address:"21 springwater vale unsworth heights auckland", type: "Start"},
           {address:"1 springwater vale unsworth heights auckland", type: "Freezer"},
           {address:"Massey University, Dairy Flat, Albany, Auckland", type:"Recipient"}]}/>
           <div style = {{    background: "white",
                marginLeft: "3%",
                marginBottom: "1%",
                marginTop: "1%",
                paddingLeft: "2%"}}>
                <Typography variant="h4">
                    Delivery Details
                </Typography>    
                <DeliveryDetail 
                reloadPage = {()=>{}} 
                delivery_id ={1} 
                phone = {"02102202041"} 
                email = {"Bruh@gmail.com"}/>
            </div>

        </div>

    )





}







