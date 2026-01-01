import React from 'react'
import Gallery from './gallery';
// import RightPanel from './ui/rightPanel';

const Dashboard = () => {
    return (
        <div className="flex h-full">
            <div className="w-1/2 border-r flex flex-col">
                <div className="flex-1 overflow-y-auto">
                    <Gallery />
                </div>
            </div>

            <div className="w-1/2 p-6">
                {/* <RightPanel/> */}
            </div>
        </div>
    )
}


export default Dashboard;