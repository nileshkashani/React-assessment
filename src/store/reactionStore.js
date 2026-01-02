import { fetchAllReactions } from '@/service/db'
import { create } from 'zustand'

export const useReactionStore = create((set, get) => ({
  reactions: {},
  fetchReactions: async (imageId) => {
    const data = await fetchAllReactions(imageId);
    const parsed = data.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
    console.log("parsed: ", parsed)
    set(state => ({
      reactions: {
        ...state.reactions,
        [imageId]: parsed
      }
    }))
  }
}))
