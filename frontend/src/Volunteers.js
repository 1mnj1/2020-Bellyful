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
  const [rows, setRows] = React.useState([]);
  // console.log(data)
  var url = "http://"+window.location.hostname+":3000/manager/getVolunteers";
  console.log(url)

  //use effect copied from https://reactjs.org/docs/hooks-effect.html#tip-optimizing-performance-by-skipping-effects
  React.useEffect(() => {
    $.post( url ,  function( returnable ) {
      console.log("VolunteersObj = ", returnable)
      
      // To use an encapsulated function, put a dollar in front of it (it just works ?!)
      
      $(setRows(returnable))
    
      // this.props.setLogged(true)
  });
  }, [props.loggedIn ]);
    
  const classes = useStyles();
  console.log("Rows: ",rows)
  //Creating a reusable TABLE OBJECT that can be placed in multiple areas with a simple call
  const tableComp = (<TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Volunteer</TableCell>
            <TableCell align="right">Address</TableCell>
            <TableCell align="right">Email Address</TableCell>
            <TableCell align="right">Phone Number</TableCell>
            <TableCell align="right">Emergency Contact</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.address}</TableCell>
              <TableCell align="right">{row.email}</TableCell>
              <TableCell align="right">{row.phone}</TableCell>
              <TableCell align="right">{row.ice}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>)

  if(props.loggedIn > 0){
    return (
        <div classname={classes.root}>
          <Collapsible trigger = "Volunteer Table 1"
          transitionTime={100} 
          triggerClassName = 'CustomTriggerCSS--open'
          triggerOpenedClassName = 'CustomTriggerCSS'>
            <Paper className={classes.paper}>
                <Grid container direction="column" wrap="wrap" spacing={2}>
                    <Grid item xs zeroMinWidth>
                        {tableComp}
                    </Grid>
                </Grid>
            </Paper>
            </Collapsible>
            <Collapsible trigger = "Volunteer table 2" 
            transitionTime={100} 
            triggerClassName = 'CustomTriggerCSS--open'
            triggerOpenedClassName = 'CustomTriggerCSS'
            >
              <Paper className={classes.paper}>
                  <Grid container direction="column" wrap="wrap" spacing={2}>
                      <Grid item xs zeroMinWidth>
                          {tableComp}
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
