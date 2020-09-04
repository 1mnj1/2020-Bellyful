import React from 'react'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';

import FreezerManagers from './FreezerManagers'

function PickMeals(props) {
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

    const [branchManagerClicked, setBranchManagerClicked] = React.useState(-1);
    const [freezerManagerId, setFreezerManagerId] = React.useState(-1);

    const [branchManagers, setBranchManagers] = React.useState({
        columns: [ {}, ],
        data: [  ],
        branchManagerClicked: null,
        freezerManagerId: null,
        hidden: []
    })


    return(
        <div>
            <div >
                    <HideOnScroll {...props}>
                        <AppBar position="sticky" style = {{marginTop: "-3vh", backgroundColor: "#865172"}} onClick = {()=>{props.resetDelivery()}}>
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
                <FreezerManagers
                    title = "Freezer Managers from Pick Meal page"
                    url={"http://"+window.location.hostname+":3000/volunteer/getFreezerManagers2"}
                    user_id = {props.user_id}
                    state = {branchManagers} 
                    setState = {setBranchManagers}
                    // delivery_id = {props.delivery_id}
                    delivery_id = {1}
                >

                </FreezerManagers>
        </div>
    )
}

export default PickMeals;