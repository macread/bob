import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateCollapseState, getResource } from '../../ducks/reducer'

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import EditIcon from '@material-ui/icons/Edit';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';

import { Link } from 'react-router-dom';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
});

class Resources extends Component {
    constructor() {
    super()
        
        this.state = {
            open: []
        }
    }


  handleClick(resourceId) {
    this.props.updateCollapseState(resourceId);
  };

  handleEditClick(resourceId) {
      this.props.updateCollapseState(resourceId);
      this.props.getResource(resourceId);
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <List
          component="nav"
          subheader={<ListSubheader component="div"></ListSubheader>} >

          { 
            this.props.resourceList.map( (resource, i) => ( 
                (resource.main === 'yes') ? (
                    <div key={i}>
                        <ListItem button  onClick={ () => this.handleClick(resource.id) }>
                            <Link to={"/resourcedetail"} >
                                <IconButton color="primary" className={classes.button} component="span"
                                        onClick={ () => this.handleEditClick(resource.id) }
                                        resourceId = {resource.Id}>
                                    <EditIcon />
                                </IconButton>
                            </Link>
                            <ListItemText inset primary={resource.resourcetitle} />
                            {resource.collapse ? <ExpandLess /> : <ExpandMore/>}
                        </ListItem>

                        <Collapse in={resource.collapse} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                <ListItem button className={classes.nested}>
                                    <ListItemText inset primary={resource.contacttitle} />
                                </ListItem>
                            </List>
                        </Collapse>
                    </div>
                    )
                :   
                    ( 
                    <div key={i}>
                        <Collapse in={resource.collapse} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                <ListItem button className={classes.nested}>
                                    <ListItemText inset primary={resource.contacttitle} />
                                </ListItem>
                            </List>
                        </Collapse>
                    </div>
                    )

               
          ))}
        </List>
      </div>
    );
  }
}

Resources.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps(state){
    return {
        resourceList: state.resourceList
    }
}

export default withStyles(styles)(connect(mapStateToProps, { updateCollapseState, getResource })(Resources));