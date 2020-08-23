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



const useStyles = makeStyles((theme) => ({
  root: {
    width: "100vw",
    
    // textAlign: "center",
    backgroundColor: theme.palette.background.paper,
  },
}));


export default function MyOutstanding (props) {
    
    // const [state, setState] = React.useState({
    //     visible: [],
    //     columns: [ {}, ],
    //     data: [  ],
    // });
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


    



    const classes = useStyles();
  
    
    
    console.log(state.data.length)
    console.log(state.data)
    const createList = state.data.map((row, index) => {
      const value = row[state.columns[0]]
      const labelId = `checkbox-list-label-${value}`;
      // console.log("MY Confirmed value: ",value)
      return (
        
        <div>
          <div>
            <ListItem key={value} role={undefined} dense button onClick={()=>setState({...state, deliveryID: value})    }>
                         
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
                    <br/> {row[state.columns[4]]} {row[state.columns[4]]>1? "Meals": "Meal"}
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
            
          </div>
          <Divider component="li" />
        </div>
      );
    })
    return (
      <div style = {{overflowX: "hidden", paddingBottom: "20vh"}}>
        <h2>{props.title}</h2> 
        
        {state.data.length <= 0 ? 
        <div className={classes.root} > Nothing to show! </div> : <List className={classes.root}>
            {createList}
        </List>}

      </div>
    );
      }

