import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import Ct from './Ct'
import { useNavigate } from 'react-router-dom'

const Cart = () => {
  let [cart, setCart] = useState([])
  let obj = useContext(Ct)
  let navigate = useNavigate()
  let getfun = () => {
    axios.get(`http://localhost:5000/cart/get/${obj.cont._id}`,{"headers":{"authorization":obj.cont.token}}).then((res) => {
      // console.log(res.data)
      setCart(res.data)
    })
  }
  useEffect(() => {
    if (obj.cont.token) {
      getfun()
    }
    else {
      navigate("/login")
    }

  }, [])

  let del = (id) => {
    axios.delete(`http://localhost:5000/cart/del/${id}`,{"headers":{"authorization":obj.cont.token}}).then(()=>{
      getfun()
    })
  }
  let incr=(_id)=>{
    axios.put(`http://localhost:5000/cart/inc`,{"_id":_id},{"headers":{"authorization":obj.cont.token}}).then(()=>{
      getfun()
    })
  }
  let decr=(_id)=>{
    axios.put(`http://localhost:5000/cart/dec`,{"_id":_id},{"headers":{"authorization":obj.cont.token}}).then(()=>{
      getfun()
    })
  }
  let clr=()=>{
    axios.delete(`http://localhost:5000/cart/clr/${obj.cont._id}`,{"headers":{"authorization":obj.cont.token}}).then(()=>{
      getfun()
    })
  }

  return (<>
    {cart.length == 0 && <div>Your cart is empty</div>}
    {cart.length > 0 && <div className='con'>
      {
        cart.map((item) => {
          return (<div className='prodcon'>
            <div className='img'>
              <img src={`http://localhost:5000/imgs/${item.pimg}`} />
            </div>
            <p>Name:{item.name}</p>
            <p>Desc:{item.desc}</p>
            <p>Cat:{item.cat}</p>
            <p>Price:<b>{item.price}</b></p>
            <p className='inc'><button style={{ "width": 50 }} onClick={()=>decr(item._id)}>
              -</button> {item.qty} <button style={{ "width": 50 }} onClick={()=>incr(item._id)}>+</button>
            </p>
            <button onClick={() => del(item._id)}>Delcart</button>

          </div>)
        })
      }
    </div>}
    {cart.length > 0 &&<button onClick={clr}>Clear Cart</button>}
  </>)

}

export default Cart