import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import './App.css'
import ProtectedRoute from './components/protectedRoute'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { CgProfile } from "react-icons/cg";
import { logout } from './service/authService'
import { useAuth } from './context/authContext'
import { Spinner } from './components/ui/spinner'

const Starter = lazy(() => import('./components/starter'))
const Login = lazy(() => import('./components/login'))
const Signup = lazy(() => import('./components/signup'))
const Dashboard = lazy(() => import('./components/dashboard'))
const ImageModel = lazy(() => import('./components/imageModel'))

function App() {
  const { user, loading } = useAuth()
  return (
    <>
      <nav className='font-extrabold text-3xl '>
        <div className='flex justify-between'>
          <div className='pl-5 pt-3 pb-3'>
            ExploreImg
          </div>
          {user && (
            <div className="pr-5 pt-3 pb-3">
              <HoverCard openDelay={0} closeDelay={0}>
                <HoverCardTrigger asChild>
                  <button className="inline-flex items-center justify-center">
                    <CgProfile className="cursor-pointer text-3xl" />
                  </button>
                </HoverCardTrigger>

                <HoverCardContent
                  className="bg-white rounded-md shadow-lg p-2"
                  sideOffset={6}
                >
                  <button
                    onClick={logout}
                    className="w-full text-left cursor-pointer rounded-md p-2 hover:bg-amber-50"
                  >
                    Logout
                  </button>
                </HoverCardContent>
              </HoverCard>
            </div>
          )}


        </div>
      </nav>

      <Suspense fallback={<div className="flex justify-center items-center"><Spinner /></div>}>
        <ImageModel />

        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Starter />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

          </Routes>
        </BrowserRouter>
      </Suspense>
    </>
  )
}

export default App
