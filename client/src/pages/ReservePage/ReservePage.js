import React, { Component } from 'react';
import './style.css';

class ReservePage extends Component{

    constructor(props){
        super(props);
        this.state = {
            list: []
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
            .then(res => res.json())
            .then(list => this.setState({ list }))
            .catch(err => err)
    };

    componentWillMount(){
        //this.findRooms();
        this.GetRooms();
    }

    render(){
        const { list } = this.state;

        return(
            <div className='reserve'>
                Reserve Page
                <p> 
                    <div>
                        {list.length ? (
                            <div>
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
                            </div>
                        ) : (
                            <div>
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