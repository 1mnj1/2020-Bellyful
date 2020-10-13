
import React from "react"
import $ from 'jquery'

import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
// import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';

import Typography from '@material-ui/core/Typography';
import DeliveryDoneDetails from './DeliveryDoneDetails'
import Grid from '@material-ui/core/Grid';

import DeliveryReset from './DeliveryReset'



const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
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
      visible: []
  });
  var updateProps = 1

  //use effect copied from https://reactjs.org/docs/hooks-effect.html#tip-optimizing-performance-by-skipping-effects
  const setData = () => {
    console.log('before post')
    $.post( props.url,[{name: "user_id" , value: props.user_id}], function(returnable) {
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
    console.log('after post')
}
  // To get the data
  React.useEffect(setData, [props.url, props.title, updateProps]);


  

  // material list with checkboxes

  const classes = useStyles();
  

  const handleToggle = (value) => () => {
    var visible = [...state.visible]
    visible[value] = !visible[value]
    setState(state => ({ ...state,visible: visible}))
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

  const removeDelivery = (del_id)=>
  {
    var oldState = {...state}
    for (var i = 0; i < oldState.data.length; ++i){
      if(oldState.data[i][state.columns[0]] == del_id){
        oldState.data.splice(i, 1)
        break
      }

    }
    setState(oldState)
    
  }

  const resetTime = () => {
    //   '2020-09-15 14:07:43'
    //    2020-09-09 17:12:00
    var sendData = [
        {"name": "delivery_id", "value": props.delivery_id},
        {"name": "start", "value": state.start},
        {"name": "end", "value": state.end}
    ]

    $.post("http://"+window.location.hostname+":3000/volunteer/updateStartStopAndStatus",sendData,(_)=>{
        console.log("Updated the start and stop times!")
    })
  }




  const createList = state.data.map((row, index) => {
    const value = row[state.columns[0]]
    // console.log("Row: ",row, "Value: ", value)

    return (
        <div className = {classes.root}>
           <ListItem key={value} role={undefined} dense button onClick={handleToggle(index)}>
            <Grid  container spacing={3}>
                <Grid item xs={12} sm={9}>          
              <ListItemText
                primary={<Typography style = {{fontWeight : 'bold'}} variant = "body">{row[state.columns[1]]}</Typography>}
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      className={classes.inline}
                      color="textPrimary"
                      //name
                    >
                      {row[state.columns[2]]}
                    </Typography>
                    
                    <Typography
                      component="span"
                      variant="body2"
                      className={classes.inline}
                      color="textPrimary"
                      style={{whiteSpace: 'pre-line'}}
                      // street
                    >
                      <br/>{row[state.columns[3]]}
                    </Typography>
                    <Typography
                      component="span"
                      variant="body2"
                      className={classes.inline}
                      style={{whiteSpace: 'pre-line'}} 
                      //phone
                    >
                    {/* the style whitespace property allows the use of the newline character */}
                    <br/> {row[state.columns[4]]} Required {row[state.columns[4]]>1? "Meals": "Meal"}
                    </Typography>
                  </React.Fragment>
                }
              />
              </Grid>
                <Grid item xs={12} sm={3}>
                  <Button 
                    variant="contained"  
                    style = {{ width: '100%', backgroundColor: '#2983F7', color : 'white', margin : 'auto', borderRadius: 6, fontWeight : 'bold', fontSize: '16px'}}
                  >
                    Completed
                  </Button>
                  <DeliveryReset
                    reloadPage = {removeDelivery} 
                    delivery_id ={value} 
                    setdeliveryID = {props.setdeliveryID}
                    url = ""
                    status = "Assigned"
                  >

                  </DeliveryReset>
                </Grid>
              </Grid>
            </ListItem>
            {
              
              state.visible[index] ? 
              <DeliveryDoneDetails delivery_id = {value}/> 
              : <div/>
            }
        </div>
    );
  })
  console.log(state.data)
  return (
    <div style = {{overflowX: "hidden", padding : '0px'}}>
      <h2>{props.title}</h2> 
      <h5>{state.data.length <= 0 ? 'You have not completed any deliveries.' : 'Congratulations! You have completed ' + state.data.length + ' deliveries so far. '}</h5>
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
          
        </div>
      }

    </div>
  );
}