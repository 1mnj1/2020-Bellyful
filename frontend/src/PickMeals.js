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
            <Paper>Hello World</Paper>
        </div>
    )
}

export default PickMeals;