import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import IconButton from '@material-ui/core/IconButton';
import ListItemText from '@material-ui/core/ListItemText';
import EmailIcon from '@material-ui/icons/Email';
import DeleteIcon from '@material-ui/icons/Delete';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
  },
  icon: {
    margin: theme.spacing.unit * 2,
  },
});

function Networks(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <List component="nav">
        <ListItem button>
          <ListItemText primary={props.name} />
          <IconButton color="primary" className={classes.button}>
            <EmailIcon className={classes.icon} color="primary" />
          </IconButton>         
          <IconButton color="secondary" className={classes.button}>
            <DeleteIcon className={classes.icon} color="secondary" />
          </IconButton>
        </ListItem>
      </List>
    </div>
  );
}

Networks.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Networks);
