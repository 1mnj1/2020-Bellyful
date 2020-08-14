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

function ReferrerForm() {
    const getData = 1
    const classes = useStyles();
    const [RefType, setRT] = React.useState(null);
    const [selfRef, handleSelfRef] = React.useState(true);
    React.useEffect(() => {
    
        $.post( "http://"+window.location.hostname+":3000/manager/getReferrerStatus",  function( returnable ) {
          if(returnable === null) return 
          if (returnable === undefined) return 
          if(returnable.length === 0) return 
          const data = returnable.map(row=>{var vals = Object.values(row); return (<MenuItem value={vals[0]}>{vals[1]}</MenuItem>)  })

            console.log(data)

          $(setRT(data))
          // this.props.setLogged(true)
      });
      }, [getData]);
      const [refTypeVal, setrefTypeVal] = React.useState('');

    const handleChange = (event) => {
        setrefTypeVal(event.target.value);
    };
  // Return a series of text elements to make a form
  return (
    <div>
      
            <Typography variant="h3" component="h3" gutterBottom>
                Create Referral
            </Typography>
            <FormControl className={classes.fullText}>
              <InputLabel id="selRef">Is this a self referral?</InputLabel>
              <Checkbox
              checked={selfRef}
              onChange={()=>{handleSelfRef(!selfRef)}}
              inputProps={{ 'aria-label': 'primary checkbox' }}
              />
            </FormControl><br/>
            {!selfRef?(
            <div>
              <PersonForm/>
              <FormControl className={classes.fullText}>
              <InputLabel id="RTlabel">Referrer Type</InputLabel>
                <Select
                label="Referrer Type"
                labelId="RefType"
                id="RT"
                value={refTypeVal}
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

              /><br/>
              <TextField
              className={classes.fullText}
              id="referralNotes"
              label="Add any other referral notes"
              placeholder="Referral notes"
              name = "refNotes"
              multiline

              />
            </div>) : null
          }
    </div>
  );
}

export default ReferrerForm;