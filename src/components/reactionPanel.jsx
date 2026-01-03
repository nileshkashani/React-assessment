import { useState, useMemo } from 'react'
import { add } from '@/service/db'
import { FaCommentDots } from "react-icons/fa"
import { Input } from './ui/input'
import { Button } from './ui/button'
import { useRealtimeCollection } from './db'
import { useUIStore } from '@/store/uiStore'

const emojis = ['❤️', '😂', '🔥', '👏', '😮']

export default function ReactionPanel({ imageId, url }) {

  const setIsClicked = useUIStore(s => s.setIsClicked)
  const [comment, setComment] = useState("")

  const realTimeReactions = useRealtimeCollection("reactions") || []

  const reactionsForImage = useMemo(() => {
    return realTimeReactions.filter(r => r.imageId === imageId)
  }, [realTimeReactions, imageId])

  const handleSubmit = async () => {
    if (!comment.trim()) return
    setIsClicked(true)
    await add(imageId, comment, localStorage.getItem("userId"), url, "comments")
    setComment("")
  }

  const handleAddReaction = async (emoji) => {
    await add(imageId, emoji, localStorage.getItem("userId"), url, "reactions")
  }

  const emojiCount = useMemo(() => {
    const map = {}

    for (const r of reactionsForImage) {
      map[r.emoji] = (map[r.emoji] || 0) + 1
    }

    return Object.keys(map).map(emoji => ({
      emoji,
      count: map[emoji]
    }))
  }, [reactionsForImage])


  return (
    <div className="flex gap-3">
      <div className="mt-4 flex justify-between w-full">

        <div className="flex flex-col gap-3">
          <div className="flex gap-2">
            {emojis.map(e => (
              <button
                key={e}
                onClick={() => handleAddReaction(e)}
                className="text-2xl md:text-4xl hover:scale-110 transition cursor-pointer"
              >
                {e}
              </button>
            ))}
          </div>

          <div className="flex flex-col">
            <div className="text-xl pt-2">Reactions</div>

            {emojiCount.map(item => (
              <span key={item.emoji} className="text-2xl md:text-4xl">
                {item.emoji} <span className="text-lg">{item.count}</span>
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-col justify-between">
          <div className="flex gap-2">
            <Input
              placeholder="Add comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <Button
              onClick={handleSubmit}
              className="bg-blue-400 hover:bg-blue-600 cursor-pointer"
            >
              Add
            </Button>
          </div>

          <div
            className="flex flex-col justify-center items-end cursor-pointer"
            onClick={() => setIsClicked(true)}
          >
            <div className="text-xl pt-2">Comments</div>
            <FaCommentDots className="text-2xl md:text-4xl text-blue-400 hover:text-blue-600" />
          </div>
        </div>
      </div>
    </div>
  )
}
