import React from 'react';
// import AutoTable from './AutoTable'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import InputAdornment from '@material-ui/core/InputAdornment';
const fullWidth = 100;
const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
        marginBottom :theme.spacing(1),
      marginRight: theme.spacing(1),
      width: String(fullWidth/2)+'ch',
    },
    fullText: {
        marginBottom :theme.spacing(1),
        marginRight: theme.spacing(1),
        width: String(fullWidth)+'ch',
    },
    threeQuarter:{
        marginBottom :theme.spacing(1),
        marginRight: theme.spacing(1),
        width: String(fullWidth/4*3)+'ch',
    }, 
    oneQuarter:{
        marginBottom :theme.spacing(1),
        marginRight: theme.spacing(1),
        width: String(fullWidth/4)+'ch',
    }, 

  }));

function PersonForm(props ) {
    const classes = useStyles();
  // Return a series of text elements to make a form

    const findItem= (searchItem)=>{
      for (var i = 0; i <props.formData.length; ++i){
      
        if (props.formData[i].name === searchItem) return props.formData[i].value;
      }
      return null
    }
    
  return (
    <div>
          <TextField
            label="First Name"
            id="margin-none"
            required
            defaultValue = {findItem("fname")}
            name = "fname"
            className={classes.textField}
            helperText="Enter the first name"
            />
            <TextField
            label="Last Name"
            name = "lname"
            defaultValue = {findItem("lname")}
            required
            id="margin-none"
            className={classes.textField}
            helperText="Enter the last name"
            />
            <br/>
            <TextField
            label="Email Address"
            name = "email"
            defaultValue = {findItem("email")}
            required
            id="margin-none"
            className={classes.fullText}
            helperText="Enter the Email"
            /><br/>
            <TextField
            label="Phone Number"
            name = "phone"
            defaultValue = {findItem("phone")}
            type="number"
            required
            id="margin-none"
            className={classes.fullText}
            helperText="Enter the phone number"
            InputProps={{
                startAdornment: <InputAdornment position="start">+64</InputAdornment>,
              }}
            /><br/>
            
            <TextField
            label="House"
            type="number"
            defaultValue = {findItem("streetNum")}
            name = "streetNum"
            id="margin-none"
            className={classes.oneQuarter}
            helperText="Enter the House Number"
            /><TextField
            label="Street Name"
            name = "streetName"
            defaultValue = {findItem("streetName")}
            id="margin-none"
            className={classes.threeQuarter}
            helperText="Enter the Street Name"
            /><br/>
            <TextField
            label="Suburb"
            name = "suburb"
            defaultValue = {findItem("suburb")}
            id="margin-none"
            className={classes.textField}
            helperText="Enter the Suburb"
            />
            <TextField
            label="City"
            name = "city"
            defaultValue = {findItem("city")}
            id="margin-none"
            required
            className={classes.textField}
            helperText="Enter the city"
            /><br/>
            <TextField
            label="Postcode"
            name = "postcode"
            defaultValue = {findItem("postcode")}
            id="margin-none"
            required
            className={classes.fullText}
            style = {{Align:"left"}}
            helperText="Enter the Post Code"
            />
        </div>
      

  );
}

export default PersonForm;