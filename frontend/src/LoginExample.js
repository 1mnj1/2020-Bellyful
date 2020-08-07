//from https://gist.github.com/EduardoSaverin/04d7d9529dfaf8cc9a404bb458bb8dbb
import React from 'react';
import { Paper, withStyles, Grid, TextField, Button, FormControlLabel, Checkbox } from '@material-ui/core';
import { Face, Fingerprint } from '@material-ui/icons'
import $ from 'jquery'
import blogo from "./bellyful_logo.jpg"

const styles = theme => ({
    margin: {
        margin: theme.spacing.unit * 2,
    },
    padding: {
        padding: theme.spacing.unit
    }
});

class LoginTab extends React.Component {

    
    render() {
        
        const { classes } = this.props;
        // State inherited from parent, this is a setter function
        const setLogged = this.props.setLogged

        $(document).ready(function() {
            
            $("form").submit(function(e){
                e.stopImmediatePropagation();
                e.preventDefault();
                
                var data = $("form").serializeArray();
                // console.log(data)
                var url = "http://"+window.location.hostname+":3000/login";
                console.log(url)
                $.post( url ,data,  function( returnable ) {
                    console.log("User level = ",returnable)
                    if(returnable>0){
                        // To use an encapsulated function, put a dollar in front of it (it just works ?!)
                        $(setLogged(returnable))
                    }
                    // this.props.setLogged(true)
                });
            });
        });




        if(this.props.loggedIn === false){
            return (
                <form className={classes.form} noValidate >
                    <Paper className={classes.padding}>
                        <div className={classes.margin}>
                            <Grid>
                                <Grid item>
                                    <img src={blogo}></img>
                                </Grid>
                            </Grid>
                            <Grid container spacing={8} alignItems="flex-end">
                                <Grid item>
                                    <Face />
                                </Grid>
                                <Grid item md={true} sm={true} xs={true}>
                                    <TextField name = "username" id="username" label="Username" type="email" fullWidth autoFocus required />
                                </Grid>
                            </Grid>
                            <Grid container spacing={8} alignItems="flex-end">
                                <Grid item>
                                    <Fingerprint />
                                </Grid>
                                <Grid item md={true} sm={true} xs={true}>
                                    <TextField name = "password" id="username" label="Password" type="password" fullWidth required />
                                </Grid>
                            </Grid>
                            <Grid container alignItems="center" justify="space-between">
                                <Grid item>
                                    <FormControlLabel control={
                                        <Checkbox 
                                            color="primary"
                                        />
                                    } label="Remember me" />
                                </Grid>
                                <Grid item>
                                    <Button disableFocusRipple disableRipple style={{ textTransform: "none" }} variant="text" color="primary">Forgot password ?</Button>
                                </Grid>
                            </Grid>
                            <Grid container justify="center" style={{ marginTop: '10px' }}>
                                <Button  variant="outlined" color="primary" style={{ textTransform: "none" }} type="submit">Login</Button>
                            </Grid>
                        </div>
                    </Paper>
                </form>
            );
        } else {
            return null
        }
    }
}

export default withStyles(styles)(LoginTab);