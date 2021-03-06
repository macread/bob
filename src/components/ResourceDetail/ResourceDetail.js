import React, { Component } from 'react';
import { connect } from 'react-redux';
import NavBar from './../NavBar/NavBar';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { creatingResource, setCurrentResource } from '../../ducks/reducer'
import Contacts from '../Contacts/Contacts'

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';


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
  });

  const resourceType = [
    'Select...',
    'Referral',
    'indeed.com',
    'Glassdoor',
    'ZipRecruiter',
    'Monster.com',
    'Company Web Site',
    'Other'
  ];

class ResourceDetail extends Component {
    constructor() {
        super()
        
        this.state = {
            resourceid: 0,
            date: new Date(),
            type: '',
            title: '',
            url: '',
            description: '',
            contacts: []
        }
    }

    componentDidMount() {
        if (this.props.creatingNewResource) {
            let today = new Date();
            this.setState({
                resourceid: 0,
                date: `${today.getFullYear()}-${('00'+(today.getMonth()+1)).slice(-2)}-${today.getDate()}`,
                type: 'Select...',
                title: '',
                url: '',
                description: ''
            })
        }else{
            let { id, resourcedate, type, resourcetitle, url, description } = this.props.resource[0]
            this.setState({
                resourceid: id,
                date: resourcedate.substring(0,10),
                type: type,
                title: resourcetitle,
                url: url,
                description: description
            })
            this.props.setCurrentResource({id: id, title: resourcetitle})

        }
    }

    handleChange(name, val){
        this.setState({
            [name]: val
        })
    }


    addResource(){
        this.props.creatingResource(false)
        axios.post('/api/resources/',{
            date: this.state.date,
            type: this.state.type,
            title: this.state.title,
            url: this.state.url,
            description: this.state.description
         })
    }

    updateResource(){
        axios.put(`/api/resources/${this.props.userid}`,{
            id: this.props.resource[0].id,
            date: this.state.date,
            type: this.state.type,
            title: this.state.title,
            url: this.state.url,
            description: this.state.description
         })
    }

    cancelResource(){
        this.props.creatingResource(false)
    }

    deleteResource(){
        axios.delete(`/api/resources/${this.props.resource[0].id}`)
    }

    render() {
        const { classes } = this.props;

        return (
            <form className={classes.container} noValidate autoComplete="off">
                <NavBar />
                <Grid container spacing={24}>
                    <Grid item xs={12}>       
                        <h1>{ this.props.creatingNewResource ? 
                            "New Resource"
                        :
                            this.props.resource[0].resourcetitle 
                        }
                        </h1>
                    </Grid>

                    <Grid item xs={12}>    
                        <TextField
                            id="date"
                            label="ResouceDate"
                            className={classes.textField}
                            type="date"
                            value={ String(this.state.date) }
                            onChange={( e ) => this.handleChange( 'date', e.target.value ) }
                            InputLabelProps={{
                            shrink: true,
                            }}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            id="select-resource"
                            select
                            label="Resource type"
                            className={classes.textField}
                            value={this.state.type}
                            onChange={( e ) => this.handleChange( 'type', e.target.value ) }
                            SelectProps={{
                                native: true,
                                MenuProps: {
                                className: classes.menu,
                                },
                            }}
                            helperText="Please select the resource type"
                            margin="normal"
                            >
                            {resourceType.map(option => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </TextField>
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            id="full-width"
                            label="Title"
                            className={classes.textField}
                            value={this.state.title}
                            onChange={ ( e ) => this.handleChange( 'title', e.target.value ) }
                            helperText="Enter the title of the resource"
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
                            helperText="Enter enter the description of the resource"
                            margin="normal"
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            id="full-width"
                            label="URL"
                            className={classes.textField}
                            value={this.state.url}
                            onChange={ ( e ) => this.handleChange( 'url', e.target.value ) }
                            helperText="Enter the URL of the resource"
                            margin="normal"
                        />
                    </Grid>
                    
                    {this.props.creatingNewResource ? null : (
                        <Grid item xs={12}>
                            <Contacts />
                        </Grid>)
                    }

                    <Grid item xs={12}>

                        {this.props.creatingNewResource ?
                                (<Button component={Link} to="/dashboard" variant="contained" color="primary" className={classes.button}
                                            onClick={()=>this.addResource()}>
                                        Save
                                </Button>
                            ) : (
              
                                <Button component={Link} to="/dashboard" variant="contained" color="primary" className={classes.button}
                                        onClick={()=>this.updateResource()}>
                                        Update
                                </Button>
                            )
                        }

                            <Button component={Link} to="/dashboard" variant="contained" className={classes.button}
                                    onClick={()=>this.cancelResource()}>
                                Cancel
                            </Button>
                        

                            <Button component={Link} to="/dashboard" variant="contained" color="secondary" className={classes.button}
                                    onClick={()=>this.deleteResource()}>
                                Delete
                            </Button>

                    </Grid>
                </Grid>
            </form>
        )
    }
}


ResourceDetail.propTypes = {
    classes: PropTypes.object.isRequired,
  };

function mapStateToProps(state) {
    return{
        userid: state.userid,
        creatingNewResource: state.creatingNewResource,
        resource: state.resource
    }
}

export default withStyles(styles)(connect(mapStateToProps, { creatingResource, setCurrentResource })(ResourceDetail));