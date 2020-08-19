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
    }, [props.url,props.user_id]);


    



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
    const createList = state.data.map((row) => {
      const value = row[state.columns[0]]
      const labelId = `checkbox-list-label-${value}`;
      return (
        
        <div>
          <div>
            <ListItem key={value} role={undefined} dense button onClick={handleToggle(value)}>
                         
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
        <h2>{props.title}</h2> 
        <List className={classes.root}>
            {createList}
        </List>

      </div>
    );
      }

