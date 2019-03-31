import React, {Component, Fragment} from 'react'
import {HashRouter as Router, Route, Link, Switch} from 'react-router-dom'
import Home from './Home'
import Users from './Users'
import axios from 'axios'
import Nav from './Nav'
import UserForm from './UserForm';

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

    addUser=(user)=>{
        this.setState( prevState => ({
            ...prevState,
            users: [...prevState.users, user]
        }))
    }

    componentDidMount(){
        this.load()
    }

    render(){
        const users = this.state.users;
        return(
            <Router>
                <h1>Acme Users With Ranks</h1>
                <Route render={({location})=><Nav location={location}/>}/>
                <Route exact path='/' render={()=><Home />}/>
                <Route exact path='/users' render={()=><Users users={users}/>}/>
                <Switch>
                    {/* {comments: history, location, match are the commonly used three params u need to pass to the render method, if we were using component=<someform />, the history and location are passed automatical by props. however, render method break this connnection, you need to pass history as a params, so you someForm can access it} */}
                    <Route exact path='/users/create' render={ ({history})=><UserForm history={history} addUser={this.addUser} />}/>
                </Switch>
            </Router>
        )
        
    }
}

export default App