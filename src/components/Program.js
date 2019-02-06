/* 
  This ProgramCard component shows all of the relevant info and associated ActivityCards for a given Program.
*/

import React from 'react'
import { Link } from 'react-router-dom'
// import { Button } from '@material-ui/core/'
// import store from '../config/store'
// import { fetchProgram } from '../services/ProgramService'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
// import CardMedia from '@material-ui/core/CardMedia';
// import { removeActivity } from '../services/ActivityService'
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import orange from '@material-ui/core/colors/orange';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Activity from './Activity'

const styles = theme => ({
  card: {
    width: 400,
    margin: 15,
    // marginBottom: 20,

  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: orange[500],
  },
});

// Should be renamed to ProgramCard for clarity
class Program extends React.Component {
  state = { expanded: false };

  // componentDidMount() {
  //   fetchProgram(this.props.match.params.id)
  // }

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  render() { // strangely render here gets executed multiple times
    const program = this.props.program // store.getState().program
    const { classes } = this.props;

    return (
      <Card className={classes.card}>
        <CardHeader
          // This isn't a user's avatar, but a simple "P" to distinguish this icon from other non-program items
          avatar={
            <Avatar aria-label="Program" className={classes.avatar}>
              P
            </Avatar>
          }
          action={
            // Fix this button to allow users to option to edit and delete etc.
            <Link to={`/programs/${program._id}/edit`}>
              <IconButton>
                {/* Need to make the edit icon orange */}
                <i className="material-icons">edit</i>
              </IconButton>
            </Link>
            // Make another option "delete":
            // <button onClick={() => removeProgram(program._id)}>Delete</button>
            // Make another option "view":
            //<a href={`/programs/${program._id}`}><button>View</button></a>
            // <a href={`/programs/${program._id}`}><button>View</button></a>
            // <a href={`/programs/${program._id}/editprogram`}><button>Edit</button></a>
          }

          title={program && program.name}
          // Displays date that the program will be run - .createdAt and .categories are missing though?!
          subheader={program && program.date}
        />

        {/* Displays a description of the program */}
        <CardContent>
          <Typography paragraph>{program && program.unit.name}</Typography>
          <Typography paragraph>{program && program.length}</Typography>
          <Typography component="p">
            {program && program.description}
          </Typography>
        </CardContent>

        {/* Add to Favourites and Share buttons not working yet */}
        <CardActions className={classes.actions} disableActionSpacing>
          <IconButton aria-label="Add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="Share">
            <ShareIcon />
          </IconButton>

          {/* An expandable section for activities with lots of information to display */}
          <IconButton
            className={classnames(classes.expand, {
              [classes.expandOpen]: this.state.expanded,
            })}
            onClick={this.handleExpandClick}
            aria-expanded={this.state.expanded}
            aria-label="Show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>

        {/* For each activity belonging to a particular program, show as ActivityCard in a list. */}
        {/* <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>Activities:</Typography>
            <Typography>
              <ul>
                {program.activities && program.activities.map(activity => (
                  <li>
                    <Activity key={activity._id} activity={activity}></Activity>
                  </li>
                ))}
            </ul>
            </Typography>
          </CardContent>
        </Collapse> */}

      </Card>

    );
  }
}

Program.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Program);