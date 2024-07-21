import React, { createContext, useEffect, useState } from "react";


export const ShopContext= createContext(null);

const getDefaultCart=()=>{ // put all_products jitne obj with 0 default value (id:0) 32:1 means 32nd id have 1 item added in the cart
    let cart={};
    for(let index=0;index<=300+1;index++){
        cart[index]=0;
    }
    return cart;
}


const ShopContextProvider=(props)=>{

    // getting data from database

const [all_product,setAllProduct]=useState([])

useEffect(()=>{
    fetch('http://localhost:4000/allproducts')
    .then((res)=>res.json())
    .then((data)=>{setAllProduct(data)})

    if(localStorage.getItem('auth-token')){
        fetch('http://localhost:4000/getcart',{
            method:'POST',
            headers:{
                Accept:'application/form-data',
                'auth-token':`${localStorage.getItem('auth-token')}`,
                'Content-Type':'application/json',
            },
            body:"",
        }).then((res)=>res.json())
        .then((data)=>setCartItems(data));
    }
},[])

    
    const [cartItems,setCartItems]=useState(getDefaultCart()) 
    //  console.log(cartItems);
    const addToCart = (itemId) => {
        setCartItems((prev) => ({
            ...prev,
            [itemId]: (prev[itemId] || 0) + 1 // Ensure that the initial value is handled
        }))

        if(localStorage.getItem('auth-token')){
            fetch('http://localhost:4000/addtocart',{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({"itemId":itemId}),
            })
            .then((res)=>res.json())
            .then((data)=>console.log(data));
        }
    };
    const removeFromCart=(itemId)=>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}));
        if(localStorage.getItem('auth-token')){
            fetch('http://localhost:4000/removefromcart',{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({"itemId":itemId}),
            })
            .then((res)=>res.json())
            .then((data)=>console.log(data));
        }
    }

    const getTotalCartAmount=()=>{
        let totalAmount=0;
        for(let item in cartItems){
            if(cartItems[item]>0){
                let itemInfo=all_product.find((product)=>product.id===Number(item))
                totalAmount+=itemInfo.new_price * cartItems[item];
                // console.log("CartItem : ",cartItems[item]); total no of items
                // console.log("Item : ",item); Id of the item.
                // for(key in Object) Object[key]:0,1,2,3...
            }
        }
        return totalAmount;
    }
    
const getCartValue=()=>{
    let totalno=0;
     for(let item in cartItems){
        if(cartItems[item]>0){
            totalno+=cartItems[item];
        }
     }
     return totalno;
}

    // useEffect(() => { // so that our value updates everytime correctly 
    //     console.log(cartItems);
    // }, [cartItems]);

    const contextValue={getCartValue,getTotalCartAmount,all_product,cartItems,addToCart,removeFromCart}; // which can be access by all the compns
    
    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
     )
}

export default ShopContextProvider;