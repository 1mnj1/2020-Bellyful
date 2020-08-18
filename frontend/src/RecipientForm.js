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
  function getAddressID( dict, success ){
    $.post("http://"+window.location.hostname+":3000/delivery/getAddress",dict,success)
  }
  function getPersonID( dict, success ){
    $.post("http://"+window.location.hostname+":3000/delivery/getPersonId",dict,success)
  }
function RecipientForm(props) {
  const findItem= (searchItem)=>{
    for (var i = 0; i <props.formData.length; ++i){
    
      if (props.formData[i].name == searchItem) return props.formData[i].value;
    }
    return null
  }
    const classes = useStyles();
    const [Dogs, setDogs] = React.useState(( )=>{ 
      for (var i = 0; i <props.formData.length; ++i){
        if (props.formData[i].name == "recDogs") return true;
      }  
      return false  
  });
  // Return a series of text elements to make a form
  var saveForm = ()=> {
    var formData = $("form.recipientForm").serializeArray()
    if(formData.length == 0){
      formData = [{}]
      props.setForm(formData)
      return
    } 
    var dogs = findItem("recDogs")
    getAddressID(formData, (add_id)=>{
      formData.push({"name":"address_id", "value" : add_id})
      getPersonID( formData, (person_id)=> {
        formData.push({"name":"person_id", "value" : person_id})
        formData.push({"name":"dogs", "value" : dogs==null?0:1} )
        console.log(formData)
        props.setForm(formData)
      })
      
    })
    
  
  };
  
  return (
    <div>
        <form className = "recipientForm" onChange = {saveForm} style = {props.class}>
            <Typography variant="h3" component="h3" gutterBottom>
                Create Recipient
            </Typography>
            
            <PersonForm formData = { props.formData}/>
            <FormControl className={classes.fullText}>
              <InputLabel id="recDogs">Does the recipient have dogs?</InputLabel>
              <Checkbox
              checked={Dogs}
              onChange={()=>{setDogs(!Dogs)}}
              name = "recDogs"
              inputProps={{ 'aria-label': 'secondary checkbox' }}
              />
            </FormControl><br/>
            <TextField
              className={classes.textField}
              id="adults"
              defaultValue = {findItem("adults")}
              label="Adults: "
              placeholder="number"
              type = "number"
              name = "adults"
              />
            <TextField
              className={classes.textField}
              id="child_under_5"
              label="Children under 5: "
              defaultValue = {findItem("child_under_5")}
              placeholder="number"
              type = "number"
              name = "child_under_5"
              /><br/>
             <TextField
              className={classes.textField}
              id="child_between_5_10"
              label="Children 5 between 10: "
              defaultValue = {findItem("child_between_5_10")}
              placeholder="number"
              type = "number"
              name = "child_between_5_10"
              />
              <TextField
              className={classes.textField}
              id="child_between_11_17"
              label="Children 11 between 17: "
              placeholder="number"
              defaultValue = {findItem("child_between_11_17")}
              type = "number"
              name = "child_between_11_17"
              />
              <br/>
              <TextField
              className={classes.fullText}
              id="dietaryReq"
              label="Add Dietary Requirements"
              placeholder="Dietary Requirements"
              defaultValue = {findItem("dietaryReq")}
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
              defaultValue = {findItem("allergyNotes")}
              multiline

              />
              
        </form> 
    </div>
  );
}

export default RecipientForm;