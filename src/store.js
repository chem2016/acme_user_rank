import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import axios from 'axios';

const SET_USERS = 'SET_USERS'
const ADD_USER = 'ADD_USER'
const DELETE_USER = 'DELETE_USER'
// const initialState = { users: [] } ?? HY

// const reducer = (state=initialState, action) =>{
//     switch(action.type){
//         case SET_USERS:
//             return {...state, users: action.data}
//         default:
//             return state
//     }
// }



const reducer = (state=[], action)=> {
      switch(action.type){
        case SET_USERS:
          state = action.data
          break;
        case ADD_USER:
          return [...state, action.user]
      }

      return state;
    };

const setUsers = (data) => {
    return {
        type: SET_USERS,
        data
    }
}

// const addUser = (user) => {
//     return {
//         type: ADD_USER,
//         user
//     }
// }

const deleteUser = (id) => {
    return {
        type: DELETE_USER,
        id,
    }
}

const createUser = (user) => {
    return (dispatch) => {
        return axios.post('/api/users/create', user)
            .then(res => res.data)
            .then(user => {
                console.log('in addUser user: ', user)
                // dispatch(addUser(user))
                return axios.get('/api/users')
            })
            .then((res)=>res.data)
            .then(users => {
                dispatch(setUsers(users))
            })
            .catch(ex=>console.log(ex))
    }
}

const deleteUserThunk = (id) => {
    return (dispatch) => {
        return axios.delete(`/api/users/${id}`)
            .then(()=>{
                dispatch(deleteUser(id))
            })
            .catch(ex=>console.log(ex))
    }
}


// const deleteUser = (id) => {
//     return (dispatch) => {
//         return axios.delete(`/api/users/${id}`)
//             .then(()=>{
//                 console.log(`user ${id} delete`)
//                 return axios.get('/api/users')
//             })
//             .then((res)=>res.data)
//             .then(users => {
//                 dispatch(setUsers(users))
//             })
//     }
// }


const fetchUsers = () => {
    return (dispatch) => {
        return axios.get('/api/users')
            .then(res => res.data)
            .then(users => {
                console.log('in fetchUsers users: ', users)
                console.log('setUsers(users): ', setUsers(users))
                dispatch(setUsers(users))
            })
    }
}

const store = createStore(reducer, applyMiddleware(thunk))

export default store
export { setUsers, fetchUsers, createUser, deleteUserThunk }
