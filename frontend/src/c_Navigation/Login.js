//from https://gist.github.com/EduardoSaverin/04d7d9529dfaf8cc9a404bb458bb8dbb
import React from 'react';
import { withStyles, Grid, TextField, Button, FormControlLabel, Checkbox, Typography } from '@material-ui/core';
import $ from 'jquery'
import blogo from "../Images/login-screen-logo.png"
import Container from '@material-ui/core/Container';


const styles = theme => ({
    margin: {
        margin: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    padding: {
        padding: theme.spacing.unit
    },
    logoPadding : {
        padding: theme.spacing.unit * 5,
        margin: 'auto'
    },
    paper : {
        width : '100%',
        padding: theme.spacing.unit,
        
    },
    button: {
        width : '100%',
        textTransform: 'none',
        marginTop: theme.spacing.unit*3,
        color: "white",
        fontSize: "large",
        padding: theme.spacing.unit*2
    },
    header: {
        paddingBottom: theme.spacing.unit*6,
    }
});

class LoginTab extends React.Component {

    
    render() {
        
        const { classes } = this.props;
        // State inherited from parent, this is a setter function
        const setLogged = this.props.setLogged
        $(document).ready(function() {
            
            $("form.LoginForm").submit(function(e){
                e.stopImmediatePropagation();
                e.preventDefault();
                
                var data = $("form").serializeArray();
                // console.log(data)
                var url = "http://"+window.location.hostname+":3000/login";
                console.log(url)
                $.post( url ,data,  function( returnable ) {
                    console.log("User level = ",returnable[0])
                    console.log("Returnable: ",returnable)
                    if(returnable[0]>0){
                        // To use an encapsulated function, put a dollar in front of it (it just works ?!)
                        $(setLogged(returnable))
                    }
                });
            });
        });




        
        return (
            <header className="App-header">
            <Container component="main" maxWidth = "xs">
                <form className="LoginForm" noValidate >
                    <div className={classes.margin}>

                        <img className={classes.logoPadding} src={blogo} alt = "Bellyful Logo"></img>
                        <Typography className={classes.header} variant="h4" color="#a300cc">Delivery App</Typography>

                        <TextField style= {{backgroundColor:"white"}} 
                        variant = "outlined" 
                        name = "username" 
                        id="username" 
                        label="Email Address" 
                        type="email" 
                        margin="normal"
                        color = "gray"
                        fullWidth autoFocus  />
                        
                        <TextField style= {{backgroundColor:"white"}} 
                        variant = "outlined" 
                        name = "password" 
                        id="username" 
                        label="Password" 
                        type="password"
                        margin = "normal"
                        color = "gray"
                        fullWidth  />
                        
                        <Grid container>
                            <Grid item xs>
                                <FormControlLabel
                                    control={ <Checkbox color="secondary"/>  } 
                                    label="Remember me" 
                                />
                            </Grid>
                            <Grid item xs>
                                <Button disableFocusRipple disableRipple style={{ textTransform: "none"}} variant="text" color="warning">Forgot password ?</Button>
                            </Grid>
                        </Grid>

                        <Button className={classes.button} variant="contained" color="secondary" type="submit">Login</Button>

                    </div>
                
                </form>
            </Container>
            </header>
        );
        
    }
}

export default withStyles(styles)(LoginTab);