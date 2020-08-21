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

  

  React.useEffect(() => {
    
    $.post( "http://"+window.location.hostname+":3000/manager/getBranches",  function( returnable ) {
      if(returnable === null) return 
      if (returnable === undefined) return 
      if(returnable.length === 0) return 
      const data = returnable.map(row=>{var vals = Object.values(row); return (<MenuItem key = {vals[0]} value={vals[0]} >{vals[1]}</MenuItem>)  })

        

      $(setBranches(data))
      // this.props.setLogged(true)
  });
  }, [getData]);

  const handleChange = (event) => {
    console.log("Changing target: ",event.target.value)
      setbranchVal(event.target.value);
  };

  // const classes = useStyles();
  // Return a series of text elements to make a form
  return (
    <div>
      
            <Typography variant="h3" component="h3" gutterBottom>
                Create Volunteer
            </Typography>
            
            <PersonForm formData = {props.formData}/>

            <FormControl className = {classes.fullText}>
              <InputLabel id='lblBranches'>Volunteer Branch</InputLabel>
              <Select name = 'B_Val'
              label = 'Branch'
              labelId = 'B_Val'
              id = 'BV'
              value = {branchVal}
              onChange = {handleChange}
              >
                {branches}
              </Select>
            </FormControl>
            
            
    </div>
  );
}

export default VolunteerForm;