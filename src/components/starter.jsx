import React from 'react'
import { ButtonLoading } from './ui/ButtonLoading';
import { Spinner } from './ui/spinner';
import { useState } from "react"
import { useNavigate } from 'react-router-dom';


const Starter = () => {
    const navigate = useNavigate()
    const [isActive, setIsActive] = useState(false);

    const handleLoginClick = () => {
        setIsActive(true)   
        setTimeout(() => {
            navigate('/login')
        }, 300)
    }
  return (
    <section className='font-mono'>
        
        <main className='flex justify-center flex-col items-center h-screen'>
            <div className='text-4xl text-blue-400'>
                Welcome to ExploreImg!
            </div>
            <div className='mt-4 mb-4'>
                Explore images, react and comment on images
            </div>
            <div onClick={handleLoginClick}>
                <ButtonLoading loading={isActive}/>
            </div>
        </main>
    </section>
  )
}

export default Starter;