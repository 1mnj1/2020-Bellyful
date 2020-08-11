import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { GridOn } from '@material-ui/icons';
import { Divider } from '@material-ui/core';
import Box from '@material-ui/core/Box'
import Collapsible from 'react-collapsible'
import './sass/main.scss'
import $ from 'jquery'

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },

  root: {
    flexGrow: 1,
    overflow: 'hidden',
    padding: theme.spacing(0, 3),
  },
  paper: {
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(2),
  },
  
}));

function createData(name, address, email, phone, ice) {
  return {name, address, email, phone, ice };
}





export default function SimpleTable(props) {
  var requestServer = 0
  const [vols, setVol] = React.useState([]);
  const [freezers, setFreezers] = React.useState([]);
  const [Deliveries, setDeliveries] = React.useState([]);
  // console.log(data)
  var volurl = "http://"+window.location.hostname+":3000/manager/getVolunteers";
  var freezerurl = "http://"+window.location.hostname+":3000/manager/getFreezerManager";
  var delurl = "http://"+window.location.hostname+":3000/manager/getDeliveries";

  //use effect copied from https://reactjs.org/docs/hooks-effect.html#tip-optimizing-performance-by-skipping-effects
  React.useEffect(() => {
    $.post( volurl ,  function( returnable ) {
      $(setVol(returnable))
    
  });
  }, [props.loggedIn ]);
  React.useEffect(() => {
    $.post( freezerurl ,  function( returnable ) {
      $(setFreezers(returnable))
    
  });
  }, [props.loggedIn ]);
  React.useEffect(() => {
    $.post( delurl ,  function( returnable ) {
      $(setDeliveries(returnable))
    
  });
  }, [props.loggedIn ]); 
  const classes = useStyles();
  console.log("Rows: ",vols)
  //Creating a reusable TABLE OBJECT that can be placed in multiple areas with a simple call
  const tableComp = (data)=>{
    if(data == null) return null
    if (data == undefined) return null
    if(data.length == 0) return null
    console.log("Data in table: ",data)
    
    return (
  <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            {Object.keys(data[0]).map((key) => (<TableCell align="right"><b>{key}</b></TableCell>))}
            
          </TableRow>
        </TableHead>
        <TableBody>
        
          {//row is a dictionary
          
          data.map((row) => {
            console.log("Row: ",row);
            return (            
            <TableRow key={row.id}>
              {Object.values(row).map((value) => (<TableCell align="right">{value}</TableCell>)) }
              
            
            </TableRow>
          )})}
        </TableBody>
      </Table>
    </TableContainer>)}

  if(props.loggedIn > 0){
    return (
        <div classname={classes.root}>
          <Collapsible trigger = "Volunteer Table"
          transitionTime={100} 
          triggerClassName = 'CustomTriggerCSS--open'
          triggerOpenedClassName = 'CustomTriggerCSS'>
            <Paper className={classes.paper}>
                <Grid container direction="column" wrap="wrap" spacing={2}>
                    <Grid item xs zeroMinWidth>
                        {tableComp(vols)}
                    </Grid>
                </Grid>
            </Paper>
            </Collapsible>
            <Collapsible trigger = "Freezer table" 
            transitionTime={100} 
            triggerClassName = 'CustomTriggerCSS--open'
            triggerOpenedClassName = 'CustomTriggerCSS'
            >
              <Paper className={classes.paper}>
                  <Grid container direction="column" wrap="wrap" spacing={2}>
                      <Grid item xs zeroMinWidth>
                          {tableComp(freezers)}
                      </Grid>
                  </Grid>
              </Paper>
            </Collapsible>
            <Collapsible trigger = "Deliveries table" 
            transitionTime={100} 
            triggerClassName = 'CustomTriggerCSS--open'
            triggerOpenedClassName = 'CustomTriggerCSS'
            >
              <Paper className={classes.paper}>
                  <Grid container direction="column" wrap="wrap" spacing={2}>
                      <Grid item xs zeroMinWidth>
                          {tableComp(Deliveries)}
                      </Grid>
                  </Grid>
              </Paper>
            </Collapsible>
        </div>
    );
  } else {
  return null
  };
    }
