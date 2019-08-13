import React, { Component } from 'react';
import './style.css';

import axios from 'axios';

class ReservePage extends Component{

    constructor(props){
        super(props);
        this.state = {
            list: [],
            markedRooms: []
        };
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

    handleSaveRoom(e){
        e.preventDefault();


        axios.post('http://localhost:9000/saveRoom');

    }

    render(){
        const { list } = this.state;
    
        return(
            <div className='reserve'>
                Reserve Page   

                <p> 
                    <div className='room-text'>
                        {list.length ? (
                            <div className='room-available'>
                                <form onSubmit={this.handleSaveRoom}>

                                    <button type='submit'>Save Room!</button>
                                    {list.map((item) => {
                                    return(
                                            <div className='room'>
                                                Room: {item.roomID}
                                                <p>Capacity: {item.capacity}</p>

                                                <div className='time-list'>
                                                    <ul>
                                                        {item.open.time.map((openTimes) => {
                                                            return(                                                                
                                                                    <li>{ openTimes }</li>
                                                            );
                                                        })}
                                                    </ul>
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
                </p>
            </div>
        )
    }
}

export default ReservePage;