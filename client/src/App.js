import React, { Component } from "react";
//import HomePage from './pages/HomePage';
import NavigationBar from './components/NavigationBar'


class App extends Component{
  constructor(props){
    super(props);
    this.state = { apiResponse: "", dbResponse: "" };
  }


  callAPI(){
    fetch("http://localHost:9000/getRoom")
      .then(res => res.text())
      .then(res => this.setState( {apiResponse: res}));
  }

  callDB(){
    fetch("http://localHost:9000/getRoom")
      .then(res => res.text())
      .then(res => this.setState ({ dbResponse : res}))
      .catch(err => err);
  }

  componentWillMount(){
    //this.callAPI();
    //this.callDB();
  }

  render(){
    return(
      <div className='App'>
        <NavigationBar />
      </div>
      );
  }
}



export default App;
