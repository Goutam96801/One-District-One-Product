import React, { useContext, useEffect, useState } from "react";
import CartCard from "../components/cart-card.component";
import { UserContext } from "../App";
import axios from "axios";

const Cart = () => {
  const [products, setProducts] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  let discount = 109;
  let deliveryCharges = 55;

  const calculateTotalPrice = () => {
    if (products) {
      const totalPrice = products.reduce((accumulator, product) => {
        return accumulator + product.price;
      }, 0);
      setTotalPrice(totalPrice);
    } else {
      setTotalPrice(0);
    }
  };
  let {
    userAuth: { access_token },
  } = useContext(UserContext);

  const fetchCartItem = async () => {
    await axios
      .post(
        process.env.REACT_APP_SERVER_DOMAIN + "/get-cart-product",
        {},
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      )
      .then((product) => {
        setProducts(product.data);
        console.log(product.data);
      });
  };

  useEffect(() => {
    fetchCartItem();
    calculateTotalPrice();
  }, [access_token]);

  return (
    <div className=" bg-white flex flex-row">
      <div className="w-[75%]">
        {products ? (
          products.map((product) => (
            <CartCard
              key={product._id}
              title={product.name}
              image={product.images[0]}
              price={product.price}
              category={product.category}
              rating={product.activity.rating}
            />
          ))
        ) : (
          <div>
            <p>No item in cart</p>
          </div>
        )}
      </div>
      <div className="w-[25%] fixed right-1 flex justify-center items-start">
        <div className=" bg-grey w-full py-6 mt-10 mx-4 rounded-lg justify-between items-center">
          <div className="">
            <h1 className="font-semibold text-xl px-6">PRICE DETAILS</h1>
            <hr className=" w-full text-dark-grey/50 mt-2" />
          </div>
          <div className="flex flex-col gap-4 my-8">
            <div className="flex justify-between px-6">
              <p>Price ({products?.length} items)</p>
              <p>₹{totalPrice}</p>
            </div>
            <div className="flex justify-between px-6">
              <p>Discount</p>
              <p>-₹{discount}</p>
            </div>
            <div className="flex justify-between px-6">
              <p>Delivery Charges</p>
              <p>₹{deliveryCharges}</p>
            </div>
          </div>
          <hr className=" w-full text-dark-grey/50 mb-2" />

          <div className="flex justify-between px-6">
            <h1 className="text-xl font-semibold">Total Amount</h1>
            <p className="text-xl font-semibold">₹{totalPrice + discount + deliveryCharges}</p>
          </div>
          <hr className=" w-full text-dark-grey/50 my-2" />
          <button className="btn-dark center">Check Out</button>
        </div>
        
      </div>
    </div>
  );
};

export default Cart;
