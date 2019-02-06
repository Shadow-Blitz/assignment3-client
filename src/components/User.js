import React, { Component } from 'react';
import { Button, Fab, Paper, Grid, Divider, Typography } from '@material-ui/core/';
import AddIcon from '@material-ui/icons/Add';
import { api, setJwt } from '../api/init'
import { Link } from 'react-router-dom';
// import store from '../config/store'
// import { fetchUser } from '../services/UserService'
import Activity from './Activity'
import Program from './Program'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  container: {
    display: 'grid',
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
    margin: `${theme.spacing.unit * 2}px 0`,
  },
});

class User extends Component {
  state = {
    programs: [],
    activities: [],
    units: [],
    direction: 'row',
    justify: 'center',
    alignItems: 'center'
  }

  componentDidMount() {
    const token = localStorage.getItem('token')
    setJwt(token)
    api.get('/users').then((res) => {
      this.setState(res.data)
    }).catch((err) => {
      console.error('Could not fetch user', err)
    })
    api.get('/users/programs').then((res) => {
      console.log(res)
      this.setState({ programs: res.data })
    }).catch((err) => {
      console.error('Could not fetch programs', err)
    })
    api.get('/users/activities').then((res) => {
      this.setState({ activities: res.data })
    }).catch((err) => {
      console.error('Could not fetch programs', err)
    })
  }

  handleChange = key => (event, value) => {
    this.setState({
      [key]: value,
    });
  };


  render() {
    // const { classes } = this.props;
    const { alignItems, direction, justify } = this.state;

    return (
      <React.Fragment>

        {/* Header with logo, user name, action buttons to manage account and logout */}
        <Typography variant='h1' gutterBottom>
          Hi {this.state.name && this.state.name.firstname}!
        </Typography>
        <Link to={'/user/edit'}>
          <Button className="textButton" type="button" variant='contained' color="primary" style={{ 'backgroundColor': 'orange', margin: 15 }}>Manage Account</Button>
        </Link>
        <Button className="textButton" type="button" variant='contained' color="primary" style={{ 'backgroundColor': '#ff3535', margin: 15 }} onClick={this.props.handleSignOut}>Log Out</Button>

        {/* 'My Guide Hut' Section */}
        <h2>My Guide Hut</h2>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <Paper style={styles.paper}>
              {/* Render unit information here: address & map */}
            </Paper>
          </Grid>
        </Grid>

        <Divider style={styles.divider} />

        {/* 'My Programs' Section */}
        <h2>My Programs</h2>

        {/* Users can add a new program (button) */}
        <Link to='/create-program/'>
          <Fab size="medium" color="secondary" aria-label="Add" style={{ 'backgroundColor': 'orange', margin: 15 }}>
            <AddIcon />
          </Fab>
        </Link>

        {/* User can view all programs they've created as cards */}
        <Grid
          container
          spacing={16}
          direction={direction}
          justify={justify}
          alignItems={alignItems} >
          {this.state.programs.map((program) => (
            <Program key={program._id} program={program} />
          )
          )}
        </Grid>


        <Divider style={styles.divider} />

        {/* 'My Activities' Section */}
        <h2>My Activities</h2>

        {/* User can add a new activity (button) */}
        <Link to='/create-activity/'>
          <Fab size="medium" color="secondary" aria-label="Add" style={{ 'backgroundColor': 'orange', margin: 15 }}>
            <AddIcon />
          </Fab>
        </Link>

        {/* User can view all activities they've created as cards */}
        <Grid
          container
          spacing={16}
          direction={direction}
          justify={justify}
          alignItems={alignItems} >
          {this.state.activities.map((activity) => (
            <Activity key={activity._id} activity={activity} />
          )
          )}
        </Grid>

      </React.Fragment >
    )
  }
}

User.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(User);