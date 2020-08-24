import React from 'react'
import PickMeals from './PickMeals'
import MyOutstanding from './MyOutstanding'
import { PinDropSharp } from '@material-ui/icons'

const components = {
    windowa: MyOutstanding,
    windowb: PickMeals
}

function DynamicComponent(props) {
    const SelectWindow = components[props.window];
    return <SelectWindow/>;
}

export default DynamicComponent;