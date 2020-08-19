import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import PersonForm from './PersonForm'
// import $ from 'jquery'
// import InputLabel from '@material-ui/core/InputLabel';
// import MenuItem from '@material-ui/core/MenuItem';
// import FormControl from '@material-ui/core/FormControl';
// import Select from '@material-ui/core/Select';
// import Divider from '@material-ui/core/Divider';
// import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
// import Checkbox from '@material-ui/core/Checkbox';



// const fullWidth = 100;
// const useStyles = makeStyles((theme) => ({
//     root: {
//       display: 'flex',
//       flexWrap: 'wrap',
//     },
//     textField: {
//         marginBottom :theme.spacing(1),
//       marginRight: theme.spacing(1),
//       width: String(fullWidth/2)+'ch',
//     },
//     fullText: {
//         marginBottom :theme.spacing(1),
//         marginRight: theme.spacing(1),
//         width: String(fullWidth)+'ch',
//     },
//     threeQuarter:{
//         marginBottom :theme.spacing(1),
//         marginRight: theme.spacing(1),
//         width: String(fullWidth/4*3)+'ch',
//     }, 
//     oneQuarter:{
//         marginBottom :theme.spacing(1),
//         marginRight: theme.spacing(1),
//         width: String(fullWidth/4)+'ch',
//     }, 

//   }));



function VolunteerForm() {


  //const [branchVal, setbranchVal] = React.useState(findItem(""))
  const [vol, setVol] = React.useState([{}]);

  // const classes = useStyles();
  // Return a series of text elements to make a form
  return (
    <div>
      
            <Typography variant="h3" component="h3" gutterBottom>
                Create Volunteer
            </Typography>
            
            <PersonForm setForm = {setVol} formData = {vol} />

            {/* <FormControl>
              <InputLabel id='lblBranch'>Volunteer Branch</InputLabel>
              <Select name = 'B_Val'
              label = 'Branch'
              labelId = 'B_Val'
              id = 'BV'
              value = {branchVal}
              onChange = {handleChange}
              >
                {BranchValue}
              </Select>
            </FormControl> */}
            
            
    </div>
  );
}

export default VolunteerForm;