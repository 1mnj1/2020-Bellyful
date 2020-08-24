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


export default function FreezerLog (props) {

    const [state, setState] = useState({
        columns: [ {}, ],
        data: [ {}, ],
        quantities: [{}]
    });

    const [quantity, setQuantity] = useState([]);

    const updateFieldChanged = index => e => {
        console.log('index', index);
        console.log('property name:', e.target.name);
        console.log('property value:', e.target.value);
        let newArray = [...quantity]; // Copy the old state
        newArray[index] = e.target.value; // replace e.target.value with updated quantity

        setQuantity(newArray); // set the new state

        console.log('updated array', newArray);
    }

    const setColumns = (colNames)=>{
      var columns = []; 
      colNames.forEach(element => columns.push({title: element, field: element}));
      return columns
  }

    // Return a series of text elements to make a form
    var saveForm = ()=> {
      var formData = $("form.mealForm").serializeArray()
      if(formData.length === 0){
        formData = [{}]
        props.setForm(formData)
        return
      } 
      
    
    };


    function setAlert() {
      return (
      <Alert severity="success">
        <AlertTitle>Success</AlertTitle>
        Freezer Updated!
        {console.log("alert function called")}
      </Alert>
      )
    }

    function getAddressID( dict, success ){
      $.post("http://"+window.location.hostname+":3000/delivery/getAddress",dict,success)
    }

    var saveForm = ()=> {
      var formData = $("form.referrerForm").serializeArray()
      if(formData.length === 0){
        formData = [{}]
        props.setForm(formData)
      } 
      // getAddressID(formData, (add_id)=>{
      //   formData.push({"name":"address_id", "value" : add_id})
      //   getPersonID( formData, (person_id)=> {
      //     formData.push({"name":"person_id", "value" : person_id})
      //     props.setForm(formData)
      //   })
        
      // })
      
    
    };

    var saveMealQuantities = () => {

    }


    function mealChange(mealTypeId, quantity) {
        return (
          console.log("Hello there, ", {mealTypeId}, "quantity has been altered to ", {quantity})
          // <Alert>Hello there, {mealTypeId} quantity has been altered</Alert>
        )
    }

    
  console.log("before the get data request for freezer log")
  console.log(props.url)

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


  const classes = useStyles();


  const handleTopUp = (evt) => {
    evt.preventDefault();
    alert('Submitting quantity ${quantity} and mealTypeId ${mealTypeId')
    // for (mealType : row) {
    //   row[state.columns[0]];
    // }
  }

  const createList = state.data.map((row) => {
    const mealTypeId = row[state.columns[0]]
    // console.log("Row: ",row, "Value: ", mealTypeId)
  
    // console.log("row 1 (Meal Type Id): ", row[state.columns[0]])
    // console.log("row 2 (Dish): ", row[state.columns[1]])
    // console.log("row 3 (Available Meals): ", row[state.columns[2]])

    // let quantity = 0;
    // const [quantity, setQuantity] = useState(0);

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
                  {/* <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                    style={{whiteSpace: 'pre-line'}}
                  >
                    &nbsp;{row[state.columns[2]]}
                  </Typography> */}
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
                      name = "mealChange2"
                      value = {quantity[mealTypeId-1]} // The value of the state at the mealTypeId index
                      // onChange={mealChange(mealTypeId, quantity)}
                      // onChange={e => setQuantity(e.target.value)}
                      onChange = {updateFieldChanged(mealTypeId - 1)}
                      // onChange={event => {
                      //   let quantities = state.quantities;
                      //   quantities[mealTypeId - 1] = event.target.value
                      //   setState(quantities)}
                      // }
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
      // onClick={setAlert}
      onClick={handleTopUp}
    >
      Top up
    </Button>

    <Button 
      variant="contained" 
      color="primary" 
      onClick={setAlert}
    >
      Taken
    </Button>
    </div>
    {/* quick way to show the buttons without them being cut off by the bottom navigation bar */}
    <div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
    </div>


    </div>
  );

}



