import React, { Component } from 'react';
import './style.css';

class ReservePage extends Component{

    constructor(props){
        super(props);
        this.state = {
             saveResponse: "", 
             GetResponse: ""
        };
    }


    findRooms(){
        console.log("Finding Rooms...");

        fetch('http://localhost:9000/findRoom')
            .then(res => res.text())
            .then(text => this.setState({saveResponse : text}))
            .catch(err => err)
    }

    GetRooms(){
        fetch('http://localhost:9000/getRoom')
            .then(res => res.text())
            .then(text => this.setState({GetResponse : text}))
            .catch(err => err)
    };

    componentWillMount(){
        this.findRooms();
        this.GetRooms();
    }

    render(){
        return(
            <div className='reserve'>
                Reserve Page
                <p>{this.state.GetResponse}</p>
            </div>
        )
    }
}

export default ReservePage;