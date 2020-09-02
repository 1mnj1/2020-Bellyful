import React from "react"
import $ from 'jquery'

import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

import FreezerManagerDetail from './FreezerManagerDetail';



const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));


export default function FreezerManagers (props) {

  // allows the state to be saved when you leave the page. when you come back it will be the same
  const state = props.state
  const setState = props.setState

  console.log(props.url)
  console.log("User id: ", props.user_id)
    // To get the data
    React.useEffect(() => {
        // need to be using branch id
        $.post( props.url,[{"name":"branch_id","value":props.branch_id}], function(returnable) {
        if(returnable === null) return 
        if (returnable === undefined) return 
        if(returnable.length === 0) return 
        var fields = Object.keys(returnable[0])
        $(setState(state => ({ ...state,columns:fields, data : returnable})))
    });
    }, [props.url,props.user_id ]);


  const classes = useStyles();

  const createList = state.data.map((row) => {
    const value = row[state.columns[0]]
    console.log("Row: ",row, "Value: ", value)
    console.log("freezer manager id: ", row[state.columns[5]])

    return (
      <div>
        <div>
          <ListItem key={value} role={undefined} dense button onClick={()=>setState({...state, branchManagerClicked: value, freezerManagerId: row[state.columns[5]]})}>          
            <ListItemText
              primary = {
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                  >
                    {row[state.columns[0]]} 
                  </Typography>
                  </React.Fragment>
              }
              secondary= {
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                    style={{whiteSpace: 'pre-line'}}
                  >
                    {row[state.columns[1]]}
                  </Typography>
                  <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                    style={{whiteSpace: 'pre-line'}}
                  >
                    <br/>{row[state.columns[2]]}&nbsp;
                  </Typography>
                  <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                    style={{whiteSpace: 'pre-line'}}
                  >
                    <br/>{row[state.columns[3]]}&nbsp;Branch
                  </Typography>
                  <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                    style={{whiteSpace: 'pre-line'}}
                  >
                    <br/>{row[state.columns[4]]}&nbsp;
                  </Typography>
                  {/* <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    style={{whiteSpace: 'pre-line'}}
                  >
                    <br/>{row[state.columns[5]]}&nbsp;Available Meals
                  </Typography> */}
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
