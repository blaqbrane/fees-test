import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import SelectDropdown from '../elements/Select'
import { termOptions,sessionOptions } from '../models'
import BtnLoader from '../elements/Button/loader'

const CheckResult = ({getStudentDetails,fetchedData, isLoading, err, setIsLoggedIn}) => {
    const[regNumber, setRegNumber] = useState()
    const [selectedValue, setSelectedValue] = useState({
        session: '',
        term: '', 
      })

    const handleSelectChange = (selected,title) => {
        setSelectedValue((prevValue) => ({
          ...prevValue, [title] : selected.value
        })) 
      }
    const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault()
       
        const session = selectedValue.session
        const term = selectedValue.term
        if(session.length < 1 || term.length < 1 || regNumber.length < 1){
            return toast.error('session and term is required')
        }else{
            const details = {regNumber,session, term}
            getStudentDetails(details)
        }
      
    }
    const findCompletedPayment = fetchedData?.payments?.find(item => item?.paymentCompleted === true && item?.fee?.tuition === true )
    
    useEffect(() => {
        if(fetchedData?.payments?.length > 0 && findCompletedPayment){
            setIsLoggedIn(true)
            navigate('/view-result')
        }
    },[fetchedData,navigate])
    

  return (
    <section className='px-6 py-4 lg:px-20 lg:py-10 flex flex-col min-h-screen justify-center items-center lg:max-w-[1200px]  lg:mx-auto'>
        
        <form onSubmit={handleSubmit} className=' bg-white rounded-3xl w-full lg:w-[500px] p-4 '>
           
           <h1 className='text-center text-2xl font-bold'>Check Result</h1>
          <div className='flex flex-col mt-3'>
            <label htmlFor='regNumber ' className='font-semibold'>Registration Number</label>
            <input required className='border-2 border-[#f5f2f2] outline-none px-3 py-[8px] rounded-lg mt-1 placeholder:text-[13px]' type='text' placeholder='Enter your reg number...' onChange={(e) => setRegNumber(e.target.value)} name="regNumber" id="regNumber"/> 
          </div>
          <div className='flex flex-col mt-3'>
            <label htmlFor='session' className='font-semibold'>Session</label>
            <SelectDropdown  options={sessionOptions} placeholder='Select session...' onChange = {(selected) => handleSelectChange(selected,'session')}/>
          </div>
          <div className='flex flex-col mt-3'>
            <label htmlFor='term ' className='font-semibold'>Term</label>
          </div>

          
          <SelectDropdown options={termOptions} placeholder='Select term...' onChange = {(selected) => handleSelectChange(selected,'term')}/>
          
          <button className='flex flex-col items-center justify-center text-white w-[100px] py-2 mt-4 rounded-lg bg-[#e28080] '>
            {isLoading ? <BtnLoader/> : 'Submit'}
          </button>
        </form>
    </section>
  )
}

export default CheckResult