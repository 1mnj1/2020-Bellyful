import React from 'react'
import {makeStyles} from '@material-ui/core/styles'

useStyles = makeStyles((theme)=> ({
    padding : {
        padding : '2vh',
    },
    rows : {
        padding : '10px',
        backgroundColor : 'SlateGrey',

    }
}));


function ListFreezerStock(props){

    const createList = state.data.map((row, index)=> {
        //TO ADD        Mapping functionality

        //Component
        return (
            <div>
                <Grid className = {classes.padding} style = {{backgroundColor : 'white'}} direction = 'row' container spacing = {3}>
                    <Grid item xs={2}>
                        <Typography className = {classes.rows} variant = "h6">{row[state.name]}</Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Typography className = {classes.rows} variant = "h6">{row[state.lasagna]}</Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Typography className = {classes.rows} variant = "h6">{row[]}</Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Typography className = {classes.rows} variant = "h6">{row[]}</Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Typography className = {classes.rows} variant = "h6">{row[]}</Typography>
                    </Grid>
                </Grid>
            </div>
        )
    })

    return(
        <div>

        </div>
    )
}

export default ListFreezerStock;