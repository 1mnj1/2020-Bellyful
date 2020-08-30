import React from 'react';
import AutoTable from './AutoTable'
// import CreateDeliveryNavigation from './CreateDeliveryNavigation'
import VolunteerForm from './VolunteerForm';
import $ from 'jquery'

function Reporting() {
  
  const [vol,setVol] = React.useState([{}]);
  const updateVol = (data)=>{
    console.log("Data is ", data)
    //Data is in the format: 
    // ICE DATA
    // VOL DATA
    $.post( "http://"+window.location.hostname+":3000/delivery/submitICE",data[0] ,  function( ice_id ) {
      if(ice_id === null) return 
      if (ice_id === undefined) return 
      if(ice_id.length === 0) return 
      console.log("Returned: ", ice_id)
      data[1].push({name: "ice_id", value: ice_id})
      $.post( "http://"+window.location.hostname+":3000/delivery/submitVolunteer",data[1] ,  function( returnable ) {
        if(returnable === null) return 
        if (returnable === undefined) return 
        if(returnable.length === 0) return 
        console.log("Created Volunteer: ", returnable)
        
      // this.props.setLogged(true)
      });
      // this.props.setLogged(true)
    });
    setVol(data)

  }
  return (
        //reporting screen
      <div className="App-MainContents">
        <AutoTable title = "Volunteers" url = {"http://"+window.location.hostname+":3000/manager/getVolunteers" } showAdder = {true}>
          <VolunteerForm formData = {vol} setForm = {updateVol}/>
        </AutoTable>
        <AutoTable title = "Freezer Managers" url = {"http://"+window.location.hostname+":3000/manager/getFreezerManager"}>
          
        </AutoTable>
        <AutoTable title = "Deliveries" url = {"http://"+window.location.hostname+":3000/manager/getDeliveries"}>
          
        </AutoTable>
      </div>
      

  );
}

export default Reporting;
