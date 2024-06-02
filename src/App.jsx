
import { useState,useEffect } from 'react'
import { Suspense,lazy } from 'react'
const CheckResult = lazy(() => import('./components/CheckResult'))
const ViewResult = lazy(() => import('./components/ViewResult')) 
import { toast,ToastContainer } from 'react-toastify'
import { BrowserRouter, Route, Routes, useNavigate, useNavigation } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import 'react-toastify/dist/ReactToastify.css'
import BtnLoader from './elements/Button/loader'
import PageLoader from './elements/pageLoader'
import NotFound from './components/NotFound'

function App() {
  const [fetchedData, setFetchedData] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [err, setErr] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const getStudentDetails = (details) => {
    setIsLoading(true)
    fetch(`${import.meta.env.VITE_API_BASE_URL}/${details?.regNumber}?session=${details?.session}&term=${details?.term}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-ACCESS-KEY': import.meta.env.VITE_API_KEY
      },
    }
    )
    .then(res => res.json()
    )
    .then(data =>{
      const findCompletedPayment = data?.data?.payments?.find(item => item?.paymentCompleted === true && item?.fee?.tuition === true )
      setFetchedData(data?.data)
      setIsLoading(false)
      setErr('')
    
      if(data?.data?.payments?.length < 1){
        toast.error(<h1>Please kindly complete <span className='font-bold capitalize'>{details.session} {details.term}</span> payment to view result</h1>)
      }
      else if(data?.message){
        toast.error(data?.message)
      }else if(!findCompletedPayment){
        toast.error(<h1>Please kindly complete <span className='font-bold capitalize'>{details.session} {details.term}</span> tuition to view result</h1>)
      }
      
    })
    .catch(error => {
      setIsLoading(false)
      toast.error(err === 'Failed to fetch' ? 'You are offline' : err)
      setErr(error.message)
    })
  }

  

  return (
    <BrowserRouter>
   <section className=' '>
    <Routes>
      <Route path='/' exact  element={
      <Suspense fallback={<PageLoader/>}>
       <CheckResult fetchedData={fetchedData}  setIsLoggedIn={setIsLoggedIn} err={err} isLoading={isLoading} getStudentDetails={getStudentDetails}/> 
      </Suspense>
      }/>
      
        <Route path= '/view-result' exact element={
        <ProtectedRoute isAllowed={isLoggedIn} redirectPath={'/'}>
          <Suspense fallback={<PageLoader/>}>
            <ViewResult fetchedData={fetchedData}/>    
          </Suspense>
        </ProtectedRoute>
        }/>
        <Route path="*" element={<NotFound/>}></Route>
    </Routes>
    <ToastContainer/>
   </section>
   </BrowserRouter>
  )
}

export default App
