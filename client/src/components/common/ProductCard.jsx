import React from 'react'
import { FaCartShopping } from "react-icons/fa6";
import { FaStar } from "react-icons/fa6";
const ProductCard = () => {
  return (
    <div className='flex flex-col gap-2 w-fit p-1 rounded-md overflow-hidden shadow-md'>
        <img src="https://m.media-amazon.com/images/I/61PNhI8LicL._AC_UY1100_.jpg" alt="" className='size-40 p-2 lg:size-46 rounded-lg'/>
        <div className='p-2'>
            <p className='font-medium text-md'>Men Shirt</p>
        <div className='flex items-center gap-2'>
            <FaStar className='size-4 text-amber-500'/>
            <p className='font-medium text-md'>4.6</p>
        </div>
        <div className='flex justify-between items-center'>
            <p className='font-medium text-md text-red-800'>Rs 2500</p>
            <div className='rounded-full bg-green-900 p-2'>
                <FaCartShopping className='text-white'/>
            </div>
        </div>
        </div>
    </div>
  )
}

export default ProductCard