import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export const ShopContext = createContext()

// eslint-disable-next-line react/prop-types
const ShopContextProvider = ({ children }) => {
    const currency = '$';
    const delivery_fee = 10;
    const backendUrl = import.meta.env.VITE_BACKEND_URL?.replace(/\/$/, '')
    const [search,setSearch] = useState('');
    const [showSearch,setShowSearch] =useState(false);
    const [cartItems,setCartItems] = useState({});
    const [products,setProducts] = useState([]);
    const [token,setToken] = useState(null)
    const navigate = useNavigate()

    const api = axios.create({
        baseURL: backendUrl,
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const addToCart = async (itemId,size) => {

        if (!size) {
            toast.error('Select Product size');
            return;
        }

        let cartData = structuredClone(cartItems);
        if(cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            }
            else {
                cartData[itemId][size] = 1;
            }
        }
        else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1
        }
        setCartItems(cartData)

        if (token) {
            try {
                await api.post(`/api/cart/add`, {itemId,size}, {headers:{token}} )
            } catch (error) {
                console.log(error)
                toast.error(error.message)
            }
        }

    }

    const getCartCount = () => {
        let totalCount = 0;
        for(const items in cartItems){
            for(const item in cartItems[items]){
                try {
                    if (cartItems[items][item] > 0) {
                        totalCount += cartItems[items][item]
                    }
                } catch (error) {
                    console.error(error)
                    toast.error(error.message)
                }
            }
        }
        return totalCount;
    }

    const updateQuantity = async (itemId,size,quantity) => {
        let cartData = structuredClone(cartItems);
        cartData[itemId][size] = quantity;
        setCartItems(cartData)

        if (token) {
            try {
                await api.post(`/api/cart/update`, {itemId,size,quantity}, {headers:{token}})
            } catch (error) {
                console.log(error)
                toast.error(error.message)
            }
        }
    }

    const getCartAmount = () => {
        let totalAmount = 0;
        for (const items in cartItems) {
          let itemInfo = products.find((product) => product._id === items);
          if (itemInfo) {
            for (const size in cartItems[items]) {
              try {
                if (cartItems[items][size] > 0) {
                  totalAmount += itemInfo.price * cartItems[items][size];
                }
              } catch (error) {
                console.error(error);
              }
            }
          }
        }
        return totalAmount;
      };
      
      const getProductsData = async () => {
        try{
            const response = await api.get(`/api/product/list`)
            if(response.data.success){
                setProducts(response.data.products)
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        } 
      }

      const getUserCart = async ( token ) => {
        try {
            const response = await api.post(`/api/cart/get`, {}, {headers:{token}})
            if (response.data.success) {
                setCartItems(response.data.cartData)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
      }

      useEffect(()=>{
        getProductsData()
      },[])

      useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (!token && storedToken) {
            setToken(storedToken);
            getUserCart(storedToken);
        }
    }, [])

    const value ={
        products, currency, delivery_fee,
        search,setSearch,showSearch,setShowSearch,
        cartItems ,setCartItems,addToCart,
        getCartCount,updateQuantity,
        getCartAmount, navigate,
        setToken, token: token || null,
        backendUrl
    }

    return (
        <ShopContext.Provider value={value}>
            {children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;

