import React, { useContext, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Reg = () => {
    let [data,setData]=useState({"_id":"","pwd":"","name":"","phno":""})
    let [err,setErr]=useState("")
    let navigate=useNavigate()
    let fun=(e)=>{
        setData({...data,[e.target.name]:e.target.value})
    }
    let reg=()=>{
        axios.post("http://localhost:5000/user/reg",data).then((res)=>{
            if(res.data.msg=="account created"){
                navigate("/login")
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
            <input type='text' placeholder='enter name' name='name' value={data.name} onChange={fun}/>
            <input type='text' placeholder='enter phno' name='phno' value={data.phno} onChange={fun}/>
            <input type='password' placeholder='enter password' name='pwd' value={data.pwd} onChange={fun}/>
            <button onClick={reg}>Register</button>
        </div>
    </div>
  )
}

export default Reg