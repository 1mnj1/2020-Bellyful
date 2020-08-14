import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PersonForm from './PersonForm'
import $ from 'jquery'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
// import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
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

function VolunteerForm() {
    const classes = useStyles();
    const [Dogs, setDogs] = React.useState(true);
  // Return a series of text elements to make a form
  return (
    <div>
      
            <Typography variant="h3" component="h3" gutterBottom>
                Create Recipient
            </Typography>
            
            <PersonForm/>
            <FormControl className={classes.fullText}>
              <InputLabel id="recDogs">Does the recipient have dogs?</InputLabel>
              <Checkbox
              checked={Dogs}
              onChange={()=>{setDogs(!Dogs)}}
              inputProps={{ 'aria-label': 'secondary checkbox' }}
              />
            </FormControl><br/>
            <TextField
              className={classes.textField}
              id="adults"
              label="Adults: "
              placeholder="number"
              type = "number"
              name = "adults"
              />
            <TextField
              className={classes.textField}
              id="child_under_5"
              label="Children under 5: "
              placeholder="number"
              type = "number"
              name = "child_under_5"
              /><br/>
             <TextField
              className={classes.textField}
              id="child_between_5_10"
              label="Children 5 between 10: "
              placeholder="number"
              type = "number"
              name = "child_between_5_10"
              />
              <TextField
              className={classes.textField}
              id="child_between_11_17"
              label="Children 11 between 17: "
              placeholder="number"
              type = "number"
              name = "child_between_11_17"
              />
              <br/>
              <TextField
              className={classes.fullText}
              id="dietaryReq"
              label="Add Dietary Requirements"
              placeholder="Dietary Requirements"
              name = "dietaryReq"
              multiline

              />
              <br/>
              <TextField
              className={classes.fullText}
              id="allergyNotes"
              label="Add any other Allergy notes"
              placeholder="Allergy notes"
              name = "allergyNotes"
              multiline

              />
              
            
    </div>
  );
}

export default VolunteerForm;