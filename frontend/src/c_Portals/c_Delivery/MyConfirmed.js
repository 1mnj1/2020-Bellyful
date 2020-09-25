import React from "react"
import $, { data } from 'jquery'
import Divider from '@material-ui/core/Divider';
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
import DeliveryDetail from './DeliveryDetail'
import ReqMeals from '../c_Freezer/ReqMeals'
import Grid from '@material-ui/core/Grid';
import DeliveryStartStop from './DeliveryStartStop'


import StyledButton from './StyledButton.js'


const useStyles = makeStyles((theme) => ({
  root: {
    width: "100vw",
  },

  list: {
    backgroundColor: "#f7f7f7",
  }
}));




export default function MyOutstanding (props) {

    const state = props.state
    const setState = props.setState
    
    //use effect copied from https://reactjs.org/docs/hooks-effect.html#tip-optimizing-performance-by-skipping-effects
    console.log("User id: ", props.user_id)
    // To get the data
    React.useEffect(() => {
        
        $.post( props.url,[{"name":"user_id","value":props.user_id}], function(returnable) {
        if(returnable === null) return 
        if (returnable === undefined) return 
        if(returnable.length === 0) return 
        var fields = Object.keys(returnable[0])
        
        // To use an encapsulated function, put a dollar in front of it (it just works ?!)
        // $(setState(state => ({ ...state,columns:cols.toArray(), data : returnable})))
        $(setState(state => ({ ...state,columns:fields, data : returnable})))
        // this.props.setLogged(true)
    });
    }, [props.url,props.user_id ]);


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

    function getDirections () {
      return <a href="http://maps.google.com/maps?daddr=-36.7337425,174.6971653&amp;ll=" target="_blank" >Get Directions</a>
    }

    const mobileCheck = function() {
        
      return window.screen.width < 620
    };



    const classes = useStyles();
  
  
    console.log(state.data.length)
    console.log(state.data)
    const createList = state.data.map((row, index) => {
      const value = row[state.columns[0]]
      const labelId = `checkbox-list-label-${value}`;
      // console.log("MY Confirmed value: ",value)
      console.log(row[state.columns[0]]);
      console.log(row[state.columns[1]]);
      console.log(row[state.columns[2]]);
      console.log(row[state.columns[3]]);
      console.log(row[state.columns[4]]);
      console.log(row[state.columns[5]]);
      console.log(row[state.columns[6]]); // start time
      console.log(row[state.columns[7]]); // end time

      return (
        
        <div>
          <div>
            <ListItem key={value} role={undefined} dense button> {/*onClick={()=>setState({...state, deliveryID: value})    }>*/}
              <Grid  container spacing={3}>
                <Grid item xs={12} sm={9}>
                  <ListItemText
                    primary={row[state.columns[1]]}
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
                        </Typography>
                        
                      </React.Fragment>
                    }
                  /> 
                  </Grid>
                  <Grid item xs={12} sm={3}>

                    <DeliveryStartStop nostyle = {true} delivery_id = {value} reloadPage = {removeDelivery}  />
                  </Grid>
                  
                <Grid item xs={12} sm={3}>
                  <ReqMeals delivery_id = {value}/>
                </Grid>
                
              </Grid>
            </ListItem>
            
          </div>
          <Divider component="li" />
        </div>
      );
    })
    return (
      <div style = {{overflowX: "hidden", paddingBottom: "20vh"}}>
        <h2>{props.title}</h2> 
        <h5>{state.data.length <= 0 ? 'None. Call a recipient from My Outstanding to sort out a delivery time.' : 'Which one are you doing now?'}</h5>
        <br/>
        
        {state.data.length <= 0 ? 
        <div className={classes.root} > </div>
         : 
         <List className={classes.list}>
            {createList}
        </List>}
          <br/>
        <Grid>
          <StyledButton customColor = '#24a85b'>This is a button</StyledButton>
          <Button className = {classes.button} variant="contained"  onClick = {getDirections()} style = {{width: mobileCheck()?"80%":"92%", margin : 'auto', backgroundColor: '#3d90fa'}}>
            <a href="http://maps.google.com/maps?daddr=lat,long&amp;ll="> Get directions </a>
          </Button>
        </Grid>

      </div>
    );
      }

