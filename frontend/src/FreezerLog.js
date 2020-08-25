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

import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    // textAlign: "center",
    backgroundColor: theme.palette.background.paper,
  },
}));




///////////////////////////////////////////////////////////////////////////////////////////////////////////////


export default function FreezerLog (props) {

  // Set the state variables
  // Used to get the data
    const [state, setState] = useState({
        columns: [ {}, ],
        data: [ {}, ]
    });

    // State to keep track of the new quanitites for each meal
    const [quantity, setQuantity] = useState([]);

    // Function that will update the quantity state when the form changes
    const updateFieldChanged = index => e => {

        console.log('index', index);
        console.log('property name:', e.target.name);
        console.log('property value:', e.target.value);

        let newArray = [...quantity]; // Copy the old state to a new array
        newArray[index] = e.target.value; // replace old quantity with updated quantity
        setQuantity(newArray); // set the new state

        console.log('updated array', newArray);
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
      
      $.post( props.url, function(returnable) {
      if(returnable === null) return 
      if (returnable === undefined) return 
      if(returnable.length === 0) return 

      var fields = Object.keys(returnable[0])
      var values = Object.values(returnable[0])
      console.log('fields from object.keys', fields)
      console.log('values from object.values', values)
      const cols = $(setColumns(fields))
      console.log("before logging the columns for props", props.title)
      console.log("columns = ",fields)
      console.log("before logging the objects for props", props.title)
      console.log("meals = ",returnable)
      
      $(setState(state => ({ ...state,columns:fields, data : returnable})))

  });
  }, [props.url,props.title]);



  // Style for the form
  const classes = useStyles();


  function updateMeals(url, mealTypeId) {
    // $.post(url, mealTypeId, function(returnable) {
    console.log('in update meals function about to post: ', url);
    $.post(url, [{"name":"meal_type", "value":mealTypeId}], function(returnable) {
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
    });
    console.log('after post function');
  }

  // TODO: fix these alerts to work with material ui (they dont work normally for some reason)
  const handleTopUp = (e) => {
    e.preventDefault();

    if (quantity.length > 0) {

      alert('Adding meals to freezer');
      console.log('quantity state:', quantity);
      // For each meal type in state
      for (var i = 0; i < quantity.length; ++i) {
        // Add a database entry for each new meal
        for (var j = 0; j < quantity[i]; ++j) {
          updateMeals("http://"+window.location.hostname+":3000/volunteer/createMeals", i+1);
          // updateMeals("http://"+window.location.hostname+":3000/manager/createMeals", i+1);
        }
      }
      // updateMeals("http://"+window.location.hostname+":3000/volunteer/createMeals");
      // setAlert();
      // alert('success');

      // If quantity state length is 0 then do nothing
    } else {

      alert('Error: No meals to update. Please specifiy the quanitity of meals to be added');

    }
   
  }

  // TODO: Currently once a top up / taken is handled, the user will need to navigate to a new tab to reset the values to 0. Will need to fix this in the future
  const handleTaken = (e) => {
    e.preventDefault();

    if (quantity.length > 0) {

      alert('Removing meals from freezer');
      console.log('quantity state:', quantity);
      // For each meal type in state
      for (var i = 0; i < quantity.length; ++i) {
        // Add a database entry for each new meal
        for (var j = 0; j < quantity[i]; ++j) {
          updateMeals("http://"+window.location.hostname+":3000/volunteer/removeMeals", i+1);
        }
      }
      updateMeals("http://"+window.location.hostname+":3000/volunteer/createMeals"); // need to change to remove meals
      setAlert();
      alert('success');

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
          {console.log("list item mealTypeId", mealTypeId)}        
            <ListItemText
              primary = {
                <React.Fragment>
                  <Typography
                    component="h5"
                    variant="h5"
                    className={classes.inline}
                    color="textPrimary"
                  >
                    {row[state.columns[1]]}<br/>
                  </Typography>
                  <Typography
                    component="h6"
                    variant="h6"
                    className={classes.inline}
                    color="textPrimary"
                    style={{whiteSpace: 'pre-line'}}
                  >
                    Current Meal Count: <strong>{row[state.columns[2]]}</strong>
                  </Typography>
        
                  {/* Might not need a form, can just have the textfield but would need to style it better */}
                  <form className = "mealForm" style = {props.class}>
                    {/* onChange = {saveForm}  */}
                    <TextField
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
                    />
                    <br/>
                  </form>
                </React.Fragment>
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
      variant="contained" 
      color="secondary" 
      onClick={handleTopUp}
    >
      Top up
    </Button>

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



