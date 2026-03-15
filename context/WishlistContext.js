"use client";

import { createContext, useContext, useState } from "react";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {

const [wishlist,setWishlist] = useState([]);

const toggleWishlist = (product)=>{

const exists = wishlist.find(i => i._id === product._id);

if(exists){
setWishlist(wishlist.filter(i => i._id !== product._id));
}else{
setWishlist([...wishlist,product]);
}

};

const isInWishlist = (id)=>{
return wishlist.some(i => i._id === id);
};

return(

<WishlistContext.Provider
value={{wishlist,toggleWishlist,isInWishlist}}
>

{children}

</WishlistContext.Provider>

);

}

export const useWishlist = ()=> useContext(WishlistContext);