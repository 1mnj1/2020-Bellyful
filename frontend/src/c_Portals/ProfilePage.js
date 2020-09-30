import React from 'react'
import { makeStyles } from "@material-ui/core/styles"
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Person, Height } from '@material-ui/icons';
import { Avatar } from '@material-ui/core';
import { deepOrange, deepPurple } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
    container: {
        paddingTop : '8%',
        paddingLeft : '2%',
        paddingRight : '2%',
    },
    paper: {
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        
    },
    icon : {
        color : theme.palette.getContrastText(deepPurple[500]),
        backgroundColor : deepPurple[500],
        width : theme.spacing(12),
        height : theme.spacing(12),
        margin : 'auto',
    }
}));

function ProfilePage(props) {
    
    const classes = useStyles();
    return(
        <div className = {classes.container}>
            
            <Paper backgroundColor = 'blue'>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                            <Avatar className = {classes.icon}>TS</Avatar>
                    </Grid>
                    <Grid item xs={12}>
                            <h2>First Name</h2>
                            <h2>Last Name</h2>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    )
}

export default ProfilePage;