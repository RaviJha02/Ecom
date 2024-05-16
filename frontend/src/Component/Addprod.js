import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Ct from './Ct'

const Addprod = () => {
    let [data,setData]=useState({"name":"","desc":"","price":"","cat":""})
    let navigate=useNavigate()
    let obj=useContext(Ct)
    let fun=(e)=>{
        setData({...data,[e.target.name]:e.target.value})
    }
    let fun1=(e)=>{
        setData({...data,"pimg":e.target.files[0]})
    }
    let add=()=>{
        let fd=new FormData()
        for(let prop in data)
        {
            fd.append(prop,data[prop])
        }
        axios.post("http://localhost:5000/prod/add",fd,{"headers":{"authorization":obj.cont.token,"_id":obj.cont._id}}).then((res)=>{
            navigate("/")
        })

    }

    return (
        <div className='logincon'>
            <div className='login'>
                
                <input type='text' placeholder='enter name' name='name' value={data.name} onChange={fun}/>
                <input type='text' placeholder='enter price' name='price' value={data.price} onChange={fun}/>
                <input type='text' placeholder='enter description' name='desc' value={data.desc} onChange={fun}/>
                <input type='text' placeholder='enter category' name='cat' value={data.cat} onChange={fun}/>
                <input type='file' name="pimg" onChange={fun1}/>
                <button onClick={add}>AddProd</button>
            </div>
        </div>
      )
}

export default Addprod