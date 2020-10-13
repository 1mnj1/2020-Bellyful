import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import $ from 'jquery'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
function getAddressID( dict, success ){
    $.post("http://"+window.location.hostname+":3000/delivery/getAddress",dict,success)
  }
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
function FreezerForm(props) {
    const classes = useStyles();
    const [form,setForm] = React.useState(null)
  const findItem= (searchItem)=>{
    if(form == null) return null
    for (var i = 0; i <form.length; ++i){
    
      if (form[i].name === searchItem) return form[i].value;

    }
    return null
  }
  const getData = 1
  //function which holds all the branches available
  const [branch,setBranch] = React.useState(null)
  const [currBranch, setCurrBranch] = React.useState(findItem("branch"))
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
  var setBranchData = (event)=> {
    setCurrBranch(event.target.value)
      
  };
  const [freezerManager,setfreezerManager] = React.useState(null)
  const [currfreezerManager, setCurrfreezerManager] = React.useState(findItem("freezerManager"))
  React.useEffect(() => {
    
    $.post( "http://"+window.location.hostname+":3000/manager/getVolunteers",[{name: "getID", value:true}],  function( returnable ) {
          if(returnable === null) return 
          if (returnable === undefined) return 
          if(returnable.length === 0) return 
          console.log("Volunteers: ",returnable)
          const data = returnable.map(row=>{var vals = Object.values(row); return (<MenuItem key = {vals[0]} value={vals[0]} >{vals[1]+" "+ vals[3]}</MenuItem>)  })

            

          $(setfreezerManager(data))
          // this.props.setLogged(true)
      });
  }, [getData]);
  var setfreezerManagerData = (event)=> {
    setCurrfreezerManager(event.target.value)
      
  };
  var saveForm = ()=> {
    var formData = $("form.freezerForm").serializeArray()
    getAddressID(formData, (add_id)=>{
        formData.push({"name":"address_id", "value" : add_id})
        console.log("Form data: ",formData)
        setForm(formData)
        return
    })
    
  };
  var submit = ()=>{
    saveForm()
    $.post("http://"+window.location.hostname+":3000/delivery/submitFreezer",form,(returnable)=>{
          if(returnable === null) return 
          if (returnable === undefined) return 
          if(returnable.length === 0) return 
        
          // this.props.setLogged(true)
      });
  }

  return (
    <div style = {props.class} >
        <Typography variant="h3" component="h3" gutterBottom>
            Create Freezer
        </Typography>
      <form className = "freezerForm" onChange={saveForm} >
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
            value = {currBranch}
            onChange={setBranchData}
            >
            {branch}
            </Select>
            
        </FormControl><br/>
        <Divider style = {{marginTop: "2vh"}}/>
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
            <Divider style = {{marginTop: "2vh", marginBot: "2vh"}}/>
            <FormControl style = {{width:"80vw"}}>
                <InputLabel id="RTlabel">Freezer Manager</InputLabel>
                <Select
                name = "freezerManager"
                label="Freezer Manager"
                labelId="freezerManager"
                id="freezerManagerSelect"
                value = {currfreezerManager}
                onChange={setfreezerManagerData}
                >
                {freezerManager}
                </Select>
                
            </FormControl>
      </form>
      <Button variant="contained" onClick = {submit}>Submit</Button>

    </div>
  );
}

export default FreezerForm;