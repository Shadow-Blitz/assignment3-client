/* 
    This ProgramList component is a grid list of all program items shown as ProgramCards.
*/

import React from 'react'
import Program from './Program'
import { Grid } from '@material-ui/core/';

// Should be renamed to ProgramList for clarity
function Programs(props) {
    const programs = props.programs
    
    return (
        <div>
            <h1>Programs List</h1>
            {/* For each program in the programs array, pass key info to ProgramCard and display all programs as list items*/}
            <Grid 
            container 
            spacing={16}
            direction="row"
            justify="center"
            alignItems="center">
            {/* Display a program item as a ProgramCard instance */}
                {programs.map(program => (
                    <Program key={program._id} program={program}></Program>
                )
            )}
            </Grid>
        </div>
    )
}

export default Programs