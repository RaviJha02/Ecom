import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import Ct from './Ct'
import { Link, useNavigate } from 'react-router-dom'

const Home = () => {
  let [prod,setProd]=useState([])
  let obj=useContext(Ct)
  let navigate=useNavigate()
  useEffect(()=>{
    axios.get("http://localhost:5000/prod/get").then((res)=>{
      setProd(res.data)
    })
  },[])
  let add=(item)=>{
    if(obj.cont.token){
        axios.post("http://localhost:5000/cart/add",{...item,"uid":obj.cont._id,"qty":1},{"headers":{"authorization":obj.cont.token}}).then((res)=>{
          navigate("/cart")
      })
    }
    else{
      navigate("/login")
    }
    
  }

  return (
    <div className='con'>
      {
        prod.map((item)=>{
          return(<div className='prodcon'>
            <div className='img'><img src={`http://localhost:5000/imgs/${item.pimg}`}/></div>
            <p>Name:{item.name}</p>
            <p>Desc:{item.desc}</p>
            <p>Cat:{item.cat}</p>
            <p>Price:<b>{item.price}</b></p>
            <button onClick={()=>add(item)}>Add Cart</button>
            <button onClick={()=>obj.updcont({"item":item,"addtocart":add})}><Link to="/pdetail">Know more</Link></button>

          </div>)
        })
      }
    </div>
  )
}

export default Home