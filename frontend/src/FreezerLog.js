import React, {Text} from "react"
import $ from 'jquery'

import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
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


export default function FreezerLog (props) {

    const [state, setState] = React.useState({
        columns: [ {}, ],
        data: [ {}, ],
    });

    const setColumns = (colNames)=>{
        var columns = []; 
        colNames.forEach(element => columns.push({title: element, field: element}));
        return columns
    }


    function setAlert() {
      return (<Alert severity="success">Freezer Updated!</Alert>)
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

  
    return (
      <div>
        <h2>Meghan's Freezer</h2> 
      <List className={classes.root}>
        {/* THIS DOES GET THE CORRECT NUMBER OF ITEMS, I JUST DONT KNOW HOW TO ACCESS THEM */}
        {/* {state.columns.map((value) => { */}
        {[0, 1, 2, 3, 5].map((value) => {
          const labelId = `checkbox-list-label-${value}`;
  
          return (
            <div>
              <div>
                <ListItem key={value} role={undefined} dense button onClick={handleToggle(value)}>
                  {/* <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={checked.indexOf(value) !== -1}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ 'aria-labelledby': labelId }}
                    />
                  </ListItemIcon> */}
                 
                  <ListItemText
                    primary="Lasagna"
                    secondary={
                      <React.Fragment>
                        <Typography
                          component="span"
                          variant="body2"
                          className={classes.inline}
                          color="textPrimary"
                        >
                          x20
                        </Typography>
                      </React.Fragment>
                    }
                  />
                  {/* <Button title="+" color="808080"></Button> */}
                </ListItem>
              </div>
              {/* <div>
                  <ListItemText
                    primary="Mac & Cheese"
                    secondary={
                      <React.Fragment>
                        <Typography
                          component="span"
                          variant="body2"
                          className={classes.inline}
                          color="textPrimary"
                        >
                          x20
                        </Typography>
                      </React.Fragment>
                    }
                  />
                </ListItem>
              </div> */}
              
            </div>
          );
        })}
      </List>

      <Button 
        variant="contained" 
        color="primary" 
        onClick={setAlert}
      >
        Top up
      </Button>

      <Button 
        variant="contained" 
        color="secondary" 
        onClick={setAlert}
      >
        Taken
      </Button>


      </div>
    );
      }

