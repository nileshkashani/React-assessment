import { useEffect } from 'react'
import { useUIStore } from '../store/uiStore'
import ReactionPanel from './reactionPanel'


export default function ImageModel() {
  const { focusedImage, clearFocusedImage } = useUIStore()
  if(focusedImage == null){
    return;
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 overflow-auto">
      <div className="bg-white rounded-xl p-4 max-w-3xl w-full">
        <img
          src={focusedImage.imageUrl}
          className="rounded-lg"
        />

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
    </div>
  )
}
