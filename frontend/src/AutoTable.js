import React from 'react'
import MaterialTable from 'material-table'
import $ from 'jquery'
import Collapsible from 'react-collapsible';
import './sass/main.scss'
import { forwardRef } from 'react';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};


export default function AutoTable(props){
  // Auto tabble is passed a series of props: url and children
  //url is the url for the post eg localhost:3001/managers/getVolunteers
  //children is text - MAKE SURE IT IS NOT ANOTHER RENDERED COMPONENT
  const [state, setState] = React.useState({
    columns: [
      { title: 'Name', field: 'Name' },
      { title: 'Email', field: 'Email' },
      { title: 'Phone', field: 'Phone',},
      
    ],
    data: [
      { name: 'Chris Macdonald', email: 'chrisjmacdonald@gmail.com', phone: "0226897257" },
    ],
  });
  const setColumns = (colNames)=>{
    var columns = []; 
    colNames.forEach(element => columns.push({title: element, field: element}));
    return columns
  }
  
  console.log(props.url)

  //use effect copied from https://reactjs.org/docs/hooks-effect.html#tip-optimizing-performance-by-skipping-effects
  React.useEffect(() => {
    $.post( props.url ,  function( returnable ) {
      if(returnable === null) return 
      if (returnable === undefined) return 
      if(returnable.length === 0) return 
      var fields = Object.keys(returnable[0])
      const cols = $(setColumns(fields))
      // console.log("VolunteersCols = ",cols)

      

      // console.log("VolunteersObj = ",returnable)
      
      // To use an encapsulated function, put a dollar in front of it (it just works ?!)
      
      $(setState(state => ({ ...state,columns:cols.toArray(), data : returnable})))

      
    
      // this.props.setLogged(true)
  });
  }, [props.loggedIn,props.url ]);

  
    
  console.log("State Data = ", state.data)
  console.log("State Data = ", state.columns)
    return(

    <Collapsible trigger = {props.children}
    transitionTime={100} 
    triggerClassName = 'CustomTriggerCSS--open'
    triggerOpenedClassName = 'CustomTriggerCSS'>
        <MaterialTable
        title= {null}
        columns={state.columns}
        data={state.data}
        icons={tableIcons}
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