import { fetchAllReactions } from '@/service/db'
import { create } from 'zustand'

export const useReactionStore = create((set, get) => ({
  reactions: {},
  comments: {},
  fetchReactions: async (imageId, colName) => {
    const data = await fetchAllReactions(imageId, colName);
    const parsed = data.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
    if(colName === 'reactions'){
      set(state => ({
        reactions: {
          ...state.reactions,
          [imageId]: parsed
        }
      }))
    }
    else{
      set(state => ({
        comments: {
          ...state.reactions,
          [imageId]: parsed
        }
      }))
    }
  }
}))
