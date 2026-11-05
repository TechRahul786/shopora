import React from 'react'
import {
  FaArrowRightLong,
} from "react-icons/fa6";
const HeroCard = ({product,pastelColors}) => {
  return (
    <div className={`flex justify-between items-center p-3 ${pastelColors.bg} rounded-2xl shadow-xl overflow-hidden w-full`}>
        <div className={`flex flex-col justify-center gap-2 w-2/3 ${pastelColors.text}`}>
            <p className='text-xs font-light'>{product.heading}</p>
            <p className='text-2xl font-semibold'>{product.text}</p>
            <div className='flex gap-2 items-center'>
                <p>Shop Now</p>
                <FaArrowRightLong />
            </div>
        </div>
        <div className='1/3'>
            <img src={product.img} alt="" className='size-36' />
        </div>
    </div>
  )
}

export default HeroCard