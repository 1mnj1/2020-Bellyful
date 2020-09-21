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

import $ from 'jquery'

import Slide from '@material-ui/core/Slide';
import React from 'react'
import DeliveryStartStop from './DeliveryStartStop'
import DeliveryMap from './DeliveryMap'
import DeliveryDetail from './DeliveryDetail'
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
export default function  DeliveryDriving(props) {

    console.log('Inside delivery driving function');
    function HideOnScroll(props) {
        const { children, window } = props;
        // Note that you normally won't need to set the window ref as useScrollTrigger
        // will default to window.
        // This is only being set here because the demo is in an iframe.
        const trigger = useScrollTrigger({ target: window ? window() : undefined });
      
        return (
          <Slide appear={false} direction="down" in={!trigger}>
            {children}
          </Slide>
        );
      }
      const [address, setAddress] = React.useState()
      React.useEffect(()=>{
        console.log("Delivery ID: ", props.delivery_id)
        $.post("http://"+window.location.hostname+":3000/volunteer/getMapAddresses",[{"name":"delivery_id", "value":props.delivery_id}],(returnable)=>{
            // console.log("Meal Detials: ",returnable)
            if(returnable === null) return 
            if (returnable === undefined) return 
            if(returnable.length === 0) return  
            $(setAddress(returnable))
        })

    }, [props.delivery_id])

    
    const removeDelivery = ()=>
    {
      var del_id = props.delivery_id
      var oldState = {...props.confirmedState}
      for (var i = 0; i < oldState.data.length; ++i){
        if(oldState.data[i][props.confirmedState.columns[0]] == del_id){
          oldState.data.splice(i, 1)
          break
        }

      }
      oldState.deliveryID = null
      props.setConfirmedState(oldState)
      
    }

    return (
        <div>  
            <div >
                <HideOnScroll {...props}>
                    <AppBar position="sticky" style = {{marginTop: "-3vh", width: "100vw", backgroundColor: "#865172"}} onClick = {()=>{props.setConfirmedState({...props.confirmedState, deliveryID:null})}}>
                        <Toolbar component = "div">
                        <IconButton 
                            edge="start" 
                            color="inherit"
                            aria-label="menu" 
                            >
                            <ArrowBackIosIcon />
                        </IconButton>
                        <Typography variant="h6" >
                            Back
                        </Typography>
                        </Toolbar>
                    </AppBar>
                </HideOnScroll>
            </div>
            <div style = {{paddingTop: "3vh", paddingBottom: "10vh", overflowX: "hidden"}}>
                <DeliveryStartStop delivery_id = {props.delivery_id}/>
                <div style = {{    background: "white",
                    marginLeft: "3%",
                    marginBottom: "1%",
                    marginTop: "1%",
                    paddingLeft: "2%"}}>
                    <Typography variant="h4">
                        Delivery Details
                    </Typography>    
                    <DeliveryDetail 
                    
                    setdeliveryID = {props.setdeliveryID} 
                    reloadPage = {removeDelivery} 
                    delivery_id ={props.delivery_id} 
                    phone = {"02102202041"} 
                    email = {"Bruh@gmail.com"}/>
                </div>
            </div>

        </div>

    )





}







