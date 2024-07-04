import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCart } from './features/cartSlice';
import { useNavigate } from 'react-router-dom';


const Home = () => {
  const {items}=useSelector((state)=>state.products)
  const dispatch=useDispatch();
  const navigate=useNavigate();

  const handleAddToCart=(product)=>{
    dispatch(addCart(product))
    navigate("/cart")

  }
  return (
    <div className="home-products">
      <h2>New Arrivals</h2>
    <div className='products'>
      {items?.map((product)=> <div id={product.id} className='product'>
        <h3>{product.name}</h3>
        <img src={product.image} alt={product.name}></img>
        <div className="details">
          <span>{product.desc}</span>
          <span className='price'>${product.price}</span>
        </div>
        <button onClick={()=>handleAddToCart(product)}>Add to cart</button>
        </div>
        )}
    </div>
    </div>
  )
}

export default Home