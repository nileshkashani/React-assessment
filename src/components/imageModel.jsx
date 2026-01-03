import { useEffect } from 'react'
import { useUIStore } from '../store/uiStore'
import ReactionPanel from './reactionPanel'
import { useRealtimeCollection } from './db';
import { CgProfile } from 'react-icons/cg';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@radix-ui/react-hover-card';
import { Button } from './ui/button';

export default function ImageModel() {
  const { focusedImage, clearFocusedImage } = useUIStore()

  const { isClicked } = useUIStore()
  const setIsClicked = useUIStore(s => s.setIsClicked)
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
      {isClicked &&
        <div className="bg-white rounded-md flex flex-col gap-3 p-4">
          <div className="font-bold text-3xl">Comments</div>
          <div>
            {
              commentMap.length === 0 ? (
                <div className="text-gray-500 text-sm italic">No comments yet</div>
              ) : (
                commentMap.map(m => (
                  <div key={m.id} className="flex items-center gap-3 py-1">
                    <HoverCard>
                      <HoverCardTrigger asChild>
                        <span className="inline-flex items-center justify-center cursor-pointer">
                          <CgProfile className="text-3xl" />
                        </span>
                      </HoverCardTrigger>

                      <HoverCardContent className=" bg-white rounded-md p-2 hover:bg-amber-50">
                        {m.userId}
                      </HoverCardContent>
                    </HoverCard>

                    <span className="text-xl">{m.emoji}</span>
                  </div>
                ))
              )
            }
          </div>
          <div>
            <Button className={'bg-blue-400 hover:bg-blue-600'} onClick={() => setIsClicked(false)}>Close</Button>
          </div>
        </div>
      }
    </div>
  )
}
