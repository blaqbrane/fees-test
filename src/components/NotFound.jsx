import React from 'react'

const NotFound = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
        <h1 className='text-3xl text-white'>Page Not Found</h1>
        <a className='px-4 bg-white py-2 rounded-lg mt-3' href='/'>Go back to home</a>
    </div>
  )
}

export default NotFound