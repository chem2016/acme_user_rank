import React, {Component} from 'react'

class UserForm extends Component{
    constructor(){
        super(props) // when u need to use props immediately, like in componentDidUpdate
        this.state = {
            name = '',
            bio = '',
            rank = '',
        }
    }
    // in the form you look at if the state is updated meaning filling in the blank
    componentDidUpdate(){

    }


    render(){
        const {name, bio, rank} = this.state
        return (
            <form>
                <input name={name} value={value}/>
            </form>
        )
        
    }
    
    

}