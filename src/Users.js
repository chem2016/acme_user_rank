import React from 'react'

    
export default ({users, deleteUser})=>{
    return(
        <ul>
            {users.map((user)=>{
                return <li key={user.id}>
                {user.name}<br/>
                {user.bio}<br/>
                {user.rank}<br/>
                <button onClick={()=>deleteUser(user.id)}>Delete</button>
                </li>
            })}
        </ul>
    )

}
    

        