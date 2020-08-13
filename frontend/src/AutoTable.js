import React from 'react'
import ReactDOM from 'react-dom'
import MaterialTable from 'material-table'
import $ from 'jquery'
import Collapsible from 'react-collapsible';
import './sass/main.scss'
import Popup from 'reactjs-popup'


import { forwardRef } from 'react';
import {AddBox, ArrowDownward, Check, ChevronLeft,ChevronRight,Clear,
  DeleteOutline,Edit,FilterList,FirstPage,LastPage,Remove,SaveAlt,Search,ViewColumn, Add, Height} from '@material-ui/icons'
import { Tooltip, Paper, Grid, Button } from '@material-ui/core';

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


// USING MATERIAL TABLE 
//https://material-table.com/#/


export default function AutoTable(props){
  // Auto tabble is passed a series of props: url and children
  //url is the url for the post eg localhost:3001/managers/getVolunteers
  //children is text - MAKE SURE IT IS NOT ANOTHER RENDERED COMPONENT
  const [state, setState] = React.useState({
    columns: [
      { },
      
    ],
    data: [
      {},
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
    
    $.post( props.url ,props.form,  function( returnable ) {
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
  }, [props.url,props.form ]);


  const [modalState,setModalState] = React.useState({
    open: false
  })

  const openModal = () => {
    setModalState(state => ({open: true}))
  }

  const closeModal = () => {
    setModalState(state => ({open: false}))
  }
  
    
    return(

    <>
    <Collapsible trigger = {props.children}
    transitionTime={100} 
    triggerClassName = 'CustomTriggerCSS--open'
    triggerOpenedClassName = 'CustomTriggerCSS'>
        <MaterialTable
        title= {null}
        columns={state.columns}
        data={state.data}
        icons={tableIcons}
        detailPanel = {rowData => {
          return(
            <Paper>
              Hello World
            </Paper>
          )
        }}
        actions = {[  //Add actions to rows and to toolbar
          {
            icon: () => <AddBox/>,
            tooltip: 'Add Volunteer',
            isFreeAction: true,   //This means it will be row independent and hover in the toolbar
            //When clicked, Open a drawer to display a form to add a volunteer
            onClick : openModal
          }
        ]}
      />
      </Collapsible>
      <Popup open={modalState.open} closeOnDocumentClick onClose = {closeModal} position='center center' modal>
        <Paper>Hello World</Paper>
      </Popup>
    </>
    )
}