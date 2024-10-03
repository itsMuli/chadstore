import  { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductsItem from './ProductsItem';

const LatestCollection = () => {
    const {products} = useContext(ShopContext);
    const [latestProducts,setLatestProducts] = useState([])

    useEffect(()=>{
      setLatestProducts(products.slice(0,10))
    },[products])

  return (
    <div className='my-10'>
      <div className='text-center py-8 text-3xl'>
        <Title text1={'LATEST'}  text2={'COLLECTIONS'}/>
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-500'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti sequi optio adipisci repudiandae. Accusamus ad impedit perferendis molestiae adipisci laborum. Illum, alias? Fugit illo ipsa tenetur reiciendis quisquam eaque illum.
        </p>
      </div>
      <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
        {
          latestProducts.map((item,index)=>(
            <ProductsItem key={index} id={item._id} image={item.image} name={item.name} price={item.price}/>
          ))
        }
      </div> 
    </div>
  )
}

export default LatestCollection