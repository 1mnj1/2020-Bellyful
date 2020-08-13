import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PersonForm from './PersonForm'
import $ from 'jquery'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Divider from '@material-ui/core/Divider';
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
          <PersonForm/>
          <Divider/>
          <FormControl className={classes.fullText}>
            <InputLabel id="demo-simple-select-outlined-label">Referrer Type</InputLabel>
            <Select
            label="Referrer Type"
            labelId="RefType"
            id="RT"
            value={refTypeVal}
            onChange={handleChange}
            label="Referrer Type"
            >
                {RefType}
            </Select>
        </FormControl>
    </div>
      

  );
}

export default ReferrerForm;