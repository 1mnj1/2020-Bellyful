import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import $ from 'jquery'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';

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
function DeliveryForm(props) {
  const classes = useStyles();
  const findItem= (searchItem)=>{
    for (var i = 0; i <props.formData.length; ++i){
    
      if (props.formData[i].name === searchItem) return props.formData[i].value;
    }
    return null
  }
  const getData = 1
  const [branch,setBranch] = React.useState(null)
  React.useEffect(() => {
    
    $.post( "http://"+window.location.hostname+":3000/delivery/getBranch",  function( returnable ) {
          if(returnable === null) return 
          if (returnable === undefined) return 
          if(returnable.length === 0) return 
          const data = returnable.map(row=>{var vals = Object.values(row); return (<MenuItem key = {vals[0]} value={vals[0]} >{vals[1]}</MenuItem>)  })

            

          $(setBranch(data))
          // this.props.setLogged(true)
      });
  }, [getData]);
  var saveBranch = (event)=> {
    var formData = [
      {"name": "branch", "value": event.target.value },
      {"name": "notes", "value": props.formData[1].value }
    ]

    console.log("Form data: ",formData)
    props.setForm(formData)
      
    
  
  };
  var saveForm = ()=> {
    var formData = $("form.deliveryForm").serializeArray()
    console.log("New form is: ", formData)
    props.setForm(formData)
      
    
  
  };
  return (
    <div style = {props.class} >
      
      <form className = "deliveryForm" >
      {/* <Typography variant="h3" component="h3" gutterBottom>
              Create Referral
      </Typography> */}
      <FormControl style = {{width:"80vw"}} >
          <InputLabel id="RTlabel" shrink= {true}>Nearest Branch</InputLabel>
            <Select
            
            name = "branch"
            label="Branch Name"
                labelId="branch"
                id="Branch"
            value = {findItem("branch")}
            onChange={saveBranch}
            >
            {branch}
            </Select>
        </FormControl><br/>
        <TextField
              className={classes.fullText}
              id="deliveryNotes"
              label="Add any other delivery notes"
              placeholder="Delivery notes"
              name = "notes"
              
              multiline
              defaultValue = {findItem("notes")}
              onChange = {saveForm}
              />
      </form>
      <Button variant="contained" onClick = {()=>{saveForm();props.submit()}}>Submit</Button>
      {props.children}
    </div>
  );
}

export default DeliveryForm;