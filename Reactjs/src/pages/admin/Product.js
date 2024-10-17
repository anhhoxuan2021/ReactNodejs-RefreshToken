import React, {useEffect,useState} from "react";
import ComponentProduct from "../../components/ComponentProduct";

import {new_product} from '../../api/productService'

const Product =() =>{
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const handleCreateProduct = async (e) => {
        e.preventDefault();
        const productData = { name, price, description };
    
        try {
            new_product({name:name,price:price,description:description})
        
        } catch (error) {
          
        }
      };

  return(
    <form onSubmit={handleCreateProduct}>
    <input type="text" placeholder="Product Name" value={name} onChange={(e) => setName(e.target.value)} />
    <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
    <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
    <button type="submit">Create Product</button>
  </form>
  )
}

export default Product