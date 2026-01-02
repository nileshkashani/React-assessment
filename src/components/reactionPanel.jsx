import { useEffect, useState } from 'react'
import { useReactionStore } from '../store/reactionStore'
import { add } from '@/service/db'
import { FaCommentDots } from "react-icons/fa";
import { Input } from './ui/input';
import { Button } from './ui/button';

const emojis = ['❤️', '😂', '🔥', '👏', '😮']

export default function ReactionPanel({ imageId, url }) {

  const [comment, setComment] = useState("");
  const fetchReaction = useReactionStore(state => state.fetchReactions)

  const reactions = useReactionStore(state => state.reactions[imageId])
  const reaction = reactions || []

  const comments = useReactionStore(s => s.comments[imageId])
  const commentMap = comments || []


  const emojiCount = reaction.reduce((acc, r) => {
    acc[r.emoji] = (acc[r.emoji] || 0) + 1
    return acc
  }, {})

  const handleSubmit = async () => {
    await add(imageId, comment, localStorage.getItem("userId"), url, "comments");
    fetchReaction(imageId, 'comments');
  }

  const handleAddReaction = async (emoji) => {
    await add(imageId, emoji, localStorage.getItem("userId"), url, "reactions");
    fetchReaction(imageId, 'reactions');
  }


  useEffect(() => {
    fetchReaction(imageId, "reactions");
  }, [])

  return (
    <div className="mt-4 flex justify-between">
      <div className='flex flex-col justify-between'>
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
        <div className='flex flex-col'>
          <div className='text-xl pt-2'>
            reactions
          </div>

          {Object.entries(emojiCount).map(([emoji, count]) => (
            <span key={emoji} className="text-4xl">
              {emoji} <span className="text-lg">{count}</span>
            </span>
          ))}
        </div>

      </div>
      <div className='flex flex-col justify-between'>

        <div className='flex gap-2'>
          <Input placeholder="add comment" onChange={(e) => setComment(e.target.value)} />
          <Button onClick={handleSubmit}>add</Button>
        </div>
        <div className='flex flex-col justify-center items-center'>
          <div className='text-xl pt-2'>
            comments
          </div>
          {commentMap.map((m, i) => (
            <div key={`${m.emoji}-${i}`} className="text-4xl">
              {m.emoji}
            </div>
          ))}

        </div>
      </div>



    </div>
  )
}
