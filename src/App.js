import React, {Component, Fragment} from 'react'
import {HashRouter as Router, Route, Link, Switch} from 'react-router-dom'
import Home from './Home'
import Users from './Users'
import axios from 'axios'
import Nav from './Nav'

class App extends Component{
    constructor(){
        super()
        this.state = {
            users: []
        }
    }

    load=()=>{
        axios.get('/api/users')
            .then(res=>res.data)
            .then(users=>{
                console.log('users:', users)
                this.setState({users})
            })
            .catch(err=>console.log(err))
    }

    componentDidMount(){
        this.load()
    }


    render(){
        const users = this.state.users;
        return(
            <Router>
                <Fragment>
                <h1>Acme Users With Ranks</h1>
                <Route render={({location})=><Nav location={location}/>}/>
                <Route exact path='/' render={()=><Home />}/>
                <Route exact path='/users' render={()=><Users users={users}/>}/>
                </Fragment>
            </Router>
        )
        
    }
}

export default App