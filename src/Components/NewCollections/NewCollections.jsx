import React,{useState,useEffect} from 'react'
import './NewCollections.css'
import Item from '../Item/Item'

export const NewCollections = () => {
  const [newcollection,setNewcollection]=useState([])

  useEffect(() => {
  fetch('http://localhost:4000/newcollections')
  .then((res)=>res.json())
  .then((data)=>{setNewcollection(data)});
  }, [])
  

  return (
    <div className='new-collections'>
       <h1>NEW COLLECTIONS</h1>
       <hr />
       <div className="collections">
         {newcollection.map((item,i)=>{
            return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>  
         })}
       </div>
    </div>
  )
}
