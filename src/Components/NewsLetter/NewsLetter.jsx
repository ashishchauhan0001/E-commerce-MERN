import React from 'react'
import './NewsLetter.css'

const NewsLetter = () => {
    const clicked= function(){
        alert('You will get the notifications on your email. Thankyou')
    }
  return (
    <div className='newsletter'>
        <h1>Get Exclusive Offers On Your Email</h1>
        <p>Subscribe to our newsletter and stay updated</p>
        <div>
            <input type="email" placeholder='Enter your email...' />
            <button onClick={clicked}> Subscribe</button>
        </div>

    </div>
  )
}

export default NewsLetter