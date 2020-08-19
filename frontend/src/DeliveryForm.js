import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import $ from 'jquery'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
// import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';


function DeliveryForm(props) {
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
  var saveForm = (event)=> {
    var formData = [{"name": "branch", "value": event.target.value }]
    console.log("Form data: ",formData)
    props.setForm(formData)
      
    
  
  };
  return (
    <div style = {props.class} >
      <form className = "deliveryForm" >
      {/* <Typography variant="h3" component="h3" gutterBottom>
              Create Referral
      </Typography> */}
      <FormControl style = {{width:"80vw"}}>
          <InputLabel id="RTlabel">Nearest Branch</InputLabel>
            <Select
            name = "branch"
            label="Branch Name"
                labelId="branch"
                id="Branch"
            value = {findItem("branch")}
            onChange={saveForm}
            >
            {branch}
            </Select>
        </FormControl><br/>
      </form>
      <Button variant="contained" onClick = {props.submit}>Submit</Button>

    </div>
  );
}

export default DeliveryForm;