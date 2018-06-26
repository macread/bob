import React, { Component } from 'react';
import NavBar from '../NavBar/NavBar';
import { connect } from 'react-redux';
import { creatingNetwork } from '../../ducks/reducer';
import { Link } from 'react-router-dom';

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
            office: '',
            notes: ''
        }
    }



    componentDidMount() {
        if (!this.props.creatingNewNetwork) {
            let { id, name, address, mobile, office, notes } = this.props.resource[0]
            this.setState({
                networkid: id,
                name: name,
                address: address,
                mobile: mobile,
                office: office,
                notes: notes
            })

        }
    }

    addNetwork() {
        this.props.creatingNetwork(false);
        axios.

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
                        `${this.state.title} for ${this.props.currentContactTitle}`
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
                    label="Office"
                    className={classes.textField}
                    value={this.state.office}
                    onChange={ ( e ) => this.handleChange( 'office', e.target.value ) }
                    helperText="Enter the office phone number of the network connection"
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
                            (<Link to={'/contactDetail'} >
                                <Button variant="contained" color="primary" className={classes.button}
                                        onClick={()=>this.addNetwork()}>
                                    Save
                                </Button>
                            </Link>
                        ) : (<Link to={'/contactDetail'} >
                                <Button variant="contained" color="primary" className={classes.button}
                                    onClick={()=>this.updateNetwork()}>
                                    Update
                                </Button>
                            </Link>
                        )
                    }

                    <Link to={'/contactDetail'} >
                        <Button variant="contained" className={classes.button}
                                onClick={()=>this.cancelNetwork()}>
                            Cancel
                        </Button>
                    </Link>
                    
                    <Link to={'/contactDetail'} >
                        <Button variant="contained" color="secondary" className={classes.button}
                                onClick={()=>this.deleteNetwork()}>
                            Delete
                        </Button>
                    </Link>
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
        currentContactId: state.currentContactId
    }
}


export default withStyles(styles)(connect(mapStateToProps, { creatingNetwork })(NetworkDetail));