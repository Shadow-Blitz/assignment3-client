/* 
    This Bottom Navigation component allow users to quickly access important destinations in the app.
    It should hide on scroll, or at least not be covered by other content.
*/

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import PersonIcon from '@material-ui/icons/Person';
import HomeIcon from '@material-ui/icons/Home';
import CreateIcon from '@material-ui/icons/Create';
import ListIcon from '@material-ui/icons/List';
import InfoIcon from '@material-ui/icons/Info';
import { Link } from 'react-router-dom';
// import { blue } from '@material-ui/core/colors';
// import Grid from '@material-ui/core/Grid';

const styles = {
  // Stick to bottom of viewport
  root: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
    //   background: '#0033A1',
  }
};

class LabelBottomNavigation extends React.Component {
  state = {
    value: 'person',
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      this.props.tokenDetails ? (
        <BottomNavigation value={value} onChange={this.handleChange} className={classes.root}>
          <BottomNavigationAction
            component={Link}
            to="/user"
            label="Profile"
            value="profile"
            icon={<PersonIcon />} />
          <BottomNavigationAction
            component={Link}
            to="/unit"
            label="Unit"
            value="unit"
            icon={<HomeIcon />} />
          <BottomNavigationAction
            component={Link}
            to="/create-program"
            label="Create"
            value="create"
            icon={<CreateIcon />} />
          <BottomNavigationAction
            component={Link}
            to="/activities"
            label="Library"
            value="library"
            icon={<ListIcon />} />
          <BottomNavigationAction
            component={Link}
            to="/about"
            label="Info"
            value="info"
            icon={<InfoIcon />} />
        </BottomNavigation>) : null
    );
  }
}

LabelBottomNavigation.propTypes = {
  classes: PropTypes.object.isRequired,
};



export default withStyles(styles)(LabelBottomNavigation);