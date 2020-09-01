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

  const state = props.state
  const setState = props.setState

  //   const [state, setState] = React.useState({
  //       columns: [ {}, ],
  //       data: [ {}, ],
  //   });

  //   const setColumns = (colNames)=>{
  //     var columns = []; 
  //     colNames.forEach(element => columns.push({title: element, field: element}));
  //     return columns
  // }


  console.log("before the get data request for freezer manager")
  console.log(props.url)

  const handleClick = (value, freezerManagerId) => () => {
    alert("list item clicked");
    var url = "http://"+window.location.hostname+":3000/volunteer/getFreezerLog";
    // return (
    //   <FreezerManagerDetail 
    //   title = 'Freezer Manager Detail Page'
    //   url={"http://"+window.location.hostname+":3000/volunteer/getFreezerLog"}
    //   person_id = {freezerManagerId}
    // >

    // </FreezerManagerDetail>
    // )
    console.log("end of function")
  }

  // To get the data
  // React.useEffect(() => {
      
  //     $.post( props.url, function(returnable) {
  //     if(returnable === null) return 
  //     if (returnable === undefined) return 
  //     if(returnable.length === 0) return 

  //     var fields = Object.keys(returnable[0])
  //     var values = Object.values(returnable[0])
  //     console.log('fields from object.keys', fields)
  //     console.log('values from object.values', values)
  //     const cols = $(setColumns(fields))
  //     console.log("before logging the columns for props", props.title)
  //     console.log("columns = ",fields)
  //     console.log("before logging the objects for props", props.title)
  //     console.log("meals = ",returnable)
      
  //     $(setState(state => ({ ...state,columns:fields, data : returnable})))

  // });
  // }, [props.url,props.title]);

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

  const createList = state.data.map((row) => {
    const value = row[state.columns[0]]
    console.log("Row: ",row, "Value: ", value)
  
    console.log("row 0 :", row[state.columns[0]])
    console.log("row 1 :", row[state.columns[1]])
    console.log("row 2 :", row[state.columns[2]])
    console.log("row 3 :", row[state.columns[3]])
    console.log("row 4 :", row[state.columns[4]])
    console.log("row 5 :", row[state.columns[5]])
    console.log("row 6 :", row[state.columns[6]])

    return (
      <div>
        <div>
          {/* <ListItem key={value} role={undefined} dense button onClick={handleClick(value, row[state.columns[6]])}>           */}
          <ListItem key={value} role={undefined} dense button onClick={()=>setState({...state, branchManagerClicked: value})}>          
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
                  <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                    style={{whiteSpace: 'pre-line'}}
                  >
                    <br/>{row[state.columns[5]]}&nbsp;Available Meals
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
