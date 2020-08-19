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
import Box from '@material-ui/core/Box';
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
function ReferrerForm(props) {
    
    const getData = 1
    const classes = useStyles();
    const findItem= (searchItem)=>{
      for (var i = 0; i <props.formData.length; ++i){
      
        if (props.formData[i].name === searchItem) return props.formData[i].value;
      }
      return null
    }
    console.log(props.formData)
    const [RefType, setRT] = React.useState(null);
    const [selfRef, handleSelfRef] = React.useState((props.formData[0].name === "selfRef"));
    const [refTypeVal, setrefTypeVal] = React.useState(findItem("RefType"));
    React.useEffect(() => {
    
        $.post( "http://"+window.location.hostname+":3000/manager/getReferrerStatus",  function( returnable ) {
          if(returnable === null) return 
          if (returnable === undefined) return 
          if(returnable.length === 0) return 
          const data = returnable.map(row=>{var vals = Object.values(row); return (<MenuItem key = {vals[0]} value={vals[0]} >{vals[1]}</MenuItem>)  })

            

          $(setRT(data))
          // this.props.setLogged(true)
      });
      }, [getData]);
      var saveForm = ()=> {
        var formData = $("form.referrerForm").serializeArray()
        if(formData.length === 0){
          formData = [{}]
          props.setForm(formData)
        } 
        getAddressID(formData, (add_id)=>{
          formData.push({"name":"address_id", "value" : add_id})
          getPersonID( formData, (person_id)=> {
            formData.push({"name":"person_id", "value" : person_id})
            props.setForm(formData)
          })
          
        })
        
      
      };

    
    
    const handleChange = (event) => {
      console.log("Changing target: ",event.target.value)
        setrefTypeVal(event.target.value);
    };
    
  // Return a series of text elements to make a form
  return (
    <div>
      <Box borderRadius={16}  border={1} >
          <form className = "referrerForm" onChange = {saveForm} style = {props.class}>
            <Typography variant="h3" component="h3" gutterBottom>
                Create Referral
            </Typography>
            <FormControl className={classes.fullText}>
              <InputLabel id="selRef">Is this a self referral?</InputLabel>
              <Checkbox
              name = "selfRef"
              value = {selfRef}
              checked={ selfRef }
              onChange={()=>{handleSelfRef(!selfRef)}}
              inputProps={{ 'aria-label': 'primary checkbox' }}
              />
            </FormControl><br/>
            {!selfRef?(
            <div>
              <PersonForm formData = { props.formData}/>
              <FormControl className={classes.fullText}>
              <InputLabel id="RTlabel">Referrer Type</InputLabel>
                <Select
                name = "RefType"
                label="Referrer Type"
                labelId="RefType"
                id="RT"
                value = {refTypeVal}
                onChange={handleChange}
                >
                {RefType}
                </Select>
              </FormControl><br/>
              <TextField
              className={classes.fullText}
              id="referralOrg"
              label="What organization do you work for?"
              placeholder="Organization"
              name = "refOrg"
              defaultValue = {findItem("refOrg")}
              /><br/>
              <TextField
              className={classes.fullText}
              id="referralNotes"
              label="Add any other referral notes"
              placeholder="Referral notes"
              name = "refNotes"
              
              multiline
              defaultValue = {findItem("refNotes")}

              />
            </div>) : null
          }
          </form>
          </Box>
    </div>
  );
}

export default ReferrerForm;