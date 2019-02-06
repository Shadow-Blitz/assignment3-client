import React, { Component } from 'react';
import { Button, Fab, Paper, Grid, Divider, Typography } from '@material-ui/core/';
import AddIcon from '@material-ui/icons/Add/';
import { api, setJwt } from '../api/init'
import { Link } from 'react-router-dom';
import Program from './Program'
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  container: {
    display:'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gridGap: `${theme.spacing.unit * 3}px`,
  },
  paper: {
    padding: theme.spacing.unit,
    textAlgin: 'centre',
    color: theme.palette.text.secondary,
    whiteSpace: 'nowrap',
    marginBottom: theme.spacing.unit,
    // 'max-width': '90%',
    // 'min-width': '400px',
    // 'margin': '10% auto 0 auto',
    // 'textAlign': 'center',
    // 'padding': '5%'
  },
  divider: {
    margin: `${theme.spacing.unit *2}px 0`,
  },
});

class Unit extends Component {
  state = {
    users: [],
    programs: [],
    units: [], 
    direction: 'row', 
    justify: 'center', 
    alignItems: 'center' 
  }

  componentDidMount() {
    const token = localStorage.getItem('token')
    setJwt(token)
    api.get('/units/myUnit').then((res) => {

      this.setState({ ...res.data })

    }).catch((err) => {
      console.error('Could not fetch user', err)
    })
  }
  

  render() {
    console.log(this.state.users[0])
    console.log(this.state.programs, 'programs')
    const { alignItems, direction, justify } = this.state;

    return (
      <React.Fragment>

        {/* Header with logo, unit name etc. */}
        <h1>{this.state.unit && this.state.unit.name}</h1>
        
        {/* 'Guide Hut' Section */}
        <h2>Guide Hut</h2>
        {/* Render guide hut info here, e.g. a map showing where it is located. */}

        <Divider style={styles.divider} />

        {/* Display a list of leaders associated with the unit */}
        <h2>Unit Leaders</h2>
        <Grid 
            container 
            spacing={16}
            direction={direction} 
            justify={justify }
            alignItems={alignItems} >
            {/* <Paper style={styles.paper}> */}
              {this.state.users.map((user) => <p key={user._id}>{user.name.firstname} {user.name.lastname}</p>)}
            {/* </Paper> */}
          </Grid>

        <Divider style={styles.divider} />

        {/* Display a list of programs created by the unit leaders */}
        <h2>Unit Programs</h2>
        <Grid 
            container 
            spacing={16}
            direction={direction} 
            justify={justify }
            alignItems={alignItems} >
            {this.state.programs.map((program) => (
                  <Program key={program._id} program={program} />
                )
              )}
        </Grid>

          <Link to='/create-program'>
            <Fab size="medium" color="secondary" aria-label="Add" style={{ 'backgroundColor': 'orange', margin: 15 }}>
              <AddIcon />
            </Fab>
          </Link>
        
        <Divider style={styles.divider} />

        {/* Display a list of members belonging to the unit */}
          <h2>Unit Members</h2>
          <Fab className="plusButton" size="medium" color="secondary" aria-label="Add" style={{ 'backgroundColor': 'orange', margin: 15 }}>
            <AddIcon />
          </Fab>
          
      </React.Fragment>
    )
  }
}
export default Unit;