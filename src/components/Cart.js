import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addCart, clearCart, decreaseCart, getTotal, removeFromCart } from './features/cartSlice';



const Cart = () => {
  const cart=useSelector(state=>state.cart);
  const dispatch=useDispatch()
  useEffect(()=>{
    dispatch(getTotal())

  },[cart,dispatch])
  const handleRemove=(cartItem)=>{
    dispatch(removeFromCart(cartItem))

  }
  const handleDecrease=(cartItem)=>{
    dispatch(decreaseCart(cartItem))
  }
const handleIncrease=(cartItem)=>{
  dispatch(addCart(cartItem))
}
const handleClearCart =()=>{
  dispatch(clearCart())
}
  
  return (
   <div className="cart-container">
    <h2>Shopping Cart</h2>
    {cart.cartItems.length===0?(
      <div className="cart-empty">
        <p>Your cart is empty</p>
        <div className="start-shopping">
          <Link to="/">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
  <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
</svg>
          <span>Start Shopping</span>
          </Link>
        </div>
      </div>
    ) :(
      <div>
        <div className="titles">
          <h3 className="product-title">Product</h3>
          <h3 className="price">Price</h3>
          <h3 className="Quantity">Quantity</h3>
          <h3 className="total">Total</h3>

        </div>
        <div className="cart-items">  
          {cart.cartItems?.map(cartItem=>(
            <div className="cart-item" key={cartItem.id}>
              <div className="cart-product">
                <img src={cartItem.image} alt={cartItem.name}/>
                <div>
                  <h3>{cartItem.name}</h3>
                  <p>{cartItem.desc}</p>
                  <button onClick={()=>handleRemove(cartItem)}>Remove</button>
                  </div>
              </div>
              <div className="cart-product-price">${cartItem.price}</div>
              <div className="cart-product-Quantity">
                <button onClick={()=>handleDecrease(cartItem)}>-</button>
                <div className="count">{cartItem.cartQty}</div>
                <button onClick={()=>handleIncrease(cartItem)}>+</button>
              </div>
              <div className="cart-product-total-price">${cartItem.price * cartItem.cartQty}</div>
            </div>
          ))}
        </div>
        <div className="cart-summary">
       <button className='clear-cart' onClick={()=>handleClearCart()}>Clear Cart</button>
       <div className="cart-checkOut">
        <div className="subtotal">
          <span>SubTotal</span>
          <span className='amount'>${cart.cartTotalAmt}</span>
        </div>
        <p>Taxes and Shipping calculated at checkout</p>
        <button>Check Out</button>
        <div className="continue-shopping">
          <Link to="/">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
  <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
</svg>
          <span>Continue Shopping</span>
          </Link>
        </div>
       </div>
        </div>
        </div>

    )}
   </div>
  )
}

export default Cart