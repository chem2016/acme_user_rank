import React from 'react'
import { Link, HashRouter as Router, Route } from 'react-router-dom'

const Nav = ({location}) =>{
    const { pathname } = location
    const links = [
        {
            'label': 'Home',
            'to': '/',
        },
        {
            'label': 'Users',
            'to': '/users',
        },
        {
            'label': 'create A User',
            'to': '/users/create',
        },
        {
            'label': 'topRanked',
            'to': '/users/topRanked',
        }
    ]
    return(
        <ul className='nav nav-tabs'>
            {
                links.map((link)=>{
                    return (
                        <li key={link.to} className='nat-item'>
                            <Link to={link.to} className={`nav-link${ link.to === pathname ? ' active':''}`}>
                                {link.label}
                            </Link>
                        </li>
                    )
                })
            }
        </ul>
    )

}

export default Nav;
