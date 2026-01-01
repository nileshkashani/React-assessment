import { create } from 'zustand'

export const useUIStore = create(set => ({
  focusedImage: null,
  setFocusedImage: image => set({ focusedImage: image }),
  clearFocusedImage: () => set({ focusedImage: null })
}))
