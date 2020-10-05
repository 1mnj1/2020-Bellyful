import React from 'react'
import { makeStyles } from "@material-ui/core/styles"
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Person, Height } from '@material-ui/icons';
import { Avatar, Typography } from '@material-ui/core';
import { deepOrange, deepPurple } from '@material-ui/core/colors';
import $ from 'jquery'

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

    const [state,setState] = React.useState({
        columns : [ {}, ],
        data : [{},]
    });

    React.useEffect(() => {
        $.post("http://"+window.location.hostname+":3000/volunteer/getProfileDetails", [{"name":"user_id", "value": props.user_id}], function(returnable) {
            if(returnable === null) return 
            if (returnable === undefined) return 
            if(returnable.length === 0) return 
            var fields = Object.keys(returnable[0])
            $(setState(state => ({ ...state,columns:fields, data : returnable})))
        })

    }, [props.user_id]);
    
    const classes = useStyles();

    console.log(state)

    return(
        <div className = {classes.container}>
            
            <Paper backgroundColor = 'blue'>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                            <Avatar className = {classes.icon}></Avatar>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant = 'h4'>{state.data[0].name}</Typography>
                    </Grid>
                    <Grid item xs = {12} style = {{textAlign : 'left', padding : '5%'}}>
                        <Typography variant = 'h5'>Details</Typography>
                        <Typography variant = 'body1'>Phone Number : {state.data[0].phone}</Typography>
                        <Typography variant = 'body1'>Email Address : {state.data[0].email}</Typography>
                        <Typography variant = 'body1'>Address : {state.data[0].address}</Typography>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    )
}

export default ProfilePage;