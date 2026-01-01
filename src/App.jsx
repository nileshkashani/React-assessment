import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Starter from './components/starter'
import Login from './components/login'
import Signup from './components/signup'
import Dashboard from './components/dashboard'
import Gallery from './components/gallery'
import ImageModel from './components/imageModel'
function App() {
  return (
    <>
      <nav className='font-extrabold text-3xl pl-5 pt-3 pb-3'>
        ExploreImg
      </nav>
      {/* <Gallery /> */}
      <ImageModel />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Starter />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/signup' element={<Signup />}></Route>
          <Route path='/dashboard' element={<Dashboard/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
