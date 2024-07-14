import React from 'react'
import './Offers.css'
import exclusion_image from '../Assets/exclusive_image.png'

const Offers = () => {
  return (
    <div className='offers'>
        <div className="offers-left">
            <h1>Exclusive</h1>
            <h1>Offers For You</h1>
            <p>ONLY ON BEST SELLERS PRODUCTS</p>
            <button>Check Now</button>
        </div>
        <div className="offers-right">
            <img src={exclusion_image} style={{ width: "320px", height: "400px", }} alt="" />
        </div>
    </div>
  )
}

export default Offers