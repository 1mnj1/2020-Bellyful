import React from 'react';
import Drawer from '@material-ui/core/Drawer';


export default function TemporaryDrawer(props) {

    const formStyle = {
        "width": "50vw",
        "padding-left": "1vw"
        
      };
      
  
  

  return (
    <div>
      {
        <React.Fragment key={props.anchor}>
          <Drawer anchor={props.anchor} open={props.open} onClose = {props.onClose} >
              <div style = {formStyle}>
                 {props.children}
              </div>
          </Drawer>
        </React.Fragment>
      }
    </div>
  );
}


