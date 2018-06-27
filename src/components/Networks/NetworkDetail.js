import React, { Component } from 'react';
import NavBar from '../NavBar/NavBar';
import { connect } from 'react-redux';
import { creatingNetwork } from '../../ducks/reducer';
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

class NetworkDetail extends Component {

    constructor() {
        super()
        
        this.state = {
            networkid: 0,
            name: '',
            address: '',
            mobile: '',
            work: '',
            notes: ''
        }
    }



    componentDidMount() {
        if (!this.props.creatingNewNetwork) {
            axios.get(`/api/network/${this.props.match.params.networkid}`).then(results => {
                let { id, name, address, mobile, work, notes } = results.data[0]
                this.setState({
                    networkid: id,
                    name: name,
                    address: address,
                    mobile: mobile,
                    work: work,
                    notes: notes
                })
            })


            
        }
    }

    addNetwork() {
        this.props.creatingNetwork(false);
        let { name, address, mobile, work, notes } = this.state;
        axios.post('api/network',{
            contactid: this.props.currentContactID,
            name: name,
            address: address, 
            mobile: mobile, 
            work: work, 
            notes: notes
        }).then(() => this.props.history.push('/contactDetail'))

    }

    cancelNetwork() {
        this.props.creatingNetwork(false);
    }

    handleChange(name, val){
        this.setState({
            [name]: val
        })
    }

    render() {
        const { classes } = this.props;
        return (
            <form className={classes.container} noValidate autoComplete="off">
                <NavBar />
                <h1>{ this.props.creatingNewNetwork ? 
                        `New Network Connection for ${this.props.currentContactTitle}`
                    :
                        `Network Connection for ${this.props.currentContactTitle}`
                }
                </h1>
                
                <TextField
                    id="full-width"
                    label="Name"
                    className={classes.textField}
                    value={this.state.name}
                    onChange={ ( e ) => this.handleChange( 'name', e.target.value ) }
                    helperText="Enter the name of the network connection"
                    margin="normal"
                />

                 <TextField
                    id="full-width"
                    label="Address"
                    multiline
                    className={classes.textField}
                    value={this.state.address}
                    onChange={ ( e ) => this.handleChange( 'address', e.target.value ) }
                    helperText="Enter the address of the network connection"
                    margin="normal"
                />

                <TextField
                    id="full-width"
                    label="Mobile"
                    className={classes.textField}
                    value={this.state.mobile}
                    onChange={ ( e ) => this.handleChange( 'mobile', e.target.value ) }
                    helperText="Enter the mobile phone number of the network connection"
                    margin="normal"
                />

                <TextField
                    id="full-width"
                    label="Work"
                    className={classes.textField}
                    value={this.state.work}
                    onChange={ ( e ) => this.handleChange( 'work', e.target.value ) }
                    helperText="Enter the work phone number of the network connection"
                    margin="normal"
                />

                <TextField
                    id="full-width"
                    label="Notes"
                    multiline
                    className={classes.textField}
                    value={this.state.notes}
                    onChange={ ( e ) => this.handleChange( 'notes', e.target.value ) }
                    helperText="Enter notes for network connection"
                    margin="normal"
                />

                { 
                        this.props.creatingNewNetwork ?
                                (<Button variant="contained" color="primary" className={classes.button}
                                        onClick={()=>this.addNetwork()}>
                                    Save
                                </Button>
                        ) : (<Button variant="contained" color="primary" className={classes.button}
                                    onClick={()=>this.updateNetwork()}>
                                    Update
                                </Button>
                        )
                    }

                    <Button variant="contained" className={classes.button} component={Link} to='/contactDetail'
                            onClick={()=>this.cancelNetwork()}>
                        Cancel
                    </Button>
                    
                    <Button variant="contained" color="secondary" className={classes.button}
                            onClick={()=>this.deleteNetwork()}>
                        Delete
                    </Button>
            </form>
        )
    }
}

NetworkDetail.propTypes = {
    classes: PropTypes.object.isRequired,
  };

function mapStateToProps(state) {
    return {
        creatingNewNetwork: state.creatingNewNetwork,
        currentContactTitle: state.currentContactTitle,
        currentContactID: state.currentContactID
    }
}


export default withStyles(styles)(connect(mapStateToProps, { creatingNetwork })(NetworkDetail));