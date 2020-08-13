import React from 'react';
import AutoTable from './AutoTable'
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

function PersonForm() {
    const classes = useStyles();

  // Return a series of text elements to make a form
  return (
    <div>
          <TextField
            label="First Name"
            id="margin-none"
            required
            name = "fname"
            className={classes.textField}
            helperText="Enter the first name"
            />
            <TextField
            label="Last Name"
            name = "lname"
            required
            id="margin-none"
            className={classes.textField}
            helperText="Enter the last name"
            /><br/>
            <TextField
            label="Phone Number"
            name = "phone"
            required
            id="margin-none"
            className={classes.fullText}
            helperText="Enter the phone number"
            InputProps={{
                startAdornment: <InputAdornment position="start">+64</InputAdornment>,
              }}
            /><br/>
            <TextField
            label="Email Address"
            name = "lname"
            required
            id="margin-none"
            className={classes.fullText}
            helperText="Enter the Email"
            /><br/>
            <TextField
            label="House"
            name = "streetNum"
            id="margin-none"
            className={classes.oneQuarter}
            helperText="Enter the House Number"
            /><TextField
            label="Street Name"
            name = "streetName"
            id="margin-none"
            className={classes.threeQuarter}
            helperText="Enter the Street Name"
            /><br/>
            <TextField
            label="City"
            name = "city"
            id="margin-none"
            required
            className={classes.fullText}
            helperText="Enter the city"
            /><br/>
        </div>
      

  );
}

export default PersonForm;