import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

// The `withStyles()` higher-order component is injecting a `classes`
// prop that is used by the `Button` component.

const mobileCheck = function() {    
  return window.screen.width < 620
};




export default function ClassesShorthand(props) {
  const StyledButton = withStyles({
    root: {
      // background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
      border: 0,
      color: 'white',
      height: 48,
      padding: '0 30px',
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      width: mobileCheck()?"30%":"36%", 
      float : 'left', 
      marginLeft : '10%',
      borderRadius: 10, 
      fontWeight : 'bold', 
      backgroundColor: props.customColor
  
    },
    label: {
      textTransform: 'none',
    },
  })(Button);


  return <StyledButton>Classes Shorthand</StyledButton>;
}