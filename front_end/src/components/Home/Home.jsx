import React, { useEffect } from 'react'
import { FaMouse } from "react-icons/fa";
import "./Home.css"
import Product from './Product';
import MetaData from '../layout/MetaData';
import { getProduct } from '../../actions/productAction';
import {useSelector,useDispatch} from "react-redux"



const product={
  name:"Blue T-Shirt",
  image:[{url:"https://www.beyoung.in/api/cache/catalog/products/full_sleeves_new_update_images/plain_navy_blue_full_sleeves_t-shirt_base_08_03_2023_400x533.jpg"}],
  price:244,
  _id:"1"
}


function Home() {
  const dispatch=useDispatch()

  useEffect(()=>{
       dispatch((getProduct()))
  },[dispatch])

  return (
   <>
   <MetaData title={"ECOMMERCE"}/>
    <div className="banner">
      <p className="">Welcome to Ecommerce</p>
      <h1 className="">FIND AMAZING PRODUCTS BELOW</h1>
      <a className="" href='#container'>
        <button>
          Scroll <FaMouse/>
        </button>
      </a>
    </div>
    <h2 className="homeHeading">Featured Products</h2>
    <div className="container" id='container'>
      <Product product={product}/>
      <Product product={product}/>
      <Product product={product}/>
      <Product product={product}/>
      <Product product={product}/>
      <Product product={product}/>
      <Product product={product}/>
      <Product product={product}/>
      <Product product={product}/>
      <Product product={product}/>

    </div>
   </>
  )
}

export default Home