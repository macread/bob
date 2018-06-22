import React, { Component } from 'react';
import NavBar from '../NavBar/NavBar';
import { connect } from 'react-redux';
import { creatingContact } from '../../ducks/reducer';
import { Link } from 'react-router-dom';
import axios from 'axios';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: 400,
    },
    menu: {
      width: 400,
    },
    button: {
        margin: theme.spacing.unit,
      },
  });

const contactType = [
'Select...',
'Application',
'Email',
'Text',
'Phone Call',
'Informational Interview',
'Remote Interview',
'Interview',
'Other'
];

class ContactDetail extends Component {
    constructor() {
        super()
        
        this.state = {
            contactid: 0,
            date: new Date(),
            type: '',
            title: '',
            url: '',
            description: '',
            contacts: []
        }
    }

    componentDidMount() {
        if (this.props.creatingNewContact) {
            let today = new Date();
            this.setState({
                contactid: 0,
                date: `${today.getFullYear()}-${('00'+(today.getMonth()+1)).slice(-2)}-${today.getDate()}`,
                type: 'Select...',
                title: '',
                url: '',
                description: ''
            })
        }else{
            this.getContact(this.props.currentContactID)
        }
    }

    handleChange(name, val){
        this.setState({
            [name]: val
        })
    }

    addContact(){
        this.props.creatingContact(false)
        axios.post('/api/contact/',{
            resourceid: this.props.currentResourceID,
            date: this.state.date,
            type: this.state.type,
            title: this.state.title,
            description: this.state.description
         })
    }

    getContact(contactid) {
        axios.get(`/api/contact/${contactid}`).then( results => {
            let { id, date, type, title, description } = results.data[0]
            this.setState({
                contactid: id,
                date: date.substring(0,10),
                type: type,
                title: title,
                description: description
            })
        });
    }

    updateContact(){
        axios.put('/api/contact',{
            id: this.props.currentContactID,
            date: this.state.date,
            type: this.state.type,
            title: this.state.title,
            description: this.state.description
         })
    }

    cancelContact(){
        this.props.creatingContact(false)
    }

    deleteContact(){
        axios.delete(`/api/contact/${this.props.currentContactID}`)
    }


    render() {
        const { classes } = this.props;

        return (
            
            <form className={classes.container} noValidate autoComplete="off">
                <NavBar />
                <h1>{ this.props.creatingNewContact ? 
                        `New Contact for ${this.props.currentResourceTitle}`
                    :
                        `${this.state.title} for ${this.props.currentResourceTitle}`
                }
                </h1>

                    <TextField
                        id="date"
                        label="date"
                        type="date"
                        value={ String(this.state.date) }
                        onChange={( e ) => this.handleChange( 'date', e.target.value ) }
                        className={classes.textField}
                        InputLabelProps={{
                        shrink: true,
                        }}
                    />

                    <TextField
                        id="select-resource"
                        select
                        label="Contact type"
                        className={classes.textField}
                        value={this.state.type}
                        onChange={( e ) => this.handleChange( 'type', e.target.value ) }
                        SelectProps={{
                            native: true,
                            MenuProps: {
                            className: classes.menu,
                            },
                        }}
                        helperText="Please select the contact type"
                        margin="normal"
                        >
                        {contactType.map(option => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </TextField>

                    <TextField
                        id="full-width"
                        label="Title"
                        className={classes.textField}
                        value={this.state.title}
                        onChange={ ( e ) => this.handleChange( 'title', e.target.value ) }
                        helperText="Enter the title of the Contact"
                        margin="normal"
                    />

                    <TextField
                        id="multiline-flexible"
                        label="Description"
                        multiline
                        rowsMax="4"
                        value={this.state.description}
                        onChange={ ( e ) => this.handleChange( 'description', e.target.value ) }
                        className={classes.textField}
                        helperText="Enter enter the description of the contact"
                        margin="normal"
                    />

                   { 
                        this.props.creatingNewContact ?
                            (<Link to={'/resourcedetail'} >
                                <Button variant="contained" color="primary" className={classes.button}
                                        onClick={()=>this.addContact()}>
                                    Save
                                </Button>
                            </Link>
                        ) : (<Link to={'/resourcedetail'} >
                                <Button variant="contained" color="primary" className={classes.button}
                                    onClick={()=>this.updateContact()}>
                                    Update
                                </Button>
                            </Link>
                        )
                    }

                    <Link to={'/resourcedetail'} >
                        <Button variant="contained" className={classes.button}
                                onClick={()=>this.cancelContact()}>
                            Cancel
                        </Button>
                    </Link>
                    
                    <Link to={'/resourcedetail'} >
                        <Button variant="contained" color="secondary" className={classes.button}
                                onClick={()=>this.deleteContact()}>
                            Delete
                        </Button>
                    </Link>
            </form>
        )
    }
}

ContactDetail.propTypes = {
    classes: PropTypes.object.isRequired,
  };

function mapStateToProps(state) {
    return{
        userid: state.userid,
        creatingNewContact: state.creatingNewContact,
        resource: state.resource,
        currentResourceID: state.currentResourceID,
        currentResourceTitle: state.currentResourceTitle,
        currentContactID: state.currentContactID
    }
}

export default withStyles(styles)(connect(mapStateToProps, { creatingContact })(ContactDetail));