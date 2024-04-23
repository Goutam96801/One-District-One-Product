import React, { useContext } from 'react'
import { UserContext } from "../App";

const CartCard = ({title,category, image, price, rating}) => {

  return (
      <div className='h-[200px] shadow-2xl m-8 rounded-lg flex flex-row relative'>
        <div className='p-2 overflow-hidden sm:min-w-[200px] lg:min-w-[400px]'>
          <img src={image} className='rounded-lg'/>
        </div>
        <div className=' flex justify-evenly flex-col mx-4'>
          <div className='flex flex-col flex-wrap'>
          <p className='text-2xl font-bold'>{title}</p>
          <p className='text-dark-grey/100 font-gelasio'>{category}</p>
          </div>
          <p className=' font-semibold text-xl'>Price: ₹{price}</p>
          <p className='text-md font-gelasio'>Rating: {rating}/5</p>
        </div>
        <div className='p-4 absolute bottom-2 space-x-2 right-2'>
          <button className='btn-dark'>Buy Now</button>
          <button className='btn-danger'>Remove from cart</button>
        </div>
      </div>
  )
}

export default CartCard
