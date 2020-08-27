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

import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

import IconButton from '@material-ui/core/IconButton';

import Box from '@material-ui/core/Box';

import Grid from '@material-ui/core/Grid';

import clsx from 'clsx';




import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    // textAlign: "center",
    backgroundColor: theme.palette.background.paper,
  },
  buttonColor: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 48,
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
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
    fontWeight: 500,
    backgroundColor: "rgb(235, 197, 221)"
    // backgroundColor: "rgb(237, 175, 214)"
  },
  input: {
    // color: "rgb(225, 127, 188)"
    textAlign: "center"
  }

}));

// We can inject some CSS into the DOM.
// const styles = {
//   buttonColor: {
//     background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
//     borderRadius: 3,
//     border: 0,
//     color: 'white',
//     height: 48,
//     padding: '0 30px',
//     boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
//   },
// };




///////////////////////////////////////////////////////////////////////////////////////////////////////////////


export default function FreezerLog (props) {
    // Style for the page
    const classes = useStyles();



  // Set the state variables
  // Used to get the data
    const [state, setState] = useState({
        columns: [ {}, ],
        data: [ {}, ]
    });

    // State to keep track of the new quanitites for each meal
    const [quantity, setQuantity] = useState([]);
    const [quantityDictionary, setQuantityDictionary] = useState({});
    const [reload, setReload] = useState(0)
    // Function that will update the quantity state when the form changes
    const updateFieldChanged = index => e => {

        let newArray = [...quantity]; // Copy the old state to a new array
        newArray[index] = e.target.value; // replace old quantity with updated quantity
        setQuantity(newArray); // set the new state
    }

    // Set the columns for the data
    const setColumns = (colNames)=>{
      var columns = []; 
      colNames.forEach(element => columns.push({title: element, field: element}));
      return columns
    }


    // Alert the user that their action was successful
    function setAlert() {
      return (
      <Alert severity="success">
        <AlertTitle>Success</AlertTitle>
        Freezer Updated!
        {console.log("alert function called")}
      </Alert>
      )
    }

  // To get the data
  React.useEffect(() => {
    console.log("User ID: ", props.user_id)
      $.post( props.url,[{name: "person_id", value: props.user_id}], function(returnable) {
      if(returnable === null) return 
      if (returnable === undefined) return 
      if(returnable.length === 0) return 

      var fields = Object.keys(returnable[0])
      
      
      $(setState(state => ({ ...state,columns:fields, data : returnable})))
      $(setQuantity(returnable.map(row=>0)))
  });
  }, [props.url,props.title, reload]);






  // function for increase arrow dictonary
  const increaseQuantityDictionary = index => e => {
    console.log('index', index);
    console.log("current state at index: ", quantityDictionary["{{index}}"])

    //setKeyMap({ ...keyMap, [e.index]: true });
    var key = index.toString()

    let newArray = {...quantityDictionary}; // Copy the old state to a new array

    if (!(key in newArray)) {
      newArray[key] = 1
    } else {
      for (var i in newArray) {
        if (i === key) {
          newArray[i] = newArray[i] + 1;
        }
      }
    }



    // for (var key in newArray) {
    //   // Do stuff. ex: console.log(dict[key])
    //   if (key === index) {
    //     if (typeof newArray[key] === "undefined") {
    //       newArray[key] = 1
    //     } else {
    //       newArray[key] = newArray[key] + 1; // replace old quantity with updated quantity
    //     }
    //   }
    // }

    // if (typeof newArray["index"] === "undefined") {
    //   newArray["index"] = 1
    // } else {
    //   newArray["index"] = newArray["index"] + 1; // replace old quantity with updated quantity
    // }
    
    setQuantity(newArray); // set the new state
    console.log('updated array', newArray);
  }

  // function for decrease arrow dictonary
  const decreaseQuantityDictionary = index => e => {
    console.log('index', index);
    console.log("current state at index: ", quantityDictionary[{index}])

    let newArray = {...quantityDictionary}; // Copy the old state to a new array
    if (typeof newArray["index"] === "undefined") {
      newArray["index"] = 0
    } else if (newArray["index"] === 0) {
      return // number can't go below 0
    }
    else {
      newArray["index"] = newArray["index"] - 1; // replace old quantity with updated quantity
    }
    
    setQuantity(newArray); // set the new state
    console.log('updated array', newArray);
  }


// function for increase arrow
  const increaseQuantity = index => e => {
    console.log('index', index);
    console.log("current state at index: ", quantity[index])

    let newArray = [...quantity]; // Copy the old state to a new array
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

    let newArray = [...quantity]; // Copy the old state to a new array
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
      {"name":"person_id", "value":props.user_id},
      {"name":"mealType", "value":mealTypeId},
      {"name":"numItems", "value":num_items}
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

    if (quantity.length > 0) {

      // alert('Adding meals to freezer');
      console.log('quantity state:', quantity);
      // For each meal type in state
      for (var i = 0; i < quantity.length; ++i) {
        if(quantity[i] == 0) {continue}
        // Add a database entry for each new meal
        updateMeals("http://"+window.location.hostname+":3000/freezer/createMeals", i+1, quantity[i]);
          // updateMeals("http://"+window.location.hostname+":3000/manager/createMeals", i+1);
        
      }
      // updateMeals("http://"+window.location.hostname+":3000/volunteer/createMeals");
      // setAlert();
      // alert('success');

      // If quantity state length is 0 then do nothing
    } else {

      // alert('Error: No meals to update. Please specifiy the quanitity of meals to be added');

    }
   
  }

  // TODO: Currently once a top up / taken is handled, the user will need to navigate to a new tab to reset the values to 0. Will need to fix this in the future
  const handleTaken = (e) => {
    e.preventDefault();
// switch to a new page and pass the state - a confirmation page will be a new component
    if (quantity.length > 0) {

      // alert('Removing meals from freezer');
      console.log('quantity state:', quantity);
      // For each meal type in state
      
      for (var i = 0; i < quantity.length; ++i) {
        if(quantity[i] == 0) {continue};
        // Add a database entry for each new meal
        updateMeals("http://"+window.location.hostname+":3000/freezer/removeMeals", i+1, quantity[i]);
        
      }
      // setAlert();
      // alert('success');

    } else {

      alert('Error: No meals to update. Please specifiy the quanitity of meals to remove');

    }
  }


  // Creating the meal list
  const createList = state.data.map((row) => {
    const mealTypeId = row[state.columns[0]]
    // console.log("Row: ",row, "Value: ", mealTypeId)
  
    // console.log("row 1 (Meal Type Id): ", row[state.columns[0]])
    // console.log("row 2 (Dish): ", row[state.columns[1]])
    // console.log("row 3 (Available Meals): ", row[state.columns[2]])

    return (
      <div>
        <div>
          <ListItem key={mealTypeId} role={undefined} dense button>  
          {/* {console.log("list item mealTypeId", mealTypeId)}         */}
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
                  {/* Might not need a form, can just have the textfield but would need to style it better */}
                  {/* <form className = "mealForm" style = {props.class}> */}
                  <Grid item xs={2}>
                    <label htmlFor="icon-button-file">
                      <IconButton color="primary" aria-label="decrease button" component="span" onClick={decreaseQuantity(mealTypeId-1)}>
                      {/* <IconButton color="primary" aria-label="decrease button" component="span" onClick={decreaseQuantityDictionary(mealTypeId)}> */}
                        <ArrowLeftIcon />
                      </IconButton>
                    </label>
                  </Grid>
                  <Grid item xs={2}>
                    {/* <Typography
                    component="h6"
                    variant="h6"
                    className={classes.inline}
                    color="textPrimary"
                    >
                      {quantity[mealTypeId-1]}
                    </Typography> */}
                    {/* <Box display="flex" justifyContent="flex-start" m={1} p={1} bgcolor="background.paper">
                      <Box p={1} bgcolor="grey.300">
                      {quantity[mealTypeId-1]}
                      </Box>
                    </Box> */}
                    <TextField
                      className = {classes.textField}
                      id = "mealChangeQuantity"
                      // label = "Add/remove meals"
                      defaultValue = "0"
                      placeholder = "0"
                      type = "number"
                      margin="normal"
                      InputProps={{
                          className: classes.input,
                      }}
                      // fullWidth
                      name = "mealChangeQuantity"
                      value = {quantity[mealTypeId-1]} // The value of the state at the mealTypeId index (TODO: might need a safer way to do this because mealTypeId might not always be in order, especially if different branches have different kinds of meals)
                      onChange = {updateFieldChanged(mealTypeId - 1)}
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <label htmlFor="icon-button-file">
                      <IconButton color="primary" aria-label="increase button" component="span" onClick={increaseQuantity(mealTypeId - 1)}>
                      {/* <IconButton color="primary" aria-label="increase button" component="span" onClick={increaseQuantityDictionary(mealTypeId)}> */}
                        <ArrowRightIcon />
                      </IconButton>
                    </label>
                  </Grid>
                    {/* <TextField
                      className = {classes.textField}
                      id = "mealChangeQuantity"
                      label = "Add/remove meals"
                      defaultValue = "0"
                      placeholder = "0"
                      type = "number"
                      fullWidth
                      name = "mealChangeQuantity"
                      value = {quantity[mealTypeId-1]} // The value of the state at the mealTypeId index (TODO: might need a safer way to do this because mealTypeId might not always be in order, especially if different branches have different kinds of meals)
                      onChange = {updateFieldChanged(mealTypeId - 1)}
                    /> */}
                    <br/>
                  {/* </form> */}
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
    <List className={classes.root}>
      {createList}
    </List>
    <div>
      <br/>
    <Button
      // classes={{
      //   root: classes.root, // class name, e.g. `classes-nesting-root-x`
      //   label: classes.label, // class name, e.g. `classes-nesting-label-x`
      // }}
      variant="contained" 
      color="secondary" 
      onClick={handleTopUp}
    >
      Top up
    </Button>
    &nbsp;
    <Button 
      variant="contained" 
      color="primary" 
      onClick={handleTaken}
    >
      Taken
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



