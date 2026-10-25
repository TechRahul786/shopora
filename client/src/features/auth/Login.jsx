import React from 'react'

const Login = () => {
  const handleSubmit  = (e) =>{
  
  }
  return (
    <div>
        <form action="/login" method='post'>

          <input type="text" name='emial' />
          <input type="password" name='password' />
          <input type="submit" onClick={(e)=>handleSubmit}/>
        </form>


    </div>
  )
}

export default Login