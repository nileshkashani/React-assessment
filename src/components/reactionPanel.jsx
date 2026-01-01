import { useEffect } from 'react'
import { useReactionStore } from '../store/reactionStore'
import { add } from '@/service/db'

const emojis = ['❤️', '😂', '🔥', '👏', '😮']

export default function ReactionPanel({ imageId }) {
  const reactions = useReactionStore(state => state.reactions[imageId])
  // const addReaction = useReactionStore(state => state.addReaction)
  const fetchReaction = useReactionStore(state => state.fetchReactions)
  const reaction = reactions || []

  const emojiCount = reaction.reduce((acc, r) => {
    acc[r.emoji] = (acc[r.emoji] || 0) + 1
    return acc
  }, {})

  const handleAddReaction = async (emoji) => {
    localStorage.setItem("imageId", imageId);
    localStorage.setItem("emoji", emoji);
    localStorage.setItem("userName", localStorage.getItem("user") || localStorage.getItem("userId"));
    // addReaction(imageId, e, localStorage.getItem("user"))
    await add(imageId, emoji, localStorage.getItem("userId"));
    fetchReaction(imageId);
  }


  useEffect(() => {
    fetchReaction(imageId);
  }, [])

  return (
    <div className="mt-4">
      <div className="flex gap-3 mb-2">
        {Object.entries(emojiCount).map(([emoji, count]) => (
          <span key={emoji} className="text-3xl">
            {emoji} <span className="text-sm">{count}</span>
          </span>
        ))}
      </div>


      <div className="flex gap-2">
        {emojis.map(e => (
          <button
            key={e}
            onClick={() => handleAddReaction(e)}
            className="text-4xl hover:scale-110 transition cursor-pointer"
          >
            {e}
          </button>
        ))}
      </div>
    </div>
  )
}
