import React from "react"
import $ from 'jquery'

import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
// import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';




const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    // textAlign: "center",
    padding : 0,
    backgroundColor: theme.palette.background.paper,
  },


  list: {
    backgroundColor: "#f7f7f7",
  }

}));


export default function UnassignedDeliveries (props) {

  const [state, setState] = React.useState({
      columns: [ {}, ],
      data: [ {}, ],
      checked: []
  });
  var updateProps = 1

  console.log("before the get data request for deliveries")
  console.log(props.url)

  //use effect copied from https://reactjs.org/docs/hooks-effect.html#tip-optimizing-performance-by-skipping-effects
  const setData = () => {
      
    $.post( props.url,[{name: "branch_id" , value: props.branch_id}], function(returnable) {
    if(returnable === null) return 
    if (returnable === undefined) return 
    if(returnable.length === 0) {
      $(setState(state => ({ ...state,checked: [], data :[] })))
      return
    } 

    var fields = Object.keys(returnable[0])
    var values = Object.values(returnable[0])
    console.log('fields from object.keys', fields)
    console.log('values from object.values', values)

    console.log("before logging the columns for props", props.title)
    console.log("columns = ",fields)
    console.log("before logging the objects for props", props.title)
    console.log("deliveries = ",returnable)
    
    // To use an encapsulated function, put a dollar in front of it (it just works ?!)
    // $(setState(state => ({ ...state,columns:cols.toArray(), data : returnable})))
    $(setState(state => ({ ...state,columns:fields, checked: [], data : returnable})))
    // this.props.setLogged(true)
    });
}
  // To get the data
  React.useEffect(setData, [props.url,props.title, updateProps]);


  

  // material list with checkboxes

  const classes = useStyles();
  

  const handleToggle = (value) => () => {
    const currentIndex = state.checked.indexOf(value);
    const newChecked = [...state.checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    console.log("Checked: ", newChecked)
    setState(state => ({ ...state,checked:newChecked}));
  };


  function setAlert() {
    console.log("Sending the data to the server: ",state.checked)
    var sendData = [
      {name: "vol_id", value: props.user_id},
      {name: "delivery_ids", value: state.checked}

    ]
    $.post("http://"+window.location.hostname+":3000/volunteer/setToContact",sendData,(_)=>{
          console.log("Finished query!")
          ++updateProps
          setData()
        })
  }

  const mobileCheck = function() {
    return window.screen.width < 620
  };


  const createList = state.data.map((row) => {
    const value = row[state.columns[0]]
    // console.log("Row: ",row, "Value: ", value)
    const labelId = `checkbox-list-label-${value}`;

    return (
        <div className = {classes.root}>
          <ListItem key={value} role={undefined} dense button onClick={handleToggle(value)} >
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={state.checked.indexOf(value) !== -1}
                tabIndex={-1}
                disableRipple
                inputProps={{ 'aria-labelledby': labelId }}
              />
            </ListItemIcon>
            
            <ListItemText
              primary={<Typography style = {{fontWeight : "bold"}} varient = "body">{row[state.columns[1]]}</Typography>}
              secondary={
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                  >
                    {row[state.columns[2]]}
                  </Typography>
                  <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                    style={{whiteSpace: 'pre-line'}}
                  >
                    <br/>{row[state.columns[3]]}
                  </Typography>
                  <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    style={{whiteSpace: 'pre-line'}} 
                  >
                  {/* the style whitespace property allows the use of the newline character */}
                  <br/> {row[state.columns[4]]} {row[state.columns[4]]>1? "Meals": "Meal"}
                  </Typography>
                </React.Fragment>
              }
            />
          </ListItem>
        </div>
    );
  })
  console.log(state.data)
  return (
    <div style = {{overflowX: "hidden", padding : '0px'}}>
      <h2>{props.title}</h2> 
      <h5>{state.data.length <= 0 ? 'No new deliveries.' : 'Can you complete any of these?'}</h5>
      <br/>

      {state.data.length <= 0 ? 
        <div className={classes.root} >  
        </div> 
        : 
        <div>
          <List className={classes.list}>
            {createList}
          </List>
          
          <br/>
          
          <Button 
            className = {classes.button} 
            variant="contained"  
            onClick = {setAlert} 
            style = {{ width: mobileCheck()?"30%":"36%", backgroundColor : '#239A55', color : 'white', float : 'left', marginLeft : '10%', margin : 'auto', width : '100%', borderRadius: 14, fontWeight : 'bold', textTransform: 'none', fontSize: '20px', height: '45px'}}
          >
            I can do this!
          </Button> 
        </div>
      }

    </div>
  );
}

