import React from 'react'
import { feess, resultCard } from '../assets'

const ViewResult = ({fetchedData}) => {
  return (
    <section className='px-6 py-4 lg:px-20 min-h-screen flex flex-col justify-center lg:py-10 w-full mx-auto lg:max-w-[1200px] '>
        
        <div className='bg-white p-3 rounded-lg  '>

          <div className='flex flex-col lg:flex-row  lg:items-center justify-between mt-10'>
            <div>
              <img src={feess} alt='' width={80} />
              <p className='font-bold'>...Excellence through service</p>
            </div>
            <div className='mt-6 lg:mt-0'>
              <div className='text-center flex flex-col items-center'>
                <h1 className='text-2xl font-bold'>Contact Us on</h1>
                <p>Website: https://www.fees.com</p>
                <p>Phone: +234 000 000 00</p>
                <p>Address: No.5 Eze street off new guinea</p>

              </div>
            </div>
          </div>
            <h1 className='text-2xl lg:text-3xl text-center font-bold mt-4'>Termly Report For {fetchedData?.student?.fullName?.split(' ')?.shift()}</h1>
            <div>
            <table className='bg-white mt-3'>
            <tr className='text-sm'>
                <td className='w-[30%]'>Registration No.</td>
                <td>{fetchedData?.student?.regNumber}</td>
            </tr>
            <tr className='text-sm'>
                <td className='w-[30%]'>FullName</td>
                <td>{fetchedData?.student?.fullName}</td>
            </tr>
            <tr className='text-sm'>
                <td className='w-[30%]'>Class.</td>
                <td>SS1</td>
            </tr>
            <tr className='text-sm'>
                <td className='w-[30%]'>Term</td>
                <td className='capitalize'>{fetchedData?.payments[0]?.term}</td>
            </tr>
            <tr className='text-sm'>
                <td className='w-[30%]'>Gender</td>
                <td className='capitalize'>{fetchedData?.student?.gender}</td>
            </tr>
            <tr className='text-sm'>
                <td className='w-[30%]'>Session</td>
                <td className='capitalize'>{fetchedData?.payments[0]?.session}</td>
            </tr>
            </table>
            </div>
            <img src={resultCard} alt='result' className='w-full'/>
        </div>
        
    

    </section>
  )
}

export default ViewResult