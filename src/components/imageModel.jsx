import { useEffect } from 'react'
import { useUIStore } from '../store/uiStore'
import ReactionPanel from './reactionPanel'
import { useRealtimeCollection } from './db';
import { CgProfile } from 'react-icons/cg';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@radix-ui/react-hover-card';

export default function ImageModel() {
  const { focusedImage, clearFocusedImage } = useUIStore()

  const realTimeComments = useRealtimeCollection("comments") || []

  const commentsByImage = realTimeComments.reduce((acc, c) => {
    const key = c.imageId
    if (!key) return acc
    if (!acc[key]) acc[key] = []
    acc[key].push(c)
    return acc
  }, {})

  if (!focusedImage) return null
  const commentMap = commentsByImage[focusedImage.imageId] || []



  return (
    <div className="fixed inset-0 bg-black/70 flex items-center gap-3 justify-center z-50 overflow-auto">
      <div className="bg-white rounded-xl p-4 max-w-3xl w-full">
        <img src={focusedImage.imageUrl} className="rounded-lg" />

        <ReactionPanel
          imageId={focusedImage.imageId}
          url={focusedImage.imageUrl}
        />

        <button
          onClick={clearFocusedImage}
          className="mt-4 px-4 py-2 bg-blue-400 text-white rounded cursor-pointer hover:bg-blue-600"
        >
          Close
        </button>
      </div>

      <div className="bg-white rounded-md flex flex-col gap-3">
        <div className="font-bold text-3xl">Comments</div>
        <div>
          {commentMap.map((m, i) => (
            <div key={m.id} className="text-4xl flex">
              <span>
                <HoverCard>
                  <HoverCardTrigger><CgProfile className='cursor-pointer' /></HoverCardTrigger>
                  <HoverCardContent className='cursor-pointer rounded-md p-2 hover:bg-amber-50 '>{m.userId}</HoverCardContent>
                </HoverCard>
              </span><span className='text-xl'>{m.emoji}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
