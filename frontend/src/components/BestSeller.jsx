import { useContext, useEffect, useState } from "react"
import { ShopContext } from "../context/ShopContext"
import Title from "./Title"
import ProductsItem from "./ProductsItem"

const bestseller = () => {
    const {products} = useContext(ShopContext)
    const [bestseller, setbestseller] = useState([])


    useEffect(()=>{
        const bestProduct = products.filter((item)=>(item.bestseller));
        setbestseller(bestProduct.slice(0,5))
    },[products])
  return (
    <div className="my-10">
        <div className="text-center text-3xl py-8">
            <Title text1={'BEST'} text2={'SELLERS'}/>
            <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-500">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae libero repellat voluptas sit reiciendis mollitia iste expedita molestias? Assumenda consectetur vero, quod quis deserunt impedit architecto expedita soluta facilis tempore?
            </p>
        </div>
        <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
        {
            bestseller.map((item,index)=>(
                <ProductsItem key={index} id={item._id} name={item.name} image={item.image} price={item.price}/>
            ))
        }
      </div> 
    </div>
  )
}

export default bestseller