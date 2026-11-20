import React from 'react'
import { FaCartShopping } from "react-icons/fa6";
import { FaStar } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
const ProductCard = ({item}) => {
    const navigate = useNavigate()
    const clickHandle = (id) =>{
        navigate(`product-details/${id}`)
    }
  return (
    <div className='flex flex-col gap-2 w-fit p-1 rounded-md overflow-hidden shadow-md'>
        <img src={item.image} alt=""  className='size-40 p-2 lg:size-46 rounded-lg cursor-pointer' onClick={()=>clickHandle(item._id)}/>
        <div className='p-2'>
            <p className='font-medium text-md cursor-pointer hover:text-blue-500' onClick={()=>clickHandle(item._id)}>{item.name}</p>
        <div className='flex items-center gap-2'>
            <FaStar className='size-4 text-amber-500'/>
            <p className='font-medium text-md'>{item.ratings}</p>
        </div>
        <div className='flex justify-between items-center'>
            <p className='font-medium text-md text-red-800'>Rs{item.price}</p>
            <div className='rounded-full bg-green-900 p-2'>
                <FaCartShopping className='text-white'/>
            </div>
        </div>
        </div>
    </div>
  )
}

export default ProductCard