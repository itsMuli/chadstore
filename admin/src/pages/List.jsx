import { useEffect, useState } from "react";
import { currency } from "../App";
import axios from "axios";
import { toast } from "react-toastify";

const List = ({ token }) => {
  const [list, setList] = useState([]);
  const backendUrl = import.meta.env.VITE_BACKEND_URL?.replace(/\/$/, '')

  // Create axios instance with default config
  const api = axios.create({
    baseURL: backendUrl,
    withCredentials: true, // Important for CORS with credentials
    headers: {
      'Content-Type': 'application/json',
    }
  });

  const fetchList = async () => {
    try {
      const response = await api.get('/api/product/list', {
        headers: token ? { token } : {} // Add token if it exists
      });
      
      console.log('API Response:', response.data); // Better debugging
      
      if (response.data.success && Array.isArray(response.data.products)) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message || "Failed to load products");
      }
    } catch (error) {
      console.error('Fetch Error:', error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Error loading products");
    }
  };

  const removeProduct = async (id) => {
    try {
      if (!token) {
        toast.error("Authentication required");
        return;
      }

      const response = await api.delete('/api/product/remove', {
        headers: { token },
        data: { id }
      });

      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error(response.data.message || "Failed to remove product");
      }
    } catch (error) {
      console.error('Remove Error:', error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Error removing product");
    }
  };

  useEffect(() => {
    fetchList();
  }, [token]); // Add token as dependency if it might change

  return (
    <>
      <p className="mb-2">All Products List</p>
      <div className="flex flex-col gap-2">
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className="text-center">Action</b>
        </div>

        {Array.isArray(list) && list.length > 0 ? (
          list.map((item) => (
            <div
              key={item._id} // Better to use _id instead of index
              className="grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border-b bg-white text-sm"
            >
              <img
                src={item.image?.[0] || "/default-image.jpg"}
                alt={item.name}
                className="h-12 w-12 object-cover"
                onError={(e) => {
                  e.target.src = "/default-image.jpg"; // Fallback if image fails to load
                }}
              />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>
                {currency}
                {item.price}
              </p>
              <p
                onClick={() => removeProduct(item._id)}
                className="text-right md:text-center cursor-pointer text-lg hover:text-red-500"
              >
                X
              </p>
            </div>
          ))
        ) : (
          <p className="text-center py-4 text-gray-500">No products available</p>
        )}
      </div>
    </>
  );
};

export default List;