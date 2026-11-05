import React from 'react'


const TopDashCard = ({heading,value,icon,sign}) => {
  return (
    <div className='flex justify-center items-center gap-10 bg-gray-900 w-fit p-3 rounded-xl shadow-lg '>
        <div className='flex flex-col gap-1 text-white'>
        <p className='font-medium'>{heading}</p>
        <p className='font-bold'>{value}</p>
        </div>
      

        <div className='p-2 bg-amber-500 text-black rounded-lg '>
            {icon}
        </div>
    </div>
  )
}

export default TopDashCard