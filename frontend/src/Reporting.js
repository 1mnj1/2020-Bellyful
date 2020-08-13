import React from 'react';
import AutoTable from './AutoTable'
import ReferrerForm from './Referrer'


function Reporting() {
  


  return (
        //reporting screen
      <div className="App-MainContents">
        <AutoTable title = "Volunteers" url = {"http://"+window.location.hostname+":3000/manager/getVolunteers" } showAdder = {true}>
          <ReferrerForm/>
        </AutoTable>
        <AutoTable title = "Freezer Managers" url = {"http://"+window.location.hostname+":3000/manager/getFreezerManager"}>
          
        </AutoTable>
        <AutoTable title = "Deliveries" url = {"http://"+window.location.hostname+":3000/manager/getDeliveries"}>
          
        </AutoTable>
      </div>
      

  );
}

export default Reporting;
