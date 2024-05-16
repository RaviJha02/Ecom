import React, { useContext, useEffect } from 'react'
import Ct from './Ct'
import { useNavigate } from 'react-router-dom'

const Logout = () => {
    let obj=useContext(Ct)
    let navigate=useNavigate()
    useEffect(()=>{
        obj.updcont({"_id":"","token":"","name":"","role":""})
        navigate("/")

    },[])

  return (
    <></>
  )
}

export default Logout