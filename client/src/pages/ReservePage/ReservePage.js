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
            hasEnd: false,
            isLoadingRoom: true
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSaveRoom = this.handleSaveRoom.bind(this);
    }

    // Retrieve the rooms and set it into a list in the states
    GetRooms(){

        this.setState({isLoadingRoom: true});


        fetch('http://localhost:9000/findRoom')
            .then(res => res.json())
            .then(list => this.setState({list: list, isLoadingRoom: false}))
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

        //var date = year + "-" + month + "-" + day;
        var date = "2019-08-23";

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

        var roomID = event.target.name.substring(0, 4);
        var time = '';

        // determine whether the time is the start or the end (left or right of the value)
        this.state.hasStart === false ? time = event.target.value : time = event.target.value;

        

        this.setState({room: roomID});

        //assign start time or end time and check off whether it exists or not
        if(this.state.hasStart === false)
            this.setState({start: time, hasStart: true})
        else
            this.setState({end: time, hasEnd: true})

    }



    render(){
        const list = this.state.list;
        var searchingRoom;
        var listing;

        if(this.state.isLoadingRoom)
            searchingRoom = <div className='loading-room'>Searching for open rooms...</div>
        else
            searchingRoom = <div className='room-unavailable'>There are no open rooms for today.</div>


        return(
            <div className='reserve'>
                Reserve Page   
                <br></br>
                Choose a {this.state.hasStart ? 'end' : 'start'} time

                    <div className='room-text'>
                        {list.length ? (
                            <div className='room-available'>
                                <form onSubmit={this.handleSaveRoom}>
                                    <button type='submit'>Save Room!</button>
                                    {listing}
                                    <ListRooms items={list} hasStart={this.state.hasStart} currentRoom={this.state.room} startTime={this.state.start} handleChange={this.handleChange}  />

                                </form>
                            </div>
                        ) : (
                            <div className='searching'>
                                {searchingRoom}
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
    var done = false;

    return(
        <div className='room-list'>
            {list.map( (item) => {

                // no need to list rooms when start is selected
                if(done)
                    return;

                // display all rooms
                if(!props.hasStart)
                    return(
                        <div className='room' key={ item.roomID }>
                            Room: {item.roomID} <br></br>
                            Capacity: {item.capacity}

                            <ListOpenTimes times={item.open.time} roomID={item.roomID} hasStart={props.hasStart} startTime={props.startTime} handleChange={props.handleChange} />
                        </div>
                    );
                // display only the selected room
                else{
                    if(item.roomID == props.currentRoom){
                        done = true;
                        return(
                            <div className='room' key={ item.roomID }>
                                Room: {item.roomID} <br></br>
                                Capacity: {item.capacity}

                                <ListOpenTimes times={item.open.time} roomID={item.roomID} hasStart={props.hasStart} startTime={props.startTime} handleChange={props.handleChange} />
                            </div>
                        );    
                    }
                }
                    
            })}
        </div>
    );
}

//List every available time for each room, adjusts if hasStart = true to sequential 30 minute time frame from start time.
function ListOpenTimes(props){
    const openTimes = props.times
    const hasStart = props.hasStart

    var prevTime = 0;
    var reserveLimit = 0;

    // initialize prevTime to be the starting time
    if(hasStart){
        if(props.startTime.substring(props.startTime.length-2, props.startTime.length) === 'pm')
            prevTime = parseInt((parseInt(props.startTime.split(':')[0]) + 12).toString() + props.startTime.split(':')[1].substring(0, 2));
        else
            prevTime = parseInt((parseInt(props.startTime.split(":")[0])).toString() + props.startTime.split(':')[1].substring(0, 2));
    }

    return(
        <div className='time-list'>
            {openTimes.map( (time) => {
                // display all times
                console.log(reserveLimit);
                if(hasStart === false)
                    return(
                        <div className='time' key={props.roomID + ' ' + time}>
                            <input type='button' name={ props.roomID + ' ' + time.split(' ')[0] } value={ time.split(' ')[0] } onClick={props.handleChange} />
                        </div>
                    )
                // allow only 8 valid blocks (240 minutes)
                else if(reserveLimit < 8){
                    var currentTime = 0;
                    var endTime = time.split(' ')[2];

                    // change into 24 hour format
                    if(endTime.substring(0, 2) !== '12' && endTime.substring(endTime.length-2, endTime.length) === 'pm')
                        currentTime = parseInt((parseInt(endTime.split(':')[0]) + 12).toString() + endTime.split(':')[1].substring(0, 2));  
                    else   
                        currentTime = parseInt((parseInt(endTime.split(':')[0])).toString() + endTime.split(':')[1].substring(0,2));
                    
                    // check if it's the next iteration in sequence
                    
                    if(currentTime == prevTime + 30 || currentTime == prevTime + 70){
                        reserveLimit++;
                        prevTime = currentTime;
                        return(
                            <div className='time' key={props.roomID + ' ' + time}>
                                <input type='button' name={ props.roomID + ' ' + time.split(' ')[1] } value={ endTime } onClick={props.handleChange} />
                            </div>
                        )
                    }

                    
                }          
            })}
        </div>
    );
}
export default ReservePage;