import React, { useEffect, useState } from 'react'
import Gallery from './gallery';
import { useRealtimeCollection } from './db';
import { useUIStore } from '@/store/uiStore';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@radix-ui/react-hover-card';
import { Button } from './ui/button';
import { CgProfile } from 'react-icons/cg';
// import RightPanel from './ui/rightPanel';

const Dashboard = () => {
    
    const [sessionStart] = useState(() => new Date())
    const [tab, setTab] = useState("reactions");
    
    const realTimeReactions = useRealtimeCollection("reactions", sessionStart) || [];
    const setFocusedImage = useUIStore(s => s.setFocusedImage)
    const realTimeComments = useRealtimeCollection("comments", sessionStart) || []

    const handleSetTabComments = () => {
        setTab("comments");
    }
    const handleSetTabReactions = () => {
        setTab("reactions");
    }
    return (
        <div className="flex h-full">
            <div className="w-1/2 border-r flex flex-col">
                <div className="flex-1 overflow-y-auto">
                    <Gallery />
                </div>
            </div>

            <div className="w-1/2 p-6">
                <div className='flex '>
                    <div>
                        <Button
                            className={`bg-white text-black hover:bg-amber-50 ${tab === 'reactions' ? 'border-2 border-blue-400' : ''}`}
                         onClick={() => setTab('reactions')}>
                            Reactions
                        </Button>

                    </div>
                    <div>
                        <Button
                            className={`bg-white text-black hover:bg-amber-50 ${tab === 'comments' ? 'border-2 border-blue-400' : ''}`}
                         onClick={() =>setTab('comments')}>
                            Comments
                        </Button>
                    </div>
                </div>
                {tab === 'reactions' ? (
                    realTimeReactions.map((r, i) => (
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
                    ))
                ) : (
                    realTimeComments.map(c => (
                        <div key={c.id} className="flex items-center gap-3 py-1">
                            <HoverCard>
                                <HoverCardTrigger asChild>
                                    <span className="inline-flex items-center justify-center cursor-pointer">
                                        <CgProfile className="text-3xl" />
                                    </span>
                                </HoverCardTrigger>

                                <HoverCardContent className="bg-white rounded-md p-2 hover:bg-amber-50">
                                    {c.userId}
                                </HoverCardContent>
                            </HoverCard>

                            <span className="text-xl">{c.emoji}</span>
                        </div>
                    ))
                )}
            </div>

        </div >
    )
}


export default Dashboard;