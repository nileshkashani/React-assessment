import React, {  useState } from 'react'
import Gallery from './gallery';
import { useRealtimeCollection } from './db';
import { useUIStore } from '@/store/uiStore';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@radix-ui/react-hover-card';
import { Button } from './ui/button';
import { CgProfile } from 'react-icons/cg';


const Dashboard = () => {

    const [sessionStart] = useState(() => new Date())
    const [tab, setTab] = useState("gallery");

    const realTimeReactions = useRealtimeCollection("reactions", sessionStart) || [];
    const setFocusedImage = useUIStore(s => s.setFocusedImage)
    const realTimeComments = useRealtimeCollection("comments", sessionStart) || []
   

    function formatTime(ts) {
        if (!ts?.seconds) return ''
        const date = new Date(ts.seconds * 1000)
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }


    return (
        <div className="flex flex-col h-screen">
            <div className="flex justify-center gap-2 border-b p-2 bg-white sticky top-0 z-20">
                {['gallery', 'reactions', 'comments'].map(t => (
                    <Button
                        key={t}
                        className={`bg-white text-black hover:bg-amber-50 ${tab === t ? 'border-2 border-blue-400' : ''
                            } cursor-pointer`}
                        onClick={() => setTab(t)}
                    >
                        {t.toUpperCase()}
                    </Button>
                ))}
            </div>
            <div className="flex-1 overflow-y-auto flex justify-center">

                {tab === 'gallery' && (
                    <div className="w-full">
                        <Gallery />
                    </div>
                )}

                {(tab === 'reactions' || tab === 'comments') && (
                    <div className="w-full sm:w-4/5 md:w-3/4 lg:w-1/2 max-w-3xl px-2">

                        {tab === 'reactions' && (
                            realTimeReactions.map((r, i) => (
                                <div
                                    key={r.id}
                                    className={`flex items-center justify-between px-3 py-2 rounded ${i % 2 === 0 ? "bg-white" : "bg-blue-50"
                                        }`}
                                >
                                    <div className="truncate">
                                        user {r.userId} reacted {r.emoji} to image
                                        <span
                                            onClick={() => setFocusedImage(r.url, r.imageId)}
                                            className="ml-1 cursor-pointer text-blue-600 hover:underline"
                                        >
                                            {r.imageId}
                                        </span>
                                    </div>

                                    <span className="text-xs text-gray-500 whitespace-nowrap">
                                        {formatTime(r.timestamp)}
                                    </span>
                                </div>
                            ))
                        )}

                        {tab === 'comments' && (
                            realTimeComments.map(c => (
                                <div
                                    key={c.id}
                                    className="flex items-center justify-between px-3 py-2 rounded"
                                >
                                    <div className="flex items-center gap-3">
                                        <HoverCard>
                                            <HoverCardTrigger asChild>
                                                <span className="inline-flex items-center justify-center cursor-pointer">
                                                    <CgProfile className="text-3xl" />
                                                </span>
                                            </HoverCardTrigger>

                                            <HoverCardContent className="text-white bg-blue-400 rounded-md p-2 hover:bg-blue-600">
                                                <span className="font-bold text-xl">User</span> {c.userId}
                                            </HoverCardContent>
                                        </HoverCard>

                                        <span className="text-xl">{c.emoji}</span>
                                    </div>

                                    <span className="text-xs text-gray-500 whitespace-nowrap">
                                        {formatTime(c.timestamp)}
                                    </span>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}


export default Dashboard;