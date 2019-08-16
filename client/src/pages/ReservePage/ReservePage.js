import React, { Component } from 'react';
import './style.css';

import axios from 'axios';


class ReservePage extends Component{

    constructor(props){
        super(props);
        this.state = {
            list: [],
            room: 0,
            start: '',
            end: '',
            hasStart: false,
            hasEnd: false
        };

        this.handleChange = this.handleChange.bind(this);
    }


    findRooms(){
        console.log("Finding Rooms...");

        fetch('http://localhost:9000/findRoom')
            .catch(err => err)
    }

    GetRooms(){
        fetch('http://localhost:9000/getRoom')
            .then(res => res.json())
            .then(list => this.setState({ list }))
            .catch(err => err)
    };

    componentWillMount(){
        this.GetRooms();
    }

    handleSaveRoom(event){
        event.preventDefault();


        axios.post('http://localhost:9000/saveRoom');
    }

    handleChange(event){

        var time = event.value;

        if(event.target.checked){
            if(this.state.hasStart === false)
                this.setState({start: time, hasStart: true});
            else if(this.state.hasStart)
                this.setState({end: time, hasEnd: true});
        }
        else {
            if(this.state.hasStart && this.state.hasEnd)
                this.setState({end: '', hasEnd: false});
            else if(this.state.hasStart && this.state.hasEnd === false)
                this.setState({start: '', hasStart: false});
        }
        

    }



    render(){
        const list = this.state.list;
    
        return(
            <div className='reserve'>
                Reserve Page   

                    <div className='room-text'>
                        {list.length ? (
                            <div className='room-available'>
                                <form onSubmit={this.handleSaveRoom}>
                                    <button type='submit'>Save Room!</button>
                                    

                                    {list.map((item) => {
                                    return(
                                            <div className='room' key={ item.roomID }>
                                                Room: {item.roomID}
                                                <p>Capacity: {item.capacity}</p>

                                                <div className='time-list'>
                                                    {item.open.time.map((openTimes) => {
                                                        return(      
                                                                <div className='time' key={ item.roomID + ' ' + openTimes}>
                                                                    <input type='checkbox' name={ openTimes } value={ openTimes } onChange={this.handleChange} />
                                                                    { openTimes }
                                                                </div>                                                          
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                    );
                                })}

                                </form>
                            </div>
                        ) : (
                            <div className='no-room-available'>
                                No rooms available.
                            </div>
                        )
                    }   
                    </div>
            </div>
        )
    }
}

export default ReservePage;