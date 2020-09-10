import React from 'react';
import AutoTable from './AutoTable'
import Fab from '@material-ui/core/Fab';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import CreateDeliveryNavigation from './CreateDeliveryNavigation';
import NormalDrawer from './NormalDrawer'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    zIndex: '100',
  }
}));




function DeliveryReporting() {


  const [modalState,setModalState] = React.useState({
    open: false,
    RCOpen: false,
    delivery_id : -1
  })

  const openModal = () => {
    console.log("Clicked Open Modal")
    setModalState(modalState => ({open: true}))
  }

  const closeModal = () => {
    setModalState(modalState => ({open: false}))
  }

  const openToContact = (id) => {
    console.log("Clicked Open RC Modal")
    setModalState(modalState => ({...modalState,delivery_id: id, RCOpen: true}))
  }

  const closeToContact = () => {
    setModalState(modalState => ({...modalState, delivery_id:-1,   RCOpen: false}))
  }


  const classes = useStyles();

  return (
      //reporting screen
      <>
        <div className={classes.root}>
          <Fab color="primary" aria-label="add" variant = 'extended' className={classes.fab} 
            onClick = {() => openModal()}>
            <AddIcon className = {classes.extendedIcon} /> Add Delivery
          </Fab>
          {modalState.open ? (
          <NormalDrawer anchor = 'right' closeOnDocumentClick onClose = {closeModal} open = {modalState.open}  >
            <CreateDeliveryNavigation closeSelf = {closeModal}/>
          </NormalDrawer>
          ) :null 
        }
        </div>
        <div className="App-MainContents">
          <AutoTable title = "To Contact" url = {"http://"+window.location.hostname+":3000/manager/getDeliveryDetails"} 
            form = {{"type": ["RC To Contact"]}} 
            openDrawer = {openToContact}>

              {modalState.RCOpen ? (
                <NormalDrawer anchor = 'right' closeOnDocumentClick onClose = {closeToContact} open = {modalState.RCOpen}  >
                  <CreateDeliveryNavigation closeSelf = {closeToContact}  delivery_id = {state.delivery_id} />
                </NormalDrawer> ) 
              :<div/>}
          </AutoTable>
          <AutoTable title = "Outstanding" url = {"http://"+window.location.hostname+":3000/manager/getDeliveryDetails"} form = {{"type": ["assigned","unassigned","in transit","To Contact",]}}>
            
          </AutoTable>
          <AutoTable title = "Completed Deliveries" url = {"http://"+window.location.hostname+":3000/manager/getDeliveryDetails"} form = {{"type": ["done",]}}>
            
          </AutoTable>
          <AutoTable title = "Rejections" url = {"http://"+window.location.hostname+":3000/manager/getDeliveryDetails"} form = {{"type": ["rejected by branch","rejected by recipient"]}}>
            
          </AutoTable>
        </div>
        
      </>

  );
}

export default DeliveryReporting;
