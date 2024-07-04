import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const cartSlice=createSlice({
    name:"cart",
    initialState:{
        cartItems:localStorage.getItem("cartItems")?JSON.parse(localStorage.getItem("cartItems")):[],
        cartTotalQty:0,
        cartTotalAmt:0

    },
    reducers:{
        addCart(state,action){
            const itemIndex=state.cartItems.findIndex((item)=>item.id===action.payload.id)
            if(itemIndex >=0){
                state.cartItems[itemIndex].cartQty+=1
                toast.info(`Increased ${state.cartItems[itemIndex].name }  product quantity`,{
                    position:"top-right"
                })
            }else{
                const tempProduct={...action.payload,cartQty:1}
                state.cartItems.push(tempProduct)
                toast.success(`${action.payload.name} added to cart`,{
                    position:"top-right"
                })
            }
            localStorage.setItem("cartItems",JSON.stringify(state.cartItems))

        },
        removeFromCart(state,action){
           const nextCartItems= state.cartItems.filter(
                    cartItem=>cartItem.id!==action.payload.id
            )
            state.cartItems=nextCartItems;
            localStorage.setItem("cartItems",JSON.stringify( state.cartItems))
             toast.error(`${action.payload.name} removed from cart`,{
                    position:"top-right"
             })
        },
        decreaseCart(state,action){
            const itemIndex=state.cartItems.findIndex(cartItem=>cartItem.id===action.payload.id)
            if(state.cartItems[itemIndex].cartQty>1){
                state.cartItems[itemIndex].cartQty -=1
                toast.info(`Decreased ${action.payload.name} cart Quantity`,{
                    position:"top-right"
             })
            }
            else if(state.cartItems[itemIndex].cartQty===1){
                const nextCartItems= state.cartItems.filter(
                    cartItem=>cartItem.id!==action.payload.id
            )
            state.cartItems=nextCartItems;
            
             toast.error(`${action.payload.name} removed from cart`,{
                    position:"top-right"
             })
            }
            localStorage.setItem("cartItems",JSON.stringify( state.cartItems))
        },
        clearCart(state,action){
            state.cartItems=[]
            toast.error(`cart Cleared`,{
                position:"top-right"
         })
         localStorage.setItem("cartItems",JSON.stringify( state.cartItems))
        },
        getTotal(state,action){
           let {total,qty}= state.cartItems.reduce((cartTotal,cartItem)=>{ 
                const {price,cartQty}=cartItem;
                const itemTotal=price*cartQty
                cartTotal.total+=itemTotal
                cartTotal.qty +=cartQty
                return cartTotal
            },{
                total:0,
                qty:0
            })
            state.cartTotalQty=qty
            state.cartTotalAmt=total
        }

    }

}
    
)

export const {addCart,removeFromCart,decreaseCart,clearCart,getTotal} = cartSlice.actions;
export default cartSlice.reducer; 