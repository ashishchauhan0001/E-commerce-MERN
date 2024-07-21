import React, { useContext, useState } from 'react'
import './Navbar.css'
import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'
import { Link } from 'react-router-dom'
import { ShopContext } from '../../Context/ShopContext'

const Navbar = () => {
    const[menu,setMenu]=useState("shop");
    const {getCartValue} =useContext(ShopContext);
  return (
    <div className='navbar'>
        <div className="nav-logo">
         <Link to='/'><img src={logo} alt="" /> </Link>  
         <Link to='/' style={{textDecoration:'none'}}><p>SHOPPER</p></Link>  
        </div>
        <ul className="nav-menu">
            <li onClick={()=>setMenu("shop")}><Link to='/' style={{textDecoration:'none'}}>Shop </Link> {menu==="shop"?<hr />:<></>}</li>
            <li onClick={()=>setMenu("mens")}><Link to='/mens' style={{textDecoration:'none'}}>Men</Link>  {menu==="mens"?<hr />:<></>}</li>
            <li onClick={()=>setMenu("women")}><Link to='/women' style={{textDecoration:'none'}}> Women </Link>{menu==="women"?<hr />:<></>}</li>
            <li onClick={()=>setMenu("kids")}><Link to='/kids' style={{textDecoration:'none'}}>Kids</Link> {menu==="kids"?<hr />:<></>}</li>
        </ul>
        <div className="nav-login-cart">
            {localStorage.getItem('auth-token')
            ?<button style={{background:"#e0c4f4",color:"black"}} onClick={()=>{localStorage.removeItem('auth-token');window.location.replace('/')}}>Logout</button>:
            <Link to='/login'><button> Login </button></Link>
            }
            
           <Link to='/cart'><img src={cart_icon} alt="" /></Link> 
            <div className="nav-cart-count">{getCartValue()}</div>
        </div>
    </div>
  )
}

export default Navbar