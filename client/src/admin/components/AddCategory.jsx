import React, { useState } from 'react'

const AddCategory = () => {
    const [data,setData] = useState({
        name:"",
        description:"",
        image:""
    })

    const handleChange = (e) =>{
        const {name,value} = e.target
        setData((prev)=>({
            ...prev,
            [name]:value
        }))
    }
    const handleSubmit = (e) =>{
        e.preventDefault()
        console.log(data)

    }
  return (
    <div className='p-5'>
        <form className='flex flex-col gap-2' onClick={()=>handleSubmit} method='post' encType='multipart/form-data'>
            <input type="text" name='name' placeholder='Name' onChange={handleChange}/>
            <input type="text" name="description" id="description" placeholder='Description' onChange={handleChange}/>
            <input type="file" name='image' onChange={handleChange}/>
            <button className='p-3 bg-gray-700 rounded-lg w-fit' type='submit'>add Category</button>
        </form>
    </div>
    
  )
}

export default AddCategory