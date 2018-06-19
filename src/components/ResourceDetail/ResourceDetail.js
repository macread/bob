import React, { Component } from 'react';
import { connect } from 'react-redux';
import NavBar from './../NavBar/NavBar';
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

  const resourceType = [
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
            date: '',
            type: '',
            title: '',
            url: '',
            description: ''
        }
    }

    componentDidMount() {
        this.setState({
            date: this.props.resource[0].resourcedate,
            type: this.props.resource[0].type,
            title: this.props.resource[0].resourcetitle,
            url: this.props.resource[0].url,
            description: this.props.resource[0].description
        })
    }

    handleChange(name, val){
        this.setState({
            [name]: val
        })
    }

    addResource(){

    }

    updateResource(){
        axios.put(`/api/resources/:${this.props.userid}`,{
            id: this.props.resource[0].id,
            date: this.state.date,
            type: this.state.type,
            title: this.state.title,
            url: this.state.url,
            description: this.state.description
         })
    }

    deleteResource(){

    }

    render() {
        const { classes } = this.props;

        return (
                <form className={classes.container} noValidate autoComplete="off">
                <NavBar />
                <h1>{this.props.resource[0].resourcetitle}</h1>

                    <TextField
                        id="date"
                        label="date"
                        type="date"
                        defaultValue={this.state.date}
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
                    
                    { 
                        this.props.resource[0].id === 0 ?
                            (<Button variant="contained" color="primary" className={classes.button}
                                    onClick={()=>this.addResource()}>
                                Save
                            </Button>
                        ) : (
                            <Button variant="contained" color="primary" className={classes.button}
                                onClick={()=>this.updateResource()}>
                                Update
                            </Button>

                        )
                    }
                    
                    <Link to={'/dashboard'} >
                    <Button variant="contained" className={classes.button}>
                        Cancel
                    </Button>
                    </Link>

                    <Button variant="contained" color="secondary" className={classes.button}
                            onClick={()=>this.deleteResource()}>
                        Delete
                    </Button>


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
        resource: state.resource
    }
}

export default withStyles(styles)(connect(mapStateToProps)(ResourceDetail));