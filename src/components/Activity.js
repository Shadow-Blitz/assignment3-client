/* 
  This ActivityCard component is a card-item that displays all the information of a single activity created by a given leader.
  An ActivityCard may appear in several places across the app: 
    - by itself, when a user wants to view the activity
    - as part of the searchable activities library
    - on associated user or unit profile pages, as a list-item
*/

import React from 'react'
import { Link } from 'react-router-dom'
// import store from '../config/store'
// import { fetchActivity } from '../services/ActivityService'
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
import store from '../config/store';
import decodeJWT from 'jwt-decode'

const styles = theme => ({
  card: {
    width: 400,
    margin: 15
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

// Should be renamed to ActivityCard for clarity
class Activity extends React.Component {
  state = { expanded: false };

  // componentDidMount() {
  //   fetchActivity(this.props.key)
  // }

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  render() {
    const activity = this.props.activity //store.getState().activity
    const { classes } = this.props;
    const token = store.getState().token
    const tokenDetails = token && decodeJWT(token)
    return (
      <Card className={classes.card}>
        <CardHeader
          // This isn't a user's avatar, but a simple "A" to distinguish this icon from other non-activity items
          avatar={
            <Avatar aria-label="Activity" className={classes.avatar}>
              A
            </Avatar>
          }
          action={
            // Fix this button to allow users to option to edit and delete etc.

            (tokenDetails && tokenDetails.sub) == activity.user._id ?
              <Link to={`/activities/${activity._id}/edit`}>
                <IconButton>
                  {/* Make pre-filled edit page */}
                  {/* Need to make the edit icon orange */}
                  <i className="material-icons">edit</i>
                </IconButton>
              </Link>
              : null

            // Make another option "delete":
            // <button onClick={() => removeActivity(activity._id)}>Delete</button>
            // Make another option "view":
            //<a href={`/activities/${activity._id}`}><button>View</button></a>
          }
          title={activity && activity.title}
          // Displays the appropriate age level for the activity as the subheader - .createdAt and .categories are missing though?!
          subheader={activity && activity.ageLevel && activity.ageLevel.name}
        />

        {/* If we have time: users can add images to an activity */}
        {/* <CardMedia
          className={classes.media}
          image={activity && activity.image}
          title={activity && activity.image.caption}
        /> */}

        {/* Displays a description of the activity */}
        <CardContent>
          <Typography component="p">
            {activity && activity.description}
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
        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          <CardContent>
            {/* We could have an expandable section for full-length description or step-by-step instructions  */}
            <Typography paragraph>Instructions:</Typography>
            <Typography paragraph>
              {activity && activity.instructions}
            </Typography>
            <Typography paragraph>Resources Needed:</Typography>
            {activity && activity.resources}
          </CardContent>
        </Collapse>

      </Card>
    );
  }
}

Activity.propTypes = {
  classes: PropTypes.object.isRequired,
  activity: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    user: PropTypes.object,
    ageLevel: PropTypes.object,
    length: PropTypes.number
  }).isRequired
};


export default withStyles(styles)(Activity);