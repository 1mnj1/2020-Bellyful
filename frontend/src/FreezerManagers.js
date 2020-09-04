import React from "react"
import $ from 'jquery'

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

import FreezerLog from './FreezerLog';

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

        var visible = []
        // adding a new field onto the managers
        for (var i = 0; i < returnable.length; ++i) visible.push(false)

        $(setState(state => ({ ...state,columns:fields, data : returnable, hidden: visible})))
    });
    }, [props.url,props.user_id ]);


  const classes = useStyles();

  const createList = state.data.map((row, idx) => {
    const value = row[state.columns[0]]
    console.log("Row: ",row, "Value: ", value)
    console.log("freezer manager id: ", row[state.columns[5]])

    return (
      <div>
        <div>
          {/* <ListItem key={value} role={undefined} dense button onClick={()=>setState({...state, branchManagerClicked: value, freezerManagerId: row[state.columns[5]]})}>           */}
          <ListItem key={value} role={undefined} dense button onClick={()=>{var visible = [...state.hidden]; visible[idx] = !visible[idx]; console.log("visible", visible); setState({...state, hidden: visible, freezerManagerId: row[state.columns[5]]})}}>          
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

            
                </React.Fragment>
              }
            />
           
            
          </ListItem>
          {(state.hidden[idx] === false) ? null :
                  
                  <React.Fragment>
    
                    <FreezerLog
                      title = "Freezer Log" 
                      url = {"http://"+window.location.hostname+":3000/volunteer/getFreezerLog"}
                      user_id = {state.freezerManagerId}
                      delivery_id = {props.delivery_id}
                      reload = {props.reload}
                      setReload = {props.setReload}
                    >
                      
                    </FreezerLog>
                  </React.Fragment> 
          }
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
