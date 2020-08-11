import React from 'react'
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import Paper from '@material-ui/core/Paper';
import MaterialTable from 'material-table'
import port from './config'
import $ from 'jquery'
import Collapsible from 'react-collapsible';


export default function AutoTable(props){

  const [state, setState] = React.useState({
    columns: [
      { title: 'Name', field: 'name' },
      { title: 'Email', field: 'email' },
      { title: 'Phone', field: 'phone',},
      { title: 'Status', field: 'status',},
    ],
    data: [
      { name: 'Chris Macdonald', email: 'chrisjmacdonald@gmail.com', phone: "0226897257", status: 'active' },
    ],
  });
  
  var url = "http://"+window.location.hostname+":3000/manager/getVolunteers";
  console.log(url)

  //use effect copied from https://reactjs.org/docs/hooks-effect.html#tip-optimizing-performance-by-skipping-effects
  React.useEffect(() => {
    $.post( url ,  function( returnable ) {

      console.log("VolunteersObj = ",returnable)
      
      // To use an encapsulated function, put a dollar in front of it (it just works ?!)
      
      $(setState(state => ({ ...state, data : returnable})))

      console.log("State Data = ", state.data)
    
      // this.props.setLogged(true)
  });
  }, [props.loggedIn ]);

  
    
    
    return(

    <Collapsible trigger = "Volunteer Table 1"
    transitionTime={100} 
    triggerClassName = 'CustomTriggerCSS--open'
    triggerOpenedClassName = 'CustomTriggerCSS'>
        <MaterialTable
        title= {state.tableName}
        columns={state.columns}
        data={state.data}
        editable={{
          onRowAdd: (newData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                resolve();
                setState((prevState) => {
                  const data = [...prevState.data];
                  data.push(newData);
                  return { ...prevState, data };
                });
              }, 600);
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                resolve();
                if (oldData) {
                  setState((prevState) => {
                    const data = [...prevState.data];
                    data[data.indexOf(oldData)] = newData;
                    return { ...prevState, data };
                  });
                }
              }, 600);
            }),
          onRowDelete: (oldData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                resolve();
                setState((prevState) => {
                  const data = [...prevState.data];
                  data.splice(data.indexOf(oldData), 1);
                  return { ...prevState, data };
                });
              }, 600);
            }),
        }}
      />
      </Collapsible>
    )
    
}