import React from 'react'
import loading from './ZhKG.gif'
function Spinner() {
  return (
    <div className='text-center'>
        <img src={loading} alt="loading" />
    </div>
  )
}

export default Spinner