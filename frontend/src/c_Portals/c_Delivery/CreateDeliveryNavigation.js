import React from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
// import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive'
import LocalShippingIcon from '@material-ui/icons/LocalShipping'
// import AcUnitIcon from '@material-ui/icons/AcUnit'
import PersonIcon from '@material-ui/icons/Person'
import RefferrerForm from '../../c_Forms/ReferrerForm'
import RecipientForm from '../../c_Forms/RecipientForm'
import DeliveryForm from '../../c_Forms/DeliveryForm'
import { makeStyles } from '@material-ui/core/styles';
import $ from 'jquery'
import FreezerLog from '../c_Freezer/FreezerLog';
const useStyles = makeStyles({
    root: {
      position: 'relative',
      
    },
    form: {
        height: '90vh'
    }
  });
 
function submitForms(ref,rec,del, callback, delivery_id){
  
    const parseDel = (ref,rec) => {
      
      var delivery = [...del]
      delivery.push({"name": "ref", "value":ref})
      delivery.push({"name": "rec", "value":rec})
      console.log("Del: ",delivery)
      if(typeof(delivery_id)== "undefined"){
        $.post("http://"+window.location.hostname+":3000/delivery/submitDelivery",delivery,(success)=>{
          console.log("Created a delivery")
        })
      } else {
        delivery.push({"name": "delivery_id", "value":delivery_id})
        $.post("http://"+window.location.hostname+":3000/delivery/updateDelivery",delivery,(success)=>{
          console.log("updated a delivery")
        })
      }
      callback()
    }

    if(ref[0].name !== "selfRef"){
      $.post("http://"+window.location.hostname+":3000/delivery/submitReferrer",ref,(referrer)=>{
        const addRef = (rec)=>parseDel(referrer,rec)
        $.post("http://"+window.location.hostname+":3000/delivery/submitRecipient",rec,(recipient)=>{
          addRef(recipient)
          
        })
      })
    } else {
      rec.push({name: "RefType", value: "7"})
      rec.push({name: "refOrg", value: "Self Referral"})
      rec.push({name: "refNotes", value: ""})

      $.post("http://"+window.location.hostname+":3000/delivery/submitReferrer",rec,(referrer)=>{
        const addRef = (rec)=>parseDel(referrer,rec)
        $.post("http://"+window.location.hostname+":3000/delivery/submitRecipient",rec,(recipient)=>{
          addRef(recipient)
          
        })
      })
    
  }
 

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
    



    const [state,setState] = React.useState({
      ref : [{}],
      rec: [{}],
      delivery: [{}]
    })
    
    
    const setRef = (data)=>{
      setState({...state, ref: data })
    }
    const setRec = (data)=>{
      setState({...state, rec: data })
    }
    const setDelivery = (data)=>{
      setState({...state, delivery: data })
    }

    


    const [currPage, setPage] = React.useState(1)

    const submit = ()=>{submitForms(state.ref,state.rec, state.delivery, props.closeSelf, props.delivery_id)}//  props.closeSelf()}
    //when delivery ID is set, set the form data to what is given by the server
    
      React.useEffect(() => {
        if(typeof(props.delivery_id)!="undefined"){
            $(setPage(3))   
            const url = "http://"+window.location.hostname+":3000/delivery/getCompleteDelivery"
            $.post( url ,[{name: "delivery_id", value: props.delivery_id}],  function( returnable ) {
              if(returnable === null) return 
              if (returnable === undefined) return 
              if(returnable.length === 0) return 
              console.log("returnable: ", returnable)
              $(setState({...state, ref: returnable.ref, rec:  returnable.rec, delivery: returnable.del}))
              $(setPage(3))
          });
        }

      }, [props.delivery_id ]);


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
        {currPage===1 ? <RefferrerForm setForm = {setRef} formData = {state.ref} currentPage = {currPage} class = {formstyle}/> : 
        currPage === 2 ? <RecipientForm setForm = {setRec} formData = {state.rec} currentPage = {currPage} class = {formstyle}/> : 
        <DeliveryForm submit = {submit}  setForm = {setDelivery} formData = {state.delivery}  class = {formstyle}> 
          {(typeof(props.delivery_id)!="undefined") ? <FreezerLog
                      title = "Freezer Log" 
                      url = {"http://"+window.location.hostname+":3000/volunteer/getFreezerLog"}
                      delivery_id = {props.delivery_id}
                      reload = {true}
                      setReload = {()=>{return null}}
                     
                    /> :null}
                      
        </DeliveryForm>}
    
        {DelivererNavigation}
        </div>
        

    );
}

export default CreateDeliveryNavigation;
