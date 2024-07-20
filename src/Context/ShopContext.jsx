import React, { createContext, useEffect, useState } from "react";
import all_product from '../Components/Assets/all_product'

export const ShopContext= createContext(null);

const getDefaultCart=()=>{ // put all_products jitne obj with 0 default value (id:0) 32:1 means 32nd id have 1 item added in the cart
    let cart={};
    for(let index=0;index<=all_product.length;index++){
        cart[index]=0;
    }
    return cart;
}


const ShopContextProvider=(props)=>{
    
    const [cartItems,setCartItems]=useState(getDefaultCart()) 
    //  console.log(cartItems);
    const addToCart = (itemId) => {
        setCartItems((prev) => ({
            ...prev,
            [itemId]: (prev[itemId] || 0) + 1 // Ensure that the initial value is handled
        }));
        console.log(cartItems);
    };
    const removeFromCart=(itemId)=>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
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