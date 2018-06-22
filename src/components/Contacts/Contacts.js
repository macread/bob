import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { creatingContact } from '../../ducks/reducer'
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/AddCircleOutline';
import IconButton from '@material-ui/core/IconButton';


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
  

class Contacts extends Component {

    constructor() {
        super()
        
        this.state = {
            contacts: []
        }
    }


    getContacts(id){
        axios.get(`/api/contacts/${id}`).then( results => {
            this.setState({ contacts: results.data });
        });
    }

    handleAddContactClick(bool){
        this.props.creatingContact(bool);
    }

    render() {
        const { classes } = this.props;
        this.getContacts(this.props.resourceid);
      
        return (
            <List
            component="nav"
            subheader={<ListSubheader component="div">Contacts</ListSubheader>} >

                {<Link to={"/contactdetail"} >
                    <IconButton color="primary" className={classes.button} component="span" onClick={ () => this.handleAddContactClick(true) }>
                        <AddIcon />
                    </IconButton>
                </Link>}

            { 
                this.state.contacts.map( (contact, i) => ( 
                
                        <div key={i}>
                            <ListItem button  onClick={ () => this.handleClick(contact.id) }>
                                
                                    <IconButton color="primary" className={classes.button} component="span"
                                            onClick={ () => this.handleEditClick(contact.id) }
                                            contactid = {contact.id}>
                                        <EditIcon />
                                    </IconButton>
                      
                                <ListItemText inset primary={contact.title} />
                            </ListItem>

                        </div>
                    

                
            ))}
            </List>
        )
    }
}

Contacts.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(connect(null, { creatingContact })(Contacts));