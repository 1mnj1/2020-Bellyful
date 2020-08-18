import React, {Text} from "react"
import $ from 'jquery'

import {Alert, Button} from "react-native"

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 400,
    // textAlign: "center",
    backgroundColor: theme.palette.background.paper,
  },
}));


export default function UnassignedDeliveries (props) {

    const [state, setState] = React.useState({
        columns: [ {}, ],
        data: [ {}, ],
    });

    const setColumns = (colNames)=>{
        var columns = []; 
        colNames.forEach(element => columns.push({title: element, field: element}));
        return columns
    }

    function onClickAlert() {
      // TODO: Add in functionality for displaying the logged in user name
      // Alert.alert(
      //   "Alert Title",
      //   "My Alert Msg",
      //   [
      //     {
      //       text: "Cancel",
      //       onPress: () => console.log("Cancel Pressed"),
      //       style: "cancel"
      //     },
      //     { text: "OK", onPress: () => console.log("OK Pressed") }
      //   ],
      //   { cancelable: false }
      // );
      
      // return (
      //   // Cannot resolve alert? tried to install but wont install
      //   // <Alert> This is an alert!</Alert>
        
      // )
    }
    
    console.log("before the get data request for deliveries")
    console.log(props.url)

    //use effect copied from https://reactjs.org/docs/hooks-effect.html#tip-optimizing-performance-by-skipping-effects

    // To get the data
    React.useEffect(() => {
        
        $.post( props.url, function(returnable) {
        if(returnable === null) return 
        if (returnable === undefined) return 
        if(returnable.length === 0) return 

        var fields = Object.keys(returnable[0])
        var values = Object.values(returnable[0])
        console.log('fields from object.keys', fields)
        console.log('values from object.values', values)

        const cols = $(setColumns(fields))
        console.log("before logging the columns for props", props.title)
        console.log("columns = ",cols)
        console.log("before logging the objects for props", props.title)
        console.log("deliveries = ",returnable)
        
        // To use an encapsulated function, put a dollar in front of it (it just works ?!)
        // $(setState(state => ({ ...state,columns:cols.toArray(), data : returnable})))
        $(setState(state => ({ ...state,columns:cols.toArray(), data : values})))
        // this.props.setLogged(true)
    });
    }, [props.url,props.title]);






    // material list with checkboxes

    const classes = useStyles();
    const [checked, setChecked] = React.useState([0]);
  
    const handleToggle = (value) => () => {
      const currentIndex = checked.indexOf(value);
      const newChecked = [...checked];
  
      if (currentIndex === -1) {
        newChecked.push(value);
      } else {
        newChecked.splice(currentIndex, 1);
      }
  
      setChecked(newChecked);
    };


    // const contents = this.state.data.forEach(item => {
    //   // change the title and location key based on your API
    //   return (
    //     <ListItemText 
    //     // id={labelId} 
    //     primary={item.Recipient}
    //     secondary={item.Meals} 
    //     />
    //   )

    // });
  
    return (
      <div>
        <h2>New Deliveries</h2> 
      <List className={classes.root}>
        {/* {[0, 1, 2, 3].map((value) => { */}
        {state.columns.map((value) => {
          const labelId = `checkbox-list-label-${value}`;
  
          return (
            <div>
              <div>
                <ListItem key={value} role={undefined} dense button onClick={handleToggle(value)}>
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={checked.indexOf(value) !== -1}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ 'aria-labelledby': labelId }}
                    />
                  </ListItemIcon>
                 
                  <ListItemText
                    primary="Michael Hill"
                    secondary={
                      <React.Fragment>
                        <Typography
                          component="span"
                          variant="body2"
                          className={classes.inline}
                          color="textPrimary"
                        >
                          123 Street, Albany
                        </Typography>
                        <Typography
                          component="span"
                          variant="body2"
                          className={classes.inline}
                          color="textPrimary"
                          style={{whiteSpace: 'pre-line'}}
                        >
                          {'\n'} 021123456789
                        </Typography>
                        <Typography
                          component="span"
                          variant="body2"
                          className={classes.inline}
                          style={{whiteSpace: 'pre-line'}} 
                        >
                        {/* the style property allows the use of the newline character */}
                        {'\n'} 2 Meals
                        </Typography>
                      </React.Fragment>
                    }
                  />
                </ListItem>
              </div>
              
            </div>
          );
        })}
      </List>

      <Button
        title="I can do this!"
        color="rgb(225, 127, 188)"
        onPress={() => Alert.alert('Thank you Joan')}
      />

      </div>
    );
      }

