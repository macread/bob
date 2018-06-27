import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import EmailIcon from '@material-ui/icons/Email';
import EditIcon from '@material-ui/icons/Edit'

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
});

function Networks(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <List component="nav">
        <ListItem button>
          <ListItemIcon>
            <EditIcon />
          </ListItemIcon>
          <ListItemText primary={props.name} />
          <ListItemIcon>
            <EmailIcon />
          </ListItemIcon>
        </ListItem>
      </List>
    </div>
  );
}

Networks.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Networks);
