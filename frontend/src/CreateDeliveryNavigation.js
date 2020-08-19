import React from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
// import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive'
import LocalShippingIcon from '@material-ui/icons/LocalShipping'
// import AcUnitIcon from '@material-ui/icons/AcUnit'
import PersonIcon from '@material-ui/icons/Person'
import RefferrerForm from './ReferrerForm'
import RecipientForm from './RecipientForm'
import DeliveryForm from './DeliveryForm'
import { makeStyles } from '@material-ui/core/styles';
import $ from 'jquery'
const useStyles = makeStyles({
    root: {
      position: 'relative',
      
    },
    form: {
        height: '90vh'
    }
  });
 
function submitForms(ref,rec){

  if(ref[0].name !== "selfRef"){
    $.post("http://"+window.location.hostname+":3000/delivery/submitReferrer",ref,(success)=>{
      console.log(success)
    })
  }
 $.post("http://"+window.location.hostname+":3000/delivery/submitRecipient",rec,(success)=>{
   console.log(success)
 })
}
function CreateDeliveryNavigation(props) {

  const formstyle = {
    "overflow-x": "hidden",
    "height": "95vh",
    "overflow-y": "scroll",
  }
    //Used for the Navigation Drawer
    const classes = useStyles();
    const [value, setValue] = React.useState('Referrer');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    }
    const [ref,setRef] = React.useState([{}]);
    const [rec,setRec] = React.useState([{}]);
    const [delivery, setDelivery] = React.useState([{}]);
    const [currPage, setPage] = React.useState(1)

    const submit = ()=>{submitForms(ref,rec);}//  props.closeSelf()}
    
    //For more information follow    https://material-ui.com/components/bottom-navigation/#bottom-navigation

    const DelivererNavigation = (
        <BottomNavigation value={value} onChange={handleChange} className = {classes.root}>
            <BottomNavigationAction lable="Referrer" value={1} icon={<PersonIcon/>} onClick = {()=>setPage(1)} />
            <BottomNavigationAction lable="Recipient" value={2} icon={<PersonIcon/>} onClick = {()=>setPage(2)} />
            <BottomNavigationAction lable="Delivery" value={3} icon={<LocalShippingIcon/>} onClick = {()=>setPage(3)} />
        </BottomNavigation>
    )





    return (
        <div>
        {currPage===1 ? <RefferrerForm setForm = {setRef} formData = {ref} currentPage = {currPage} class = {formstyle}/> : 
        currPage === 2 ? <RecipientForm setForm = {setRec} formData = {rec} currentPage = {currPage} class = {formstyle}/> : 
        <DeliveryForm submit = {submit} class = {formstyle} formData = {delivery} setForm = {setDelivery}/>}
    
        {DelivererNavigation}
        </div>
        

    );
}

export default CreateDeliveryNavigation;
