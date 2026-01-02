import React, { useEffect } from 'react'
import Gallery from './gallery';
import { useRealtimeCollection } from './db';
import { useUIStore } from '@/store/uiStore';
// import RightPanel from './ui/rightPanel';

const Dashboard = () => {
    const realTimeReactions = useRealtimeCollection("reactions") || [];
    const setFocusedImage = useUIStore(s => s.setFocusedImage)
    return (
        <div className="flex h-full">
            <div className="w-1/2 border-r flex flex-col">
                <div className="flex-1 overflow-y-auto">
                    <Gallery />
                </div>
            </div>

            <div className="w-1/2 p-6">
                {realTimeReactions.map((r, i) => (
                    <div
                        key={r.id}
                        className={`flex items-center px-2 py-1 ${i % 2 === 0 ? "bg-white" : "bg-blue-50"
                            }`}
                    >
                        user {r.userId} reacted {r.emoji} to image{" "}
                        <span
                            onClick={() => setFocusedImage(r.url, r.imageId)}
                            className="ml-1 cursor-pointer text-blue-600 hover:underline"
                        >
                            {r.imageId}
                        </span>
                    </div>
                ))}
            </div>


        </div>
    )
}


export default Dashboard;