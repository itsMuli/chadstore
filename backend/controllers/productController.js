import connectCloudinary from "../config/cloudinary.js";
import productModel from '../models/productModels.js';
import { v2 as cloudinary } from "cloudinary";

connectCloudinary();

const addProduct = async (req, res) => {
    try {
        const { name, description, price, category, subCategory, sizes, bestseller } = req.body;

        // Handle images dynamically
        const image1 = req.files && req.files.image1 ? req.files.image1[0] : null;
        const image2 = req.files && req.files.image2 ? req.files.image2[0] : null;
        const image3 = req.files && req.files.image3 ? req.files.image3[0] : null;
        const image4 = req.files && req.files.image4 ? req.files.image4[0] : null;

        // Filter out null images
        const images = [image1, image2, image3, image4].filter(item => item !== null);

        // Allow 1, 2, or up to 4 images
        if (images.length === 0 || images.length > 4) {
            return res.status(400).json({
                success: false,
                message: 'Please upload between 1 to 4 images.'
            });
        }

        // Upload images to Cloudinary
        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
                return result.secure_url;
            })
        );

        const productData = {
            name,
            description,
            category,
            price: Number(price),
            subCategory,
            bestseller: bestseller === "true" ? true : false,
            sizes: JSON.parse(sizes),
            image: imagesUrl,
            date: Date.now()
        }

        console.log(productData)

        const product = new productModel(productData);
        await product.save()

        // Response with uploaded images
        res.json({
            success: true,
            message: 'Product added successfully',
            images: imagesUrl
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const listProduct = async (req,res) => {
    try{
        const products = await productModel.find({});
        res.json({
            success:true,
            products
        })
    } catch(error){
        console.log(error)
        res.json({ 
            success: false, 
            message: error.message
        })
    }
}

const removeProduct = async (req, res) => {
    try {
      const { id } = req.body;
      if (!id) {
        return res.status(400).json({
          success: false,
          message: "Product ID is required",
        });
      }
  
      const product = await productModel.findByIdAndDelete(id);
  
      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }
  
      res.json({
        success: true,
        message: "Product Removed",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
  

const singleProduct = async (req,res) => {
    try{
        const { productId } = req.body
        const product = await productModel.findById(productId)
        res.json({
            success:true,
            product
        })
    } catch(error){
        console.log(error)
        res.json({ 
            success: false, 
            message: error.message
        })
    }
}

export { listProduct,addProduct,singleProduct,removeProduct }