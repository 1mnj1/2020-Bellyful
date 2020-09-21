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
import $ from 'jquery'
import FreezerManagers from '../c_Freezer/FreezerManagers'


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
    const [state,setState ] = React.useState({
        data: [],
        columns: [],
        req_meals: "0"
    })
    const [requiredMeals,setrequiredMeals ] = React.useState({
        data: [],
        columns: [],
        req_meals: "0"
    })
    const [reloadMeals,setReloadMeals] = React.useState(0)
    React.useEffect(()=>{
        $.post("http://"+window.location.hostname+":3000/volunteer/getMealsRequired",[{"name":"delivery_id", "value":props.del_ID}],(returnable)=>{
            // console.log("Meal Detials: ",returnable)
            if(returnable === null) return 
            if (returnable === undefined) return 
            var fields = Object.keys(returnable[0])
            $(setrequiredMeals(requiredMeals => ({ ...requiredMeals,columns:fields, data : returnable})))
        })

    }, [props.delivery_id])
    React.useEffect(()=>{
        $.post("http://"+window.location.hostname+":3000/volunteer/getMealsForDelivery",[{"name":"delivery_id", "value":props.del_ID}],(returnable)=>{
            // console.log("Meal Detials: ",returnable)
            if(returnable === null) return 
            if (returnable === undefined) return 
            if(returnable.length === 0) return  
            var fields = Object.keys(returnable[0])
            $(setState(state => ({ ...state,columns:fields, data : returnable})))
        })

    }, [props.delivery_id, reloadMeals])
    console.log("State data: ", state.data)
    //render the meals, this returns a series of items
    const renderMeals = (stateObject)=>{
        console.log("STATEDATA: ",stateObject.data)
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
    const mobileCheck = function() {
        
        return window.screen.width < 620
      };

    const handleReload = (reloadBool)=>{
        console.log("Trying to reload!")
        setReloadMeals(reloadMeals+1)
    }
    return(
        <div style = {{paddingBottom: "5vh"}}>
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
                <div style = {{backgroundColor: "#f1f1f1",     overflowX: "hidden"}}>
                    <Grid container spacing = {3} style = {{
                        marginTop: "2vh",
                        marginLeft:  mobileCheck() ? "2vw" : "40vw" ,
                        marginBottom: "1vh"}}>
                        <Grid item xs = {6}>
                            <Paper style = {{textAlign: "left",
                                width: mobileCheck() ? "80vw": "20vw"  ,
                                paddingLeft: "1vw",
                                }}>
                                <Typography variant="h5" style = {{textAlign: "center"}} >
                                    Required meals
                                </Typography>
                                {renderMeals(requiredMeals)}
                                <Typography variant="h5" style = {{textAlign: "center"}} >
                                    Your Current Meals
                                </Typography>
                                {renderMeals(state)}
                            </Paper>
                        </Grid>
                    </Grid>
                </div>
                <FreezerManagers
                    title = "Freezer Managers from Pick Meal page"
                    url={"http://"+window.location.hostname+":3000/volunteer/getFreezerManagers2"}
                    user_id = {props.user_id}
                    state = {branchManagers} 
                    setState = {setBranchManagers}
                    // delivery_id = {props.delivery_id}
                    delivery_id = {props.del_ID}
                    branch_id = {props.branch_id}
                    reload = {reloadMeals}
                    setReload = {handleReload}
                >

                </FreezerManagers>
        </div>
    )
}

export default PickMeals;