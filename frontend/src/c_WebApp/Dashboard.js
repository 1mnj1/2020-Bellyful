import React from 'react'
import {Grid, Typography, Paper} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import $ from 'jquery'

const useStyles = makeStyles((theme) => ({
    padding : {
        padding : '2vh',
    },
    rows : {
        padding : '1vh',
    }
}));    


function Dashboard(props){
    
    const classes = useStyles();
    const [total,setTotal] = React.useState();

    React.useEffect(() => {
        
        $.post("http://"+window.location.hostname+":3000/freezerManagers/getTotalMeals", function(returnable){
            if(returnable === null) return 
            if (returnable === undefined) return 
            if(returnable.length === 0) return
            $(setTotal(returnable))
            return
            console.log(total)
        });

    });

    return(
        <div>
            <Typography className = {classes.padding} variant = "h4" align = 'left'>Dashboard</Typography>
            
            <Typography className = {classes.padding} variant = "h5" align = 'left'>Stock Levels</Typography>
            
            <Grid className = {classes.padding} style = {{backgroundColor : 'white'}} direction = 'row' container spacing = {3}>
                <Grid item>
                    <Typography className = {classes.padding} align = 'left'></Typography>
                    <Typography className = {classes.rows} align = 'left' variant = "h6">Lasagna</Typography>
                    <Typography className = {classes.rows} align = 'left' variant = "h6">Spaghetti Bolognese</Typography>
                    <Typography className = {classes.rows} align = 'left' variant = "h6">Mac & Cheese</Typography>
                    <Typography className = {classes.rows} align = 'left' variant = "h6">Vege Soup</Typography>
                </Grid>
                <Grid item>
                    <Typography align = 'left'>Total</Typography>
                </Grid>
            </Grid>
        </div>
    )
}

export default Dashboard;