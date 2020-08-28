import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PersonForm from './PersonForm'
import $ from 'jquery'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
// import Divider from '@material-ui/core/Divider';
// import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider'
// import Checkbox from '@material-ui/core/Checkbox';



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
  }
));



function VolunteerForm(props) {

  const classes = useStyles();

  const findItem= (searchItem)=>{
    for (var i = 0; i <props.formData.length; ++i){
      if (props.formData[i].name === searchItem) return props.formData[i].value;
    }
  return null
  }

  const getData = 1;
  //Takes a list of branches for the Dropdown menu
  const [branches,setBranches] = React.useState(null);
  //Holds the selected branch value
  const [branchVal, setbranchVal] = React.useState(findItem("branches"));

  const [statuses, setStatuses] = React.useState(null);
  const [volstatus, setvolstatus] = React.useState(findItem("statuses"));
  

  React.useEffect(() => {
    
    $.post( "http://"+window.location.hostname+":3000/delivery/getBranch",  function( returnable ) {
      if(returnable === null) return 
      if (returnable === undefined) return 
      if(returnable.length === 0) return 
      const data = returnable.map(row=>{var vals = Object.values(row); return (<MenuItem key = {vals[0]} value={vals[0]} >{vals[1]}</MenuItem>)  })

      $(setBranches(data))
      // this.props.setLogged(true)
  });
  $.post( "http://"+window.location.hostname+":3000/delivery/getStatuses",  function( returnable ) {
      if(returnable === null) {console.log("Data Returned Null"); return;} 
      if (returnable === undefined) return 
      if(returnable.length === 0) return 
      const data = returnable.map(row=>{var vals = Object.values(row); return (<MenuItem key = {vals[0]} value={vals[0]} >{vals[1]}</MenuItem>)  })
      
      $(setStatuses(data))
      // this.props.setLogged(true)
  });
  }, [getData]);

  const handleChangeBranch = (event) => {
    console.log("Changing target: ",event.target.value)
      setbranchVal(event.target.value);
  };

  const handleChangeStatus = (event) => {
    console.log("Changing target: ",event.target.value)
      setvolstatus(event.target.value);
  };

  var saveForm = () => {
    var formData = $("form.referrerForm").serializeArray()
    if(formData.length === 0){
      formData = [{}]
      props.setForm(formData)
    } 
  }
  // const classes = useStyles();
  // Return a series of text elements to make a form
  return (
    <div>
            <br/><br/>
            
            <Typography variant="h3" component="h3" gutterBottom>
                Create Volunteer
            </Typography>
            <form className = 'volunteerForm' onChange = {saveForm}>
            <PersonForm formData = {props.formData}/>

            <FormControl className = {classes.fullText}>
              <InputLabel id='lblBranches'>Volunteer Branch</InputLabel>
              <Select name = 'B_Val'
              label = 'Branch'
              labelId = 'B_Val'
              id = 'BV'
              value = {branchVal}
              onChange = {handleChangeBranch}
              >
                {branches}
              </Select>
            </FormControl>
            <FormControl className = {classes.fullText}>
              <InputLabel id='lblStatuses'>Volunteer Status</InputLabel>
              <Select name = 'Status'
              label = 'Status'
              labelId = 'Status'
              id = 'SV'
              value = {volstatus}
              onChange = {handleChangeStatus}
              >
                {statuses}
              </Select>
            </FormControl>
            <br/>
            <br/>
            <Typography variant = "h4">
              Emergency Contact
            </Typography>
            <br/>
            <br/>
            <PersonForm formData = {props.formData}/>
            </form>
    </div>
  );
}

export default VolunteerForm;