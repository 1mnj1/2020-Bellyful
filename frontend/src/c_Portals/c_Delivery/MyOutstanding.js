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


const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    
    // textAlign: "center",
    backgroundColor: theme.palette.background.paper,
  },


  list: {
    backgroundColor: "#f7f7f7",
  }


}));


export default function MyOutstanding (props) {
    
    // const [state, setState] = React.useState({
    //     visible: [],
    //     columns: [ {}, ],
    //     data: [  ],
    // });
    const state = props.myOustanding
    const setState = props.setMyOutstanding
    

    //use effect copied from https://reactjs.org/docs/hooks-effect.html#tip-optimizing-performance-by-skipping-effects
    console.log("User id: ", props.user_id)
    // To get the data
    React.useEffect(() => {
        
        $.post( props.url,[{"name":"user_id","value":props.user_id}], function(returnable) {
        if(returnable === null) return 
        if (returnable === undefined) return 
        if(returnable.length === 0) return 
        var fields = Object.keys(returnable[0])
        var hidden = state.visible == null ?  [] : state.visible
        if(state.visible == null){
          for (var i = 0; i < returnable.length; ++i){
            hidden.push(false)
          }
        }
        // To use an encapsulated function, put a dollar in front of it (it just works ?!)
        // $(setState(state => ({ ...state,columns:cols.toArray(), data : returnable})))
        $(setState(state => ({ ...state,visible: hidden,columns:fields, data : returnable})))
        // this.props.setLogged(true)
    });
    }, [props.url,props.user_id ]);



    const classes = useStyles();
  
    const handleToggle = (value) => () => {
      var visible = [...state.visible]
      visible[value] = !visible[value]
      setState(state => ({ ...state,visible: visible}))
    };
    const removeDelivery = (del_id)=>
    {
      var oldState = {...state}
      for (var i = 0; i < oldState.data.length; ++i){
        if(oldState.data[i][state.columns[0]] == del_id){
          oldState.visible.splice(i, 1)
          oldState.data.splice(i, 1)
          break
        }

      }
      setState(oldState)
      
    }
    const renderDropdown = (value,phone,email)=>{
      
      return <DeliveryDetail 
              reloadPage = {removeDelivery} 
              delivery_id ={value} 
              outstanding = {true}
              phone = {phone} 
              email = {email}
              setdeliveryID = {props.setdeliveryID} />
    }
    console.log(state.data.length)
    console.log(state.data)
    const createList = state.data.map((row, index) => {
      const value = row[state.columns[0]]
      const labelId = `checkbox-list-label-${value}`;
      console.log(state.visible[index])
      return (
        
        <div>
          
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
                  <ReqMeals delivery_id = {value}/>
                </Grid>
              </Grid>
            </ListItem>
            {
              
              state.visible[index] ? 
              renderDropdown(value,row[state.columns[3]],row[state.columns[5]] ) 
              : <div/>
            }
          <Divider component="li" />
        </div>
      );
    })
    return (
      <div style = {{overflowX: "hidden", paddingBottom: "20vh"}}>
        <h2>{props.title}</h2> 
        
        {state.data.length <= 0 ? 
        <div className={classes.root} > Nothing to show! </div> 
        : 
        <List className={classes.list}>
            {createList}
        </List>}

      </div>
    );
      }

