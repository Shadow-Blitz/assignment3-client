/* 
    This ActivityList component is a grid list of all activity items shown as ActivityCards.
*/

import React from 'react'
import Activity from './Activity.js'
import PropTypes from 'prop-types'
import { Grid } from '@material-ui/core/';

// Should be renamed to ActivityList for clarity
function Activities(props) {
    const activities = props.activities

    return (
        <React.Fragment>
            <h1>Activities List</h1>
            {/* For each activity in the activities array, pass key info to the ActivityCard and display all cards as list items */}
            <Grid 
            container 
            spacing={16}
            direction="row"
            justify="center"
            alignItems="center">
            {/* Display an activity item as an ActivityCard instance */}
                {activities.map(activity => (
                        <Activity key={activity._id} activity={activity}></Activity>
                )
            )}
            </Grid>

        </React.Fragment>
    )
}

Activities.propTypes = {
    activities: PropTypes.array
}

export default Activities