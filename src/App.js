import React, { Component } from 'react'
import Navbar from './components/Navbar'
import News from './components/News'
import LoadingBar from 'react-top-loading-bar'
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";

export default class App extends Component {
  pageSize=35;
  apiKey=process.env.REACT_APP_API 

  state={
    progress:0
  }
  setProgress = (progress)=>{
    this.setState({progress:progress})
  }

  render() {
    return (
      <Router>

      
        <Navbar/>
        <LoadingBar
        color='red'
        progress={this.state.progress}
        height={3}
      />
        <Routes>
          <Route exact path="/" element={<News apiKey={this.apiKey} setProgress={this.setProgress}  key="general" pageSize={this.pageSize} category="general" country="in"/>} />
          <Route exact path="/sports" element={<News apiKey={this.apiKey} setProgress={this.setProgress}   key="sports" pageSize={this.pageSize} category="sports"/>}/>
          <Route exact path="/entertainment" element={<News apiKey={this.apiKey} setProgress={this.setProgress}   key="entertainment" pageSize={this.pageSize} category="entertainment"/>}/>
          <Route exact path="/health" element={<News apiKey={this.apiKey} setProgress={this.setProgress}   key="health" pageSize={this.pageSize} category="health"/>}/>
          <Route exact path="/science" element={<News apiKey={this.apiKey} setProgress={this.setProgress}   key="science" pageSize={this.pageSize} category="science"/>}/>
          <Route exact path="/technology" element={<News apiKey={this.apiKey} setProgress={this.setProgress}   key="technology" pageSize={this.pageSize} category="technology"/>}/>
        </Routes>
        
        </Router>
    )
  }
}
