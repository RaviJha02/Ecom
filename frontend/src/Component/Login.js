import React, { useContext, useState } from 'react'
import axios from 'axios'
import Ct from './Ct'
import { useNavigate } from 'react-router-dom'


const Login = () => {
    let [data,setData]=useState({"_id":"","pwd":""})
    let obj=useContext(Ct)
    let [err,setErr]=useState("")
    let navigate=useNavigate()
    let fun=(e)=>{
        setData({...data,[e.target.name]:e.target.value})
    }
    let login=()=>{
        axios.post("http://localhost:5000/user/login",data).then((res)=>{
            if(res.data.token){
                obj.updcont(res.data)
                navigate("/")
            }
            else{
                setErr(res.data.msg)
            }

        })
    }
  return (
    <div className='logincon'>
        <div className='login'>
            <div>{err}</div>
            <input type='text' placeholder='enter email' name='_id' value={data._id} onChange={fun}/>
            <input type='password' placeholder='enter password' name='pwd' value={data.pwd} onChange={fun}/>
            <button onClick={login}>Login</button>
        </div>
    </div>
  )
}

export default Login