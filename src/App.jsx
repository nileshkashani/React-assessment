import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import './App.css'

const Starter = lazy(() => import('./components/starter'))
const Login = lazy(() => import('./components/login'))
const Signup = lazy(() => import('./components/signup'))
const Dashboard = lazy(() => import('./components/dashboard'))
const ImageModel = lazy(() => import('./components/imageModel'))

function App() {
  return (
    <>
      <nav className='font-extrabold text-3xl pl-5 pt-3 pb-3'>
        ExploreImg
      </nav>

      <Suspense fallback={<div className="p-6 text-center">Loading...</div>}>
        <ImageModel />

        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Starter />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/dashboard' element={<Dashboard />} />
          </Routes>
        </BrowserRouter>
      </Suspense>
    </>
  )
}

export default App
