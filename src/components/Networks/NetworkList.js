import React, { Component } from 'react';
import Networks from '../Networks/Networks';
import axios from 'axios';
import NavBar from '../NavBar/NavBar';

export default class NetworkList extends Component {

    constructor() {
        super()
        
        this.state = {
            networks: []
        }
    }

    componentDidMount(){
        this.getNetworkList();
    }

    getNetworkList(){
        axios.get('/api/networks/').then( results => {
            this.setState({
                networks: results.data
            })})
    }

    render() {
        return (
            
            <div>
                <NavBar />
                <h1>Network List</h1>
                {this.state.networks.map( (network, i) => (
                    <Networks
                        key={i} 
                        id={network.id}
                        name={network.name}   
                    />
                ))
                }  
            </div> 
        )
    }
}