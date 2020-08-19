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
    width: "100vw",
    
    // textAlign: "center",
    backgroundColor: theme.palette.background.paper,
  },
}));


export default function UnassignedDeliveries (props) {

    const [state, setState] = React.useState({
        columns: [ {}, ],
        data: [ {}, ],
    });


    // function onClickAlert() {
    //   // TODO: Add in functionality for displaying the logged in user name
    //   // Alert.alert(
    //   //   "Alert Title",
    //   //   "My Alert Msg",
    //   //   [
    //   //     {
    //   //       text: "Cancel",
    //   //       onPress: () => console.log("Cancel Pressed"),
    //   //       style: "cancel"
    //   //     },
    //   //     { text: "OK", onPress: () => console.log("OK Pressed") }
    //   //   ],
    //   //   { cancelable: false }
    //   // );
      
    //   // return (
    //   //   // Cannot resolve alert? tried to install but wont install
    //   //   // <Alert> This is an alert!</Alert>
        
    //   // )
    // }
    
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

        console.log("before logging the columns for props", props.title)
        console.log("columns = ",fields)
        console.log("before logging the objects for props", props.title)
        console.log("deliveries = ",returnable)
        
        // To use an encapsulated function, put a dollar in front of it (it just works ?!)
        // $(setState(state => ({ ...state,columns:cols.toArray(), data : returnable})))
        $(setState(state => ({ ...state,columns:fields, data : returnable})))
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


    function setAlert() {
      return (<Alert severity="success">Thank you Joan</Alert>)
    }

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
    const createList = state.data.map((row) => {
      const value = row[state.columns[0]]
      console.log("Row: ",row, "Value: ", value)
      const labelId = `checkbox-list-label-${value}`;

      console.log("row 1: ", row[state.columns[1]])
      console.log("row 2: ", row[state.columns[2]])
      console.log("row 3: ", row[state.columns[3]])
      console.log("row 4: ", row[state.columns[4]])

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
                primary={row[state.columns[1]]}
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
          
        </div>
      );
    })
    return (
      <div style = {{overflowX: "hidden"}}>
        <h2>New Deliveries</h2> 
      <List className={classes.root}>
        {createList}
      </List>

      <Button 
        variant="contained" 
        color="secondary" 
        onClick={setAlert}
      >
        I can do this!
      </Button>

      </div>
    );
      }

