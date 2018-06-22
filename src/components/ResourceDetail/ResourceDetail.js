import React, { Component } from 'react';
import { connect } from 'react-redux';
import NavBar from './../NavBar/NavBar';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { creatingResource, setCurrentResource } from '../../ducks/reducer'
import Contact from '../Contacts/Contacts'

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

  const resourceType = [
    'Select...',
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
                <h1>{ this.props.creatingNewResource ? 
                        "New Resource"
                    :
                        this.props.resource[0].resourcetitle 
                }
                </h1>

                    <TextField
                        id="date"
                        label="date"
                        type="date"
                        defaultValue={this.state.date}
                        value={this.state.date}
                        onChange={( e ) => this.handleChange( 'date', e.target.value ) }
                        className={classes.textField}
                        InputLabelProps={{
                        shrink: true,
                        }}
                    />

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

                    <TextField
                        id="full-width"
                        label="Title"
                        className={classes.textField}
                        value={this.state.title}
                        onChange={ ( e ) => this.handleChange( 'title', e.target.value ) }
                        helperText="Enter the title of the resource"
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
                        helperText="Enter enter the description of the resource"
                        margin="normal"
                    />

                    <TextField
                        id="full-width"
                        label="URL"
                        className={classes.textField}
                        value={this.state.url}
                        onChange={ ( e ) => this.handleChange( 'url', e.target.value ) }
                        helperText="Enter the URL of the resource"
                        margin="normal"
                    />
                    
                  
                    <Contact />


                    { 
                        this.props.creatingNewResource ?
                            (<Link to={'/dashboard'} >
                                <Button variant="contained" color="primary" className={classes.button}
                                        onClick={()=>this.addResource()}>
                                    Save
                                </Button>
                            </Link>
                        ) : (<Link to={'/dashboard'} >
                                <Button variant="contained" color="primary" className={classes.button}
                                    onClick={()=>this.updateResource()}>
                                    Update
                                </Button>
                            </Link>
                        )
                    }

                    <Link to={'/dashboard'} >
                        <Button variant="contained" className={classes.button}
                                onClick={()=>this.cancelResource()}>
                            Cancel
                        </Button>
                    </Link>
                    
                    <Link to={'/dashboard'} >
                        <Button variant="contained" color="secondary" className={classes.button}
                                onClick={()=>this.deleteResource()}>
                            Delete
                        </Button>
                    </Link>


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