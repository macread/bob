import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    maxHeight: 300,
  },
  listSection: {
    backgroundColor: 'inherit',
  },
  ul: {
    backgroundColor: 'inherit',
    padding: 0,
  },
});

function PinnedSubheaderList(props) {
  const { classes } = props;

  return (
    <List className={classes.root} subheader={<li />}>
      {props.resourceData.map( resource => ( 
          (id !== resource.id) ? 
            <li key={`section-${resource.id}`} className={classes.listSection}>
              <ul className={classes.ul} >
                <ListSubheader>{resource.title}</ListSubheader>
              </ul>
            </li>
            :
              <ListItem key={`item-${resource.id}-${item}`}>
                <ListItemText primary={`Item ${item}`} />
              </ListItem>
            
      ))}
    </List>
  );
}

PinnedSubheaderList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PinnedSubheaderList);