import React from "react";
import { Link } from "react-router-dom";

function ProductCard({ product }) {
  let {
    product_id: id,
    name,
    images,
    category,
    price,
    activity: { rating },
  } = product;

//   let {username, state, pincode } = vendor;

  return (
    <div className="p-4 w-[300px] h-auto bg-dark-grey/10 rounded-lg">
      <Link to={`/product/${id}`} className="flex flex-col gap-2">
        <img
          src={images[0]}
          alt=""
          height={120}
          width={160}
          className=" aspect-[5/3] object-cover rounded-lg border"
        />
        <h1 className="text-2xl p-2 text-wrap font-bold text-center ">{name}</h1>
        <div className="flex items-center justify-between text-sm">
            <p className="text-xl font-semibold">₹{price}</p>
          <div className="flex items-center gap-0.5">
            
            <i class="fi fi-ss-star"></i>
            <i class="fi fi-ss-star"></i>
            <i class="fi fi-ss-star"></i>
            <i class="fi fi-rs-star"></i>
            <i class="fi fi-rs-star"></i>
          </div>
        </div>
        <div className="flex items-center flex-row justify-between gap-2 p-1">
          <button className="btn-dark">Add to Cart</button>
          <button className="btn-dark">Buy Now</button>
        </div>
      </Link>
    </div>
  );
}

export default ProductCard;
