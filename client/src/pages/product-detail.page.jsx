import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../App";
import {Toaster, toast} from "react-hot-toast";

export const productStructure = {
    name:"",
    category:"",
    description:"",
    images:[],
    price:"",
    quantity:"",
    vendor:{personal_info: {}},
    addedAt:"",
    activity:{total_buys:"", total_views:"", rating:""}
}

function ProductDetailPage() {

    let { userAuth: {access_token}} = useContext(UserContext)
  let { product_id } = useParams();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [product, setProduct] = useState(productStructure);

  const goToPrevious = () => {
    const isFirstImage = currentIndex === 0;
    const newIndex = isFirstImage ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastImage = currentIndex === images.length - 1;
    const newIndex = isLastImage ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  let {
    name,
    category,
    description,
    images,
    price,
    quantity,
    // vendor:{personal_info: { username, state, pincode }},
    addedAt,
    activity:{total_buys, total_views, rating}
  } = product;

  const fetchProduct = () => {
    axios.post(process.env.REACT_APP_SERVER_DOMAIN + "/get-product", {product_id})
    .then(({data: {product}}) => {
        setProduct(product);
    })
    .catch((err) => {
        console.log(err);
    })
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const handleCartBtn = (e) =>{
    e.preventDefault();

    axios.post(process.env.REACT_APP_SERVER_DOMAIN + "/add-to-cart", {product_id},{
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })
    .then(() => {
      toast.success("product added to cart");
    })
    .catch((error) => {
      toast.error(error);
    });
  }


  return (
    <div className="grid md:grid-cols-2 gap-6 lg:gap-12 items-start max-w-6xl px-4 mx-auto py-6">
      <Toaster/>
      <div className=" relative max-h-[600px] min-h-[500px] overflow-hidden drop-shadow-2xl shadow-dark-grey rounded-lg bg-grey">
        <div className=" top-[50%] -translate-y-[50%] w-full absolute">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Slide ${index}`}
              className={`border w-full border-gray-200 rounded-lg dark:border-gray-800 ${
                index === currentIndex ? "opacity-100" : "opacity-0 absolute"
              } `}
            />
          ))}
        </div>
        <div className="flex justify-between absolute top-1/2 w-full transform -translate-y-1/2 px-3">
          <button
            onClick={goToPrevious}
            className="bg-rgbagrey rounded-full p-2 text-black text-xl bg-white hover:scale-105 duration-500"
          >
            &#8592;
          </button>
          <button
            onClick={goToNext}
            className="bg-rgbagrey rounded-full p-2 text-black text-xl bg-white focus:outline-none focus:ring-2 focus:ring-gray-300 hover:scale-105 duration-500"
          >
            &#8594;
          </button>
        </div>
      </div>

      <div className="grid gap-4 md:gap-10 items-start">
        <div className="grid gap-4">
          <h1 className="font-bold text-3xl lg:text-4xl">{name}</h1>
          <div>
            <p>{description}</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-0.5">
              <i className="fi fi-ss-star"></i>
              <i className="fi fi-ss-star"></i>
              <i className="fi fi-ss-star"></i>
              <i className="fi fi-rs-star"></i>
              <i className="fi fi-rs-star"></i>
            </div>
            <div className="text-4xl font-bold">₹{price}</div>
          </div>
          <div className="text-red font-bold text-xl">{category}</div>
        </div>
        <div className="grid gap-4 md:gap-10">
          <div className="grid gap-2">
            <p>Available products: {quantity}</p>
            <label className="font-medium text-base">Quantity</label>

            <select className="flex p-2 border-2 w-20 rounded-lg border-dark-grey/30 whitespace-nowrap ">
              <option value="1">
                1
              </option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
          <div className="flex gap-6 mt-6">
            <button className="btn-dark" onClick={handleCartBtn}>Add to cart</button>
            <button className="btn-dark">Buy Now</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;
