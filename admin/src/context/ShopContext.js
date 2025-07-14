import { createContext } from "react";

export const ShopContext = createContext();
const ShopContextProvider = (props) =>{
     
    const currency = '₹';
   
    const value={
        currency
    }
    return(
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}
export default ShopContextProvider;