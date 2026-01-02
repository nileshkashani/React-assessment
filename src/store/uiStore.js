import { create } from 'zustand'

export const useUIStore = create(set => ({
  focusedImage: null,
  setFocusedImage: (imageUrl, imageId) =>
    set({ focusedImage: { imageUrl, imageId } }),
  clearFocusedImage: () => set({ focusedImage: null })
}))
