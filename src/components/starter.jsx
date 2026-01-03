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
        <section className="font-mono min-h-screen">
            <main className="flex flex-col items-center justify-center min-h-screen px-4 text-center">

                <div className="text-3xl sm:text-4xl md:text-5xl text-blue-400 font-semibold">
                    Welcome to ExploreImg!
                </div>

                <div className="mt-3 mb-6 text-sm sm:text-base md:text-lg text-gray-600 max-w-md">
                    Explore images, react and comment on images
                </div>

                <div onClick={handleLoginClick} className="w-full sm:w-auto">
                    <ButtonLoading loading={isActive} className="w-full sm:w-auto" />
                </div>

            </main>
        </section>

    )
}

export default Starter;