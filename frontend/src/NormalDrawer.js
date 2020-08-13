import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import { PinDropSharp } from '@material-ui/icons';


export default function TemporaryDrawer(props) {

    const formStyle = {
        "width": "250",
        
      };
      
  
  

  return (
    <div>
      {
        <React.Fragment key={props.anchor}>
          <Drawer anchor={props.anchor} open={props.open} onClose = {props.onClose} >
              <div style = {{width: "50vw"}}>
                 {props.children}
              </div>
          </Drawer>
        </React.Fragment>
      }
    </div>
  );
}


