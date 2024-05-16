import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import Ct from './Ct'

const Nav = () => {
    let obj=useContext(Ct)
  return (
    <nav>
        <Link to='/'>Home</Link>
        {obj.cont.token==""&&<Link to='/reg'>Register</Link>}
        {obj.cont.token==""&&<Link to='/login'>Login</Link>}
        {obj.cont.token!="" && obj.cont.role=="admin"&&<Link to='/add'>Add Product</Link>}
        {obj.cont.token!=""&&<Link to='/cart'>cart</Link>}
        {obj.cont.token!=""&&<Link to='/logout'>Logout</Link>}
        {obj.cont.token!=""&&<div>{obj.cont.name}</div>}
        
    </nav>
  )
}

export default Nav