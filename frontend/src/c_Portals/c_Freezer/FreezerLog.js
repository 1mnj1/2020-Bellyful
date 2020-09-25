import React, {useState} from "react"
import $ from 'jquery'

import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    // textAlign: "center",
    backgroundColor: theme.palette.background.paper,
  },
  label: {
    textTransform: 'capitalize',
  },
  textField: {
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',            
    paddingBottom: 0,
    marginTop: 0,
    fontWeight: 500
  },
  input: {
    textAlign: "center"
  }

}));


///////////////////////////////////////////////////////////////////////////////////////////////////////////////


export default function FreezerLog (props) {
  console.log("Delivery_ ID: ",props.delivery_id)
    // Style for the page
    const classes = useStyles();

  // Set the state variables
  // Used to get the data
    const [state, setState] = useState({
        columns: [ {}, ],
        data: [ {}, ]
    });

    // State to keep track of the new quanitites for each meal
    const [quantity, setQuantity] = useState({});
    const [reload, setReload] = useState(0)
    
    // Function that will update the quantity state when the form changes
    const updateFieldChanged = index => e => {

        let newArray = {...quantity}; // Copy the old state to a new array
        newArray[index] = e.target.value; // replace old quantity with updated quantity
        setQuantity(newArray); // set the new state
    }

  // To get the data
  React.useEffect(() => {
    var sqlVars = [{name: "person_id", value: props.user_id}]
    if(typeof(props.user_id) == "undefined"){
      sqlVars = [{name: "delivery_id", value: props.delivery_id}]
    }
    console.log("User ID: ", props.user_id)
      $.post( props.url,sqlVars, function(returnable) {
        if(returnable === null) return 
        if (returnable === undefined) return 
        if(returnable.length === 0) return 
        var fields = Object.keys(returnable[0])
        
        $(setState(state => ({ ...state,columns:fields, data : returnable})))
        $(setQuantity(returnable.map(row=>0)))
        if(props.delivery_id!==-1){
          $(props.setReload(!props.reload))
        }
    });
    
  }, [props.url,props.title, reload]);


// function for increase arrow
  const increaseQuantity = index => e => {
    console.log('index', index);
    console.log("current state at index: ", quantity[index])

    let newArray = {...quantity}; // Copy the old state to a new array
    if (typeof newArray[index] === "undefined") {
      newArray[index] = 1
    } else {
      newArray[index] = newArray[index] + 1; // replace old quantity with updated quantity
    }
    
    setQuantity(newArray); // set the new state
    console.log('updated array', newArray);
  }

  // function for decrease arrow
  const decreaseQuantity = index => e => {
    console.log('index', index);
    console.log("current state at index: ", quantity[index])

    let newArray = {...quantity}; // Copy the old state to a new array
    if (typeof newArray[index] === "undefined") {
      newArray[index] = 0
    } else if (newArray[index] === 0) {
      return // number can't go below 0
    }
    else {
      newArray[index] = newArray[index] - 1; // replace old quantity with updated quantity
    }
    
    setQuantity(newArray); // set the new state
    console.log('updated array', newArray);
  }


  function updateMeals(url, mealTypeId, num_items) {
    // $.post(url, mealTypeId, function(returnable) {
    console.log('in update meals function about to post: ', url);
    var sqlvars = [
      typeof(props.user_id) =="undefined" ? {"name":"person_id", "value":"-1"} : {"name":"person_id", "value":props.user_id},
      {"name":"mealType", "value":mealTypeId},
      {"name":"numItems", "value":num_items},
      {"name": "delivery_id", "value": props.delivery_id}
    ]
    $.post(url, sqlvars, function(returnable) {
      if(returnable === null) {
        console.log('returnable is null');
        return;
      } 
      if (returnable === undefined) {
        console.log('returnable is undefined');
        return;
      }
      if(returnable.length === 0) {
        console.log('returnable length is 0');
        return;
      }
      setReload(1+reload)
    });
    console.log('after post function');
  }

  // TODO: fix these alerts to work with material ui (they dont work normally for some reason)
  const handleTopUp = (e) => {
    e.preventDefault();

    

    // alert('Adding meals to freezer');
    console.log('quantity state:', quantity);
    // For each meal type in state
    var keys = Object.keys(quantity)
    if (keys.length > 0) {
      for (var i = 0; i < keys.length; ++i) {
        if(quantity[keys[i]] == 0) {continue}
        // Add a database entry for each new meal
        updateMeals("http://"+window.location.hostname+":3000/freezer/createMeals", keys[i], quantity[keys[i]]);
        
      }

      // If quantity state length is 0 then do nothing
    } else {
      // alert('Error: No meals to update. Please specifiy the quanitity of meals to be added');
    }
   
  }

  const handleTaken = (e) => {
    e.preventDefault();
    // switch to a new page and pass the state - a confirmation page will be a new component
    var keys = Object.keys(quantity)
    if (keys.length > 0) {
      for (var i = 0; i < keys.length; ++i) {
        if(quantity[keys[i]] == 0) {continue};
        // Add a database entry for each new meal
        updateMeals("http://"+window.location.hostname+":3000/freezer/removeMeals",  keys[i], quantity[keys[i]]);
        
      }

    } else {
      alert('Error: No meals to update. Please specifiy the quanitity of meals to remove');
    }
  }


  const updateDeliveryMeals = (url, mealTypeId, num_items, del_id) => {
    // $.post(url, mealTypeId, function(returnable) {
    console.log('in update meals function about to post: ', del_id);
    var sqlvars = [
      {"name":"vol_id", "value":props.vol_id},
      {"name":"person_id", "value":props.user_id},
      {"name":"mealType", "value":mealTypeId},
      {"name":"numItems", "value":num_items},
      {"name":"delivery_id", "value": del_id}
    ]
    $.post(url, sqlvars, function(returnable) {
      if(returnable === null) {
        console.log('returnable is null');
        return;
      } 
      if (returnable === undefined) {
        console.log('returnable is undefined');
        return;
      }
      if(returnable.length === 0) {
        console.log('returnable length is 0');
        return;
      }
      setReload(1+reload)
      
    });
    console.log('after post function');
  }


  const handleAssignMeals = (e) => {
    e.preventDefault();
    console.log('handleAssignMeals called')

    var keys = Object.keys(quantity)
    if (keys.length > 0) {
      for (var i = 0; i < keys.length; ++i) {
        if(quantity[keys[i]] == 0) {continue};
        // Add a database entry for each new meal
        updateDeliveryMeals("http://"+window.location.hostname+":3000/volunteer/assignDeliveryMeals",  keys[i], quantity[keys[i]], props.delivery_id);
      }
    } else {
      alert('Error: No meals to assign. Please specifiy the quanitity of meals to assign to your delivery');
    }
  }

  const handleRemoveMeals = (e) => {
    e.preventDefault();
    console.log('handleRemoveMeals called')

    var keys = Object.keys(quantity)
      if (keys.length > 0) {
        for (var i = 0; i < keys.length; ++i) {
          if(quantity[keys[i]] == 0) {continue};
          // Add a database entry for each new meal
          updateDeliveryMeals("http://"+window.location.hostname+":3000/volunteer/removeDeliveryMeals",  keys[i], quantity[keys[i]], props.delivery_id);
        }

      } else {
        alert('Error: No meals to remove. Please specifiy the quanitity of meals to remove from your delivery');
      }
  }


  // Creating the meal list
  const createList = state.data.map((row) => {
    const mealTypeId = row[state.columns[0]]
    // console.log("Row: ",row, "Value: ", mealTypeId)

    return (
      <div>
        <div>
          <ListItem key={mealTypeId} role={undefined} dense button>  
            <ListItemText
              primary = {
                <Grid container spacing={3}>
                <React.Fragment>
                <Grid item xs={6}>
                  <Typography
                    component="body1"
                    variant="body1"
                    className={classes.inline}
                    color="textPrimary"
                  >
                    {row[state.columns[1]]}&nbsp;x<strong>{row[state.columns[2]]}</strong>
                  </Typography>
                  </Grid>
                
                  <Grid item xs={2}>
                    <label htmlFor="icon-button-file">
                      <IconButton color="primary" aria-label="decrease button" component="span" onClick={decreaseQuantity(mealTypeId)}>
                        <ArrowLeftIcon />
                      </IconButton>
                    </label>
                  </Grid>
                  <Grid item xs={2}>
                    <TextField
                      className = {classes.textField}
                      id = "mealChangeQuantity"
                      defaultValue = "0"
                      placeholder = "0"
                      type = "number"
                      margin="normal"
                      InputProps={{
                          className: classes.input,
                      }}
                      // fullWidth
                      name = "mealChangeQuantity"
                      value = {quantity[mealTypeId]} // The value of the state at the mealTypeId index (TODO: might need a safer way to do this because mealTypeId might not always be in order, especially if different branches have different kinds of meals)
                      onChange = {updateFieldChanged(mealTypeId)}
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <label htmlFor="icon-button-file">
                      <IconButton color="primary" aria-label="increase button" component="span" onClick={increaseQuantity(mealTypeId)}>
                        <ArrowRightIcon />
                      </IconButton>
                    </label>
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
      <h2>{props.title}</h2> 

      {state.data.length <= 0 ? 
        <div className={classes.root} > </div>
        : 
        <div>
          <List className={classes.root}>
            {createList}
          </List>
          <div>
            <br/>
          <Button
            variant="contained" 
            color="secondary" 
            onClick={props.delivery_id === -1 || typeof(props.user_id)=="undefined" ? handleTopUp : handleAssignMeals}
          >
            {props.delivery_id === -1 ? "Add Meal(s)" : "Take Meal(s)"}
          </Button>
          &nbsp;
          <Button 
            variant="contained" 
            color="primary" 
            onClick={(props.delivery_id === -1 || typeof(props.user_id)=="undefined") ? handleTaken : handleRemoveMeals}
          >
            {props.delivery_id === -1 ? "Remove Meal(s)" : "Return Meal(s)"}
          </Button>
          </div>
        </div>
      }
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



