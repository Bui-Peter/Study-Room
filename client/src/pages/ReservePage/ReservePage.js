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
        this.handleSaveRoom = this.handleSaveRoom.bind(this);
    }

    // Retrieve the rooms and set it into a list in the states
    GetRooms(){

        fetch('http://localhost:9000/findRoom')
            .then(res => res.json())
            .then(list => this.setState({ list }))
            .catch(err => err)
    };

    // Get rooms when loaded in
    componentWillMount(){
        this.GetRooms();
    }

    handleSaveRoom(event){
        event.preventDefault();

        var startTime = this.state.start;
        var endTime = this.state.end;

        if(startTime === '' || endTime === ''){
            alert("Did not select 2 options"); 
            return;
        }
            

        //format date into: 2019-08-15+14%3A30
        if(startTime.substring(startTime.length-2, startTime.length) === 'pm')
            startTime = (parseInt(startTime.split(':')[0]) + 12).toString() + '%3A' + startTime.split(':')[1].substring(0, 2);
        else   
            startTime = startTime.split(':')[0] + '%3A' + startTime.split(':')[1].substring(0, 2);

        if(endTime.substring(endTime.length-2, endTime.length) === 'pm')
            endTime = (parseInt(endTime.split(':')[0]) + 12).toString() + '%3A' + endTime.split(':')[1].substring(0, 2);
        else
            endTime = endTime.split(':')[0] + '%3A' + endTime.split(':')[1].substring(0, 2);

        console.log('start: ' + startTime);
        console.log('end: ' + endTime);
            
        //find the current date, set it in the proper format
        var day = new Date().getDate();
        var year = new Date().getFullYear();
        var month = new Date().getMonth() + 1;

        var date = year + "-" + month + "-" + day;
        //var date = "2019-08-19";

        startTime = date + '+' + startTime;
        endTime = date + '+' + endTime;

        var data = {
            room: this.state.room,
            start: startTime,
            end: endTime
        }

        axios.post('http://localhost:9000/saveRoom', data);
    }

    // Handles whenever a checkbox is checked or unchecked, set the states of room, start, or end time.
    handleChange(event){
        console.log(event.target.value);

        var roomID = event.target.value.substring(0, 4);
        var time = '';

        // determine whether the time is the start or the end (left or right of the value)
        this.state.hasStart === false ? time = event.target.value.split(' ')[1] : time = event.target.value.split(' ')[3];

        

        this.setState({room: roomID});

        //assign start time or end time and check off whether it exists or not
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
                                    
                                    <ListRooms items={list} handleChange={this.handleChange}  />

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

// List every room that is available
function ListRooms(props){
    const list = props.items;

    return(
        <div className='room-list'>
            {list.map( (item) => {
                return(
                    <div className='room' key={ item.roomID }>
                        Room: {item.roomID} <br></br>
                        Capacity: {item.capacity}

                        <ListOpenTimes times={item.open.time} roomID={item.roomID} handleChange={props.handleChange} />
                    </div>
                );
            })}
        </div>
    );
}

//List every available time for each room
function ListOpenTimes(props){
    const openTimes = props.times

    return(
        <div className='time-list'>
            {openTimes.map( (time) => {
                return(
                    <div className='time' key={props.roomID + ' ' + time}>
                        <input type='checkbox' name={ time } value={ props.roomID + ' ' + time } onChange={props.handleChange} />
                        { time }
                    </div>
                )
            })}
        </div>
    );
}
export default ReservePage;