import React from 'react';
import AutoTable from './AutoTable'
// import CreateDeliveryNavigation from './CreateDeliveryNavigation'
import VolunteerForm from './VolunteerForm';
import FreezerForm from './FreezerForm'

function Reporting() {
  
  const [vol,setVol] = React.useState([{}]);

  return (
        //reporting screen
      <div className="App-MainContents">
        <AutoTable title = "Volunteers" url = {"http://"+window.location.hostname+":3000/manager/getVolunteers" } showAdder = {true}>
          <VolunteerForm formData = {vol} setForm = {setVol}/>
        </AutoTable>
        <AutoTable title = "Freezer Managers" url = {"http://"+window.location.hostname+":3000/manager/getFreezerManager"} showAdder = {true}>
          <FreezerForm />
        </AutoTable>
        <AutoTable title = "Deliveries" url = {"http://"+window.location.hostname+":3000/manager/getDeliveries"}>
          
        </AutoTable>
      </div>
      

  );
}

export default Reporting;
