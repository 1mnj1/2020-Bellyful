import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AssessmentIcon from '@material-ui/icons/Assessment';
const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

export default function SwipeableTemporaryDrawer(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const [display, setDisplay] = React.useState(true)
  const toggleDrawer = (anchor, open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDisplay(!display)
    setState({ ...state, [anchor]: display });
  };
  //Function to create a list
  
  const listItem =  (text,icon,page) => (
 
      (
        
          <ListItem button key={text} onClick = {()=>props.setPage(page)}>
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        )
      
  );

  return (
    <div className={classes.root}>
 
            {['left'].map((anchor) => (
            
            <React.Fragment key={anchor}>
              <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={toggleDrawer(anchor, true)}>
                <MenuIcon />
              </IconButton>
              <SwipeableDrawer
                anchor={anchor}
                open={state[anchor]}
                onClose={toggleDrawer(anchor, false)}
                onOpen={toggleDrawer(anchor, true)}
              > 
                <div
                  className={clsx(classes.list, {
                    [classes.fullList]: anchor === 'top' || anchor === 'bottom',
                  })}
                  role="presentation"
                  onClick={toggleDrawer(anchor, false)}
                  onKeyDown={toggleDrawer(anchor, false)}
                > <List>
                    {(props.loggedIn>2) ? listItem("Reporting", <AssessmentIcon/>,1) : null       }

                  </List>
                  <Divider />
                  <List >
                    
                      <ListItem button key={"draw_login_li"} onClick = {()=>{ props.setLogged(0);}}>
                        <ListItemIcon><MailIcon /></ListItemIcon>
                        <ListItemText primary={props.loggedIn>0 ? "Logout" : "Login"} />
                      </ListItem>
                  </List>
                </div>
              </SwipeableDrawer>
            </React.Fragment>
          ))}
      
    </div>
  );
}