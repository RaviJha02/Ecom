import React, { useContext, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Nav from './Component/Nav'
import Ct from './Component/Ct'
import Home from './Component/Home'
import Reg from './Component/Reg'
import Login from './Component/Login'
import Cart from './Component/Cart'
import Logout from './Component/Logout'
import Addprod from './Component/Addprod'
import './App.css'
import ProdDetail from './Component/ProdDetail'


const App = () => {
  let [cont,setCont]=useState({"_id":"","token":"","name":"","role":""})
  let updcont=(obj)=>{
    setCont({...cont,...obj})
  }
  let obj={"cont":cont,"updcont":updcont}
  return (
    <BrowserRouter>
    <Ct.Provider value={obj}>
    <Nav/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/reg' element={<Reg/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/cart' element={<Cart/>}/>
      <Route path='/logout' element={<Logout/>}/>
      <Route path='/add' element={<Addprod/>}/>
      <Route path='/pdetail' element={<ProdDetail/>}/>
    </Routes>

    </Ct.Provider>
    </BrowserRouter>
  )
}

export default App