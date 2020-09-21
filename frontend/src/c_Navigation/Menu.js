import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';

import Slide from '@material-ui/core/Slide';
import Drawer from './Drawer'

function HideOnScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({ target: window ? window() : undefined });

  return (
    <Slide appear={true} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}




HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default function MainAppBar(props) {
  return (
    <React.Fragment>
        <CssBaseline />
        <HideOnScroll {...props}>
            <AppBar position="fixed" color="secondary">
                <Toolbar variant="dense">
                    <Drawer loggedIn = {props.loggedIn} setLogged = {props.setLogged} setPage = {props.setPage}></Drawer>
                    <Typography variant="h6" color="inherit">
                        Bellyful
                    </Typography>
                </Toolbar>
            </AppBar>
        </HideOnScroll>
      </React.Fragment>
  );
}