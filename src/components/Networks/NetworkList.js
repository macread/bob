import React, { Component } from 'react';
import axios from 'axios';
import NavBar from '../NavBar/NavBar';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import EmailIcon from '@material-ui/icons/Email';
import Typography from '@material-ui/core/Typography';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { IconButton } from '@material-ui/core';



const mySignature = '<br><br><br><table width="470" cellspacing="0" cellpadding="0" border="0"><tr><td><table cellspacing="0" cellpadding="0" border="0"><tr>  <td style="font-size:1em;padding:0 15px 0 8px;" valign="top"><table cellspacing="0" cellpadding="0" border="0" style="line-height: 1.4;font-family:Verdana, Geneva, sans-serif;font-size:90%;color: #000001;"><tr><td><div style="font-size:1.2em;color:#000001;">Mac Read</div></td></tr><tr><td style="padding: 4px 0;"><div style="font-size:1.2em;color:#3748AC;"><span style="font-weight: 700;"></span>  <span> Sent From My Job Search Tracker</span>  <span></span></div></td></tr>  <tr><td><span style="color:#BE1157;">phone:&nbsp;</span><span><a style="color:#000001;" href="tel:8015823121">801.582.3121</a></span></td></tr>     <tr><td><span style="color:#BE1157;">email:&nbsp;</span><span><a href="mailto:james.macgregor.read@gmail.com" target="_blank" style="color: #000001;">devjmacread@gmail.com</a></span></td></tr>   </table><table class="branding" cellspacing="0" cellpadding="0" border="0"></table>'

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    root: {
      flexGrow: 1,
    },
    flex: {
      flex: 1,
    },
  });


class NetworkList extends Component {

    constructor() {
        super()
        
        this.state = {
            network: {
                id: 0,
                name: '',
                address: '',
                mobile: '',
                work: '',
                email: '',
                notes: ''
            },
            networks: [{
                id: 0,
                name: '',
                address: '',
                mobile: '',
                work: '',
                email: '',
                notes: ''
            }],
            subject: '',
            message: '',
            dialogOpen: false,
            mailDialogOpen: false,
            idx: 0
        }
    }

    componentDidMount(){
        this.getNetworkList();
    }

    handleChange(name, val, idx){
        let newNetworks = this.state.networks;
        switch (name) {
            case 'name':
                newNetworks[idx].name=val
                break;
            case 'address':
                newNetworks[idx].address=val
                break;
            case 'mobile':
                newNetworks[idx].mobile=val
                break;
            case 'work':
                newNetworks[idx].work=val
                break;
            case 'email':
                newNetworks[idx].email=val
                break;
            case 'notes':
                newNetworks[idx].notes=val
                break;
            default:
                break;
        }

        this.setState({networks: newNetworks})

        
    }

    handleMailDialogChange(name, val){
        this.setState({[name]: val})
    }

    handleClickOpen(idx) {
        if (idx>=0) {
            this.setState({ 
                dialogOpen: true, 
                idx: idx 
            });
        } else {
            let newNetworks = this.state.networks;
            idx = (newNetworks.push(this.state.network)) - 1
            this.setState({
                dialogOpen: true, 
                idx: idx ,
                networks: newNetworks
            })
        }
    };

    handleMailClickOpen(){
        this.setState({ 
            mailDialogOpen: true
        });
    }
    
    handleDialogClose = () => {
        this.setState({ idx: 0, dialogOpen: false });
    };

    handleMailDialogClose = () => {
        this.setState({ mailDialogOpen: false });
    };

    addNetwork(idx){
        let { name, address, mobile, work, email, notes } = this.state.networks[idx]
        axios.post('/api/network',{
            name: name,
            address: address,
            mobile: mobile,
            work: work,
            email: email,
            notes: notes
         }).then(this.getNetworkList()).then(this.handleDialogClose)
    }


    getNetworkList(){
        axios.get('/api/networks/').then( results => {
            this.setState({
                networks: results.data
            })})
    }

    updateNetwork(idx){
        let { id, name, address, mobile, work, email, notes } = this.state.networks[idx]
        axios.put('/api/network',{
            id: id,
            name: name,
            address: address,
            mobile: mobile,
            work: work,
            email: email,
            notes: notes
         }).then(this.getNetworkList()).then(this.handleDialogClose)
    }

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

    deleteNetwork(idx){
        axios.delete(`/api/network/${this.state.networks[idx].id}`).then(this.getNetworkList()).then(this.handleDialogClose)
    }

    render() {
        const { classes } = this.props;
        return (
            
            <div>
                <NavBar />
                <Typography variant="title" color="inherit" className={classes.flex}>
                    Network Connections
                </Typography>
                {this.state.networks.map( (network, i) => (
                    <List component="nav" key={i}>
                        <ListItem button onClick={ () => this.handleClickOpen(i)}>
                            <ListItemText primary={network.name} />
                        </ListItem>
                    </List>
                ))


                } 

                <Button component={Link} to="/dashboard" variant="contained" color="secondary" className={classes.button}>
                        Done
                </Button>
                <Button onClick={() => this.handleClickOpen(-1)} variant="contained" color="primary" className={classes.button}>
                        Add Connection
                </Button>

                <Dialog
                    open={this.state.dialogOpen}
                    onClose={this.handleDialogClose}
                    aria-labelledby="form-dialog-title"
                    >
                    <DialogTitle id="form-dialog-title">Network Connections</DialogTitle>
                    <DialogContent>

                        <TextField
                            autoFocus
                            value={this.state.networks[this.state.idx].name}
                            margin="dense"
                            id="name"
                            label="Name"
                            type="text"
                            fullWidth
                            onChange={ ( e ) => this.handleChange('name', e.target.value, this.state.idx )}
                        />

                        <TextField
                            value={this.state.networks[this.state.idx].address}
                            margin="dense"
                            id="address"
                            label="Address"
                            type="text"
                            fullWidth
                            onChange={ ( e ) => this.handleChange('address', e.target.value, this.state.idx )}
                        />

                        <TextField
                            value={this.state.networks[this.state.idx].mobile}
                            margin="dense"
                            id="mobile"
                            label="Mobile"
                            type="number"
                            fullWidth
                            onChange={ ( e ) => this.handleChange('mobile', e.target.value, this.state.idx )}
                        />

                        <TextField
                            value={this.state.networks[this.state.idx].work}
                            margin="dense"
                            id="work"
                            label="Work Number"
                            type="number"
                            fullWidth
                            onChange={ ( e ) => this.handleChange('work', e.target.value, this.state.idx )}
                        />

                        <TextField
                            value={this.state.networks[this.state.idx].email}
                            margin="dense"
                            id="email"
                            label="Email Address"
                            type="text"
                            fullWidth
                            onChange={ ( e ) => this.handleChange('email', e.target.value, this.state.idx )}
                        />

                        <IconButton button onClick={() => this.handleMailClickOpen()}>
                            <EmailIcon />
                        </IconButton>

                        <TextField
                            value={this.state.networks[this.state.idx].notes}
                            multiline
                            margin="dense"
                            id="notes"
                            label="Notes"
                            type="text"
                            fullWidth
                            onChange={ ( e ) => this.handleChange('notes', e.target.value, this.state.idx )}
                        />
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={()=>this.deleteNetwork(this.state.idx)} color="secondary">
                            Delete
                        </Button>
                        <Button onClick={this.handleDialogClose} color="primary">
                            Cancel
                        </Button>
                        { this.state.networks[this.state.idx].id > 0 ? 
                            (
                                <Button onClick={()=>this.updateNetwork(this.state.idx)} color="primary">
                                    Update
                                </Button>
                            )
                        :
                            (
                                <Button onClick={()=>this.addNetwork(this.state.idx)} color="primary">
                                    add
                                </Button>   
                            )
                        }
                    </DialogActions>
                </Dialog>

                <Dialog
                    open={this.state.mailDialogOpen}
                    onClose={this.handleMailDialogClose}
                    aria-labelledby="form-dialog-title"
                    >
                    <DialogTitle id="form-dialog-title">Email Network Connection</DialogTitle>
                    <DialogContent>

                        <TextField
                            autoFocus
                            value={this.state.subject}
                            margin="dense"
                            id="subject"
                            label="Subject"
                            type="text"
                            fullWidth
                            onChange={ ( e ) => this.handleMailDialogChange('subject', e.target.value)}
                        />

                        <TextField
                            value={this.state.message}
                            margin="dense"
                            id="message"
                            label="Message"
                            type="text"
                            fullWidth
                            onChange={ ( e ) => this.handleMailDialogChange('message', e.target.value)}
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


            </div> 
        )
    }
}

NetworkList.propTypes = {
    classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(NetworkList);