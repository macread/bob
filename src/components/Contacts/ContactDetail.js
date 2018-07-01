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
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import IconButton from '@material-ui/core/IconButton';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import EmailIcon from '@material-ui/icons/Email';
import DeleteIcon from '@material-ui/icons/Delete';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import Grid from '@material-ui/core/Grid';

const mySignature = '<br><br><br><table width="470" cellspacing="0" cellpadding="0" border="0"><tr><td><table cellspacing="0" cellpadding="0" border="0"><tr>  <td style="font-size:1em;padding:0 15px 0 8px;" valign="top"><table cellspacing="0" cellpadding="0" border="0" style="line-height: 1.4;font-family:Verdana, Geneva, sans-serif;font-size:90%;color: #000001;"><tr><td><div style="font-size:1.2em;color:#000001;">Mac Read</div></td></tr><tr><td style="padding: 4px 0;"><div style="font-size:1.2em;color:#3748AC;"><span style="font-weight: 700;"></span>  <span> Sent From My Job Search Tracker</span>  <span></span></div></td></tr>  <tr><td><span style="color:#BE1157;">phone:&nbsp;</span><span><a style="color:#000001;" href="tel:8015823121">801.582.3121</a></span></td></tr>     <tr><td><span style="color:#BE1157;">email:&nbsp;</span><span><a href="mailto:james.macgregor.read@gmail.com" target="_blank" style="color: #000001;">devjmacread@gmail.com</a></span></td></tr>   </table><table class="branding" cellspacing="0" cellpadding="0" border="0"></table>'

const styles = theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: '50%',
    },
    menu: {
      width: 400,
    },
    button: {
        margin: theme.spacing.unit,
    },
    root: {
        width: '50%',
        maxWidth: '50%',
        marginLeft: '25%',       
        backgroundColor: theme.palette.background.paper,
    },
    icon: {
        margin: theme.spacing.unit * 2,
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
            inperson: false,
            title: '',
            url: '',
            description: '',
            contacts: [],
            networks: [{
                id: 0,
                connectionid: 0,
                name: '', 
                email: ''
            }],
            allNetworks: [{
                id: 0,
                name: '',
                address: '',
                mobile: '',
                work: '',
                email: '',
                notes: ''
            }],
            mailDialogOpen: false,
            subject: '',
            message: '',
            idx: 0
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

    handleMailClickOpen(idx){
        this.setState({ 
            mailDialogOpen: true,
            idx: idx
        });
    }

    handleMailDialogClose = () => {
        this.setState({ mailDialogOpen: false });
    };

    sendEmail(idx){
     
        let theHtml = this.state.message + mySignature
        
        axios.post('/api/email',{
            email: this.state.networks[idx].email,
            subject: this.state.subject,
            text: this.state.message,
            html: theHtml
        }).then(this.handleMailDialogClose)
        this.setState({subject: '', message: ''})

    }

    addContact(){
        this.props.creatingContact(false)
        axios.post('/api/contact/',{
            resourceid: this.props.currentResourceID,
            date: this.state.date,
            type: this.state.type,
            title: this.state.title,
            description: this.state.description,
            inperson: this.state.inperson
         })
    }

    getContact(contactid) {
        axios.get(`/api/contact/${contactid}`).then( results => {
            let { id, date, type, title, description, inperson } = results.data[0]
            this.setState({
                contactid: id,
                date: date.substring(0,10),
                type: type,
                title: title,
                description: description,
                inperson: inperson
            })
        }).then(axios.get(`/api/networks/${contactid}`).then( results => {
                (results.data.length>0 ? this.setState({networks: results.data}) : this.setState({networks: this.state.networks})) }))
            .then(axios.get('/api/networks/').then( results => {
                this.setState({allNetworks: results.data})}))

    }

    updateContact(){
        axios.put('/api/contact',{
            id: this.props.currentContactID,
            date: this.state.date,
            type: this.state.type,
            title: this.state.title,
            description: this.state.description,
            inperson: this.state.inperson
         })
    }

    cancelContact(){
        this.props.creatingContact(false)
    }

    deleteContact(){
        axios.delete(`/api/contact/${this.props.currentContactID}`)
    }

    deleteNetworkConnection(idx){
        axios.delete(`/api/networkconnection/${this.state.networks[idx].connectionid}`)
            .then(this.getContact(this.state.contactid))
    }

    addNetwork(val){
        axios.post('/api/networkconnection',{
            networkid: val,
            contactid: this.state.contactid
        })
        .then(this.getContact(this.state.contactid))
        .then(this.setState({idx: 0}))
    }



    render() {
        const { classes } = this.props;

        return (
            
            <form className={classes.container} noValidate autoComplete="off">
                <NavBar />
                <Grid container space={24}>
                    <Grid item xs={12}>
                        <h1>{ this.props.creatingNewContact ? 
                                `New Contact for ${this.props.currentResourceTitle}`
                            :
                                `${this.state.title} for ${this.props.currentResourceTitle}`
                        }
                        </h1>
                    </Grid>

                    <Grid item xs={12}>
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
                    </Grid>

                    <Grid item xs={12}>
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
                    </Grid>

                    <Grid item xs={12}>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={this.state.inperson}
                                    onChange={ ( e ) => this.handleChange( 'inperson', e.target.checked )}
                                    value="true"
                                    color="primary"
                                />
                            }
                            label="Meeting"
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            id="full-width"
                            label="Title"
                            className={classes.textField}
                            value={this.state.title}
                            onChange={ ( e ) => this.handleChange( 'title', e.target.value ) }
                            helperText="Enter the title of the Contact"
                            margin="normal"
                        />
                    </Grid>

                    <Grid item xs={12}>
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
                    </Grid>

                    <Grid item xs={12}>
                        <span className='Network'
                        >Network</span>
                    </Grid>

                    <Grid item xs={12}>
                        <FormControl className={classes.formControl}>                    
                            <NativeSelect
                                value=''
                                onChange={e => this.addNetwork(e.target.value)}
                                input={<Input name="days" id="days-native-helper" />}
                            >
                                <option value='0' key='9999'></option>
                                {this.state.allNetworks.map( (network, i) => (
                                    <option value={network.id} key={i}>{network.name}</option>
                                ))}
                            </NativeSelect>
                            <FormHelperText>Select a network connection for this contact</FormHelperText>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                    <div className={classes.root}>
                        <List component="nav">
                            {this.state.networks.map( (network, i) => (
                                    
                                    <ListItem button key={i}>
                                    <ListItemText primary={network.name} />
                                    <IconButton color="primary" className={classes.button} >
                                        <EmailIcon className={classes.icon} color="primary" onClick={() => this.handleMailClickOpen(i)} />
                                    </IconButton>         
                                    <IconButton color="secondary" className={classes.button}>
                                        <DeleteIcon className={classes.icon} color="secondary" onClick={ () => this.deleteNetworkConnection(i) } />
                                    </IconButton>
                                    </ListItem>
                                ))
                            }
                        </List>
                    </div>
                    </Grid>

                    <Grid item xs={12}>
                            { 
                                this.props.creatingNewContact ?
                                        (<Button variant="contained" color="primary" component={Link} to='/resourcedetail' className={classes.button}
                                                onClick={()=>this.addContact()}>
                                            Save
                                        </Button>
                                ) : (<Button variant="contained" color="primary" component={Link} to='/resourcedetail' className={classes.button}
                                            onClick={()=>this.updateContact()}>
                                            Update
                                        </Button>
                                )
                            }

                                
                            <Button variant="contained" className={classes.button} component={Link} to='/resourcedetail' 
                                    onClick={()=>this.cancelContact()}>
                                Cancel
                            </Button>
                            
                            <Button variant="contained" color="secondary" className={classes.button} component={Link} to='/resourcedetail' 
                                    onClick={()=>this.deleteContact()}>
                                Delete
                            </Button>
                    </Grid>
                </Grid>

                <Dialog
                    open={this.state.mailDialogOpen}
                    onClose={this.handleMailDialogClose}
                    aria-labelledby="form-dialog-title"
                    >
                    <DialogTitle id="form-dialog-title">Email {this.state.networks[this.state.idx].name}</DialogTitle>
                    <DialogContent>

                        <TextField
                            autoFocus
                            value={this.state.subject}
                            margin="dense"
                            id="subject"
                            label="Subject"
                            type="text"
                            fullWidth
                            onChange={ ( e ) => this.handleChange('subject', e.target.value)}
                        />

                        <TextField
                            value={this.state.message}
                            margin="dense"
                            id="message"
                            label="Message"
                            type="text"
                            fullWidth
                            onChange={ ( e ) => this.handleChange('message', e.target.value)}
                        />

                    </DialogContent>

                    <DialogActions>
                        <Button onClick={this.handleMailDialogClose} color="secondary">
                            Cancel
                        </Button>
                        <Button onClick={()=>this.sendEmail(this.state.idx)} color="primary">
                            Send
                        </Button>
                    </DialogActions>
                </Dialog>
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