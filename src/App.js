import React, {Component} from 'react'
import {HashRouter as Router, Route, Link, Switch} from 'react-router-dom'
import Home from './Home'
import Users from './Users'
import axios from 'axios'
import Nav from './Nav'
import UserForm from './UserForm';
import { fetchUsers, createUser } from './store'
import { connect } from 'react-redux'

class App extends Component{
    constructor(){
        super()
        this.state = {
            users: []
        }
    }

    componentDidMount(){
        this.props.fetchUsers()
            .then(()=>{console.log('this.props.fetchUsers', this.props.fetchUsers)})
            .catch(ex=>console.log(ex))
    }

    // componentDidUpdate(){
    //     this.props.createUser()
    // }



    render(){
        let {users} = this.props;
        if(!users.length){
            users = []
        }
        console.log('before return users: ', users)
        return(
            <Router>
                <h1>Acme Users With Ranks</h1>
                <Route render={({location})=><Nav location={location}/>}/>
                <Route exact path='/' render={()=><Home />}/>
                <Route exact path='/users' render={()=><Users users={users}/>}/>
                <Switch>
                    {/* {comments: history, location, match are the commonly used three params u need to pass to the render method, if we were using component=<someform />, the history and location are passed automatical by props. however, render method break this connnection, you need to pass history as a params, so you someForm can access it} */}
                    <Route exact path='/users/create' render={ ({history})=><UserForm history={history} createUser={this.props.createUser} />}/>
                </Switch>
            </Router>
        )
        
    }
}


const mapDispatchToProps = ( dispatch)=> {
    return {
      fetchUsers: (users)=> dispatch(fetchUsers()),
      createUser: (user)=> dispatch(createUser(user))
    };
  };
  
const mapStateToProps = (state)=> {
    console.log(state);
    return {
      users: state
    };
  };

export default connect(mapStateToProps, mapDispatchToProps)(App);

