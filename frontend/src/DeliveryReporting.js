import React from 'react';
import AutoTable from './AutoTable'



function DeliveryReporting() {
  


  return (
        //reporting screen
      <div className="App-MainContents">
        <AutoTable title = "To Contact" url = {"http://"+window.location.hostname+":3000/manager/getDeliveryDetails"} form = {{"type": ["To Contact",]}}>
          
        </AutoTable>
        <AutoTable title = "Outstanding" url = {"http://"+window.location.hostname+":3000/manager/getDeliveryDetails"} form = {{"type": ["assigned","unassigned","in transit",]}}>
          
        </AutoTable>
        <AutoTable title = "Completed Deliveries" url = {"http://"+window.location.hostname+":3000/manager/getDeliveryDetails"} form = {{"type": ["done",]}}>
          
        </AutoTable>
        <AutoTable title = "Rejections" url = {"http://"+window.location.hostname+":3000/manager/getDeliveryDetails"} form = {{"type": ["rejected by branch","rejected by recipient"]}}>
          
        </AutoTable>
      </div>
      

  );
}

export default DeliveryReporting;
