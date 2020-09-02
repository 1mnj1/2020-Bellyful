import React, {useState} from "react"
import $ from 'jquery'

import Button from '@material-ui/core/Button';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Slide from '@material-ui/core/Slide';
import Toolbar from '@material-ui/core/Toolbar';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    // textAlign: "center",
    backgroundColor: theme.palette.background.paper,
  }

}));


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


///////////////////////////////////////////////////////////////////////////////////////////////////////////////


export default function FreezerManagerDetail (props) {
   //Used for the Navigation Drawer
   const classes = useStyles();

  // Set the state variables
  // Used to get the data
    const [state, setState] = useState({
        columns: [ {}, ],
        data: [ {}, ]
    });

    // State to keep track of the new quanitites for each meal
    const [quantity, setQuantity] = useState([]);
    const [reload, setReload] = useState(0)


  // To get the data
  React.useEffect(() => {
    console.log("User ID: ", props.user_id)
    console.log("person ID: ", props.person_id)
    console.log("delivery ID: ", props.delivery_id)
      // $.post( props.url,[{name: "person_id", value: props.user_id}], function(returnable) {
      $.post( props.url,[{name: "person_id", value: props.person_id}], function(returnable) {
      if(returnable === null) return 
      if (returnable === undefined) return 
      if(returnable.length === 0) return 
      var fields = Object.keys(returnable[0])
    
      $(setState(state => ({ ...state,columns:fields, data : returnable})))

  });

  }, [props.url,props.title, reload]);


  // Creating the meal list
  const createList = state.data.map((row) => {
    const mealTypeId = row[state.columns[0]]

    return (
      <div>
        <div>
          <ListItem key={mealTypeId} role={undefined} dense button>  
            <ListItemText
              primary = {
                <Grid container spacing={3}>
                <React.Fragment>
                <Grid item xs={10}>
                  <Typography
                    component="body1"
                    variant="body1"
                    className={classes.inline}
                    color="textPrimary"
                  >
                    {row[state.columns[1]]}
                  </Typography>
                  </Grid>
                  <Grid item xs={2}>
                  <Typography
                    component="body1"
                    variant="body1"
                    className={classes.inline}
                    color="textPrimary"
                  >
                    &nbsp;x<strong>{row[state.columns[2]]}</strong>
                  </Typography>
                  </Grid>
                    <br/>
                </React.Fragment>
                </Grid>
              }
            />
          </ListItem>
        </div>
      </div>
    );
  })
  
  // Displaying the meal list and action buttons
  return (
    <div style = {{overflowX: "hidden"}}>
      {/* <div> */}
        <HideOnScroll {...props}>
                    <AppBar position="sticky" style = {{marginTop: "-3vh", width: "100vw", backgroundColor: "#865172"}} onClick = {()=>{props.setConfirmedState({...props.confirmedState, branchManagerClicked:null})}}>
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
        {/* </div> */}
        <div>
          <br/>
        <h2>{props.title}</h2> 
        </div>

    <List className={classes.root}>
      {createList}
    </List>
    <div>
      <br/>
    <Button
      variant="contained" 
      color="secondary" 
    >
      Request Meals
    </Button>
    
    </div>
      {/* quick way to show the buttons without them being cut off by the bottom navigation bar TODO: fix navigation bar to the bottom of the page */}
      <div>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
      </div>
    </div>
  );

}



