import React from 'react';
import AutoTable from './AutoTable'



function Reporting() {
  


  return (
        //reporting screen
      <div className="App-MainContents">
        <AutoTable url = {"http://"+window.location.hostname+":3000/manager/getVolunteers"}>
          Volunteers
        </AutoTable>
        <AutoTable url = {"http://"+window.location.hostname+":3000/manager/getFreezerManager"}>
          Freezer Managers
        </AutoTable>
        <AutoTable url = {"http://"+window.location.hostname+":3000/manager/getDeliveries"}>
          Deliveries
        </AutoTable>
      </div>
      

  );
}

export default Reporting;
