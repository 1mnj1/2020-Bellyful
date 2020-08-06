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
    maxWidth: 600,
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(2),
  },
  
}));

function createData(name, address, email, phone, ice) {
  return {name, address, email, phone, ice };
}

const rows = [
  createData('Matt', 'address 1', 'email 1', 'phone 1', 'ice 1'),
  createData('Chris', 'address 2', 'email 2', 'phone 2', 'ice 2'),
  createData('Megan', 'address 3', 'email 3', 'phone 3', 'ice 3'),
  createData('Piyathi', 'address 4', 'email 4', 'phone 4', 'ice 4'),
  createData('Matt', 'address 1', 'email 1', 'phone 1', 'ice 1'),
  createData('Chris', 'address 2', 'email 2', 'phone 2', 'ice 2'),
  createData('Megan', 'address 3', 'email 3', 'phone 3', 'ice 3'),
  createData('Piyathi', 'address 4', 'email 4', 'phone 4', 'ice 4'),
  createData('Matt', 'address 1', 'email 1', 'phone 1', 'ice 1'),
  createData('Chris', 'address 2', 'email 2', 'phone 2', 'ice 2'),
  createData('Megan', 'address 3', 'email 3', 'phone 3', 'ice 3'),
  createData('Piyathi', 'address 4', 'email 4', 'phone 4', 'ice 4'),
];



export default function SimpleTable() {
  const classes = useStyles();

  const tableComp = <TableContainer component={Paper}>
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
    </TableContainer>

  return (
      <div classname={classes.root}>
        <Box></Box>
          <Paper className={classes.paper}>
              <Grid container direction="column" wrap="wrap" spacing={2}>
                  <Grid item xs zeroMinWidth>
                      {tableComp}
                  </Grid>
              </Grid>
          </Paper>
          <Divider/>
          <Paper className={classes.paper}>
              <Grid container direction="column" wrap="wrap" spacing={2}>
                  <Grid item xs zeroMinWidth>
                      {tableComp}
                  </Grid>
              </Grid>
          </Paper>
      </div>
  );
}
