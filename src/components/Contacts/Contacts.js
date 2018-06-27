import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { creatingContact, setCurrentContact } from '../../ducks/reducer'
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

    componentDidMount() {
        this.getContacts(this.props.currentResourceID);
    }

    getContacts(resouceid){
        axios.get(`/api/contacts/${resouceid}`).then( results => {
            this.setState({ contacts: results.data });
        });
    }

    handleAddContactClick(bool){
        this.props.creatingContact(bool);
    }

    handleEditContactClick(contactid,title){
        this.props.setCurrentContact({id: contactid, title: title});
    }

    render() {
        const { classes } = this.props;
      
        return (
            <List
            component="nav"
            subheader={<ListSubheader component="div">Contacts</ListSubheader>} >

             
            <IconButton component={Link} to='/contactdetail' color="primary" className={classes.button} onClick={ () => this.handleAddContactClick(true) }>
                <AddIcon />
            </IconButton>

            { 
                this.props.resource.map( (contact, i) => ( 
                
                        <div key={i}>
                            <ListItem button >
                                <IconButton component={Link} to='/contactdetail' color="primary" className={classes.button} component="span"
                                        onClick={ () => this.handleEditContactClick(contact.contactid,contact.contacttitle) }>
                                    <EditIcon />
                                </IconButton>
                      
                                <ListItemText inset primary={contact.contacttitle} />
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

function mapStateToProps(state){
    return{
        userid: state.userid,
        creatingNewContact: state.creatingNewContact,
        currentResourceID: state.currentResourceID,
        currentResourceTitle: state.currentResourceTitle,
        resource: state.resource
    }
}

export default withStyles(styles)(connect(mapStateToProps, { creatingContact, setCurrentContact })(Contacts));