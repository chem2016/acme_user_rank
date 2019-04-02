import React, {Component} from 'react'

class UserForm extends Component{
    constructor(props){
        super(props) // when u need to use props immediately, like in componentDidUpdate
        this.state = {
            name: '',
            bio: '',
            rank: '',
        }
    }
//     // in the form you look at if the state is updated meaning filling in the blank
//     componentDidUpdate(){

//     }

    onChange = (ev) =>{
        console.log('in function onChange')
        this.setState({[ev.target.name]: ev.target.value})
    }

    onSave = (ev) =>{
        ev.preventDefault()
        const user = this.state  
        console.log('in function onSave: ', user)
        this.props.createUser(user)
            .then((user)=>{
                console.log('add user: ', user)
                this.props.history.push('/users')
            })
            .catch(ex=>console.log(ex))
    }


    render(){
        const {name, bio, rank} = this.state
        return (
            <form onSubmit={this.onSave}>
                <label htmlFor='name'>name</label>
                <input 
                    name='name'
                    type='text'
                    value={name}
                    onChange={this.onChange}
                /><br/>
                <label htmlFor='bio'>bio</label>
                <input 
                    name='bio'
                    type='text'
                    value={bio}
                    onChange={this.onChange}
                /><br/>
                <label htmlFor='rank'>rank</label>
                <input 
                    name='rank'
                    type='number'
                    value={rank}
                    onChange={this.onChange}
                /><br/>
                <button type='submit'>create</button>
            </form>
        )
    }
    
    

}

export default UserForm