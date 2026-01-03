import { useInfiniteQuery } from '@tanstack/react-query'
import { useEffect, useRef } from 'react'
import { Spinner } from './ui/spinner'
import { useUIStore } from '../store/uiStore'


function fetchImages({ pageParam = 1 }) {
    return fetch(`https://api.unsplash.com/photos?page=${pageParam}&per_page=12&client_id=${import.meta.env.VITE_UNSPLASH_API_KEY}`)
        .then(res => res.json())
}

export default function Gallery() {
    const observerRef = useRef(null)
    const setFocusedImage = useUIStore(state => state.setFocusedImage)

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        isError
    } = useInfiniteQuery({
        queryKey: ['unsplash-images'],
        queryFn: fetchImages,
        getNextPageParam: (_, pages) => pages.length + 1
    })

    useEffect(() => {
        if (!observerRef.current) return

        const observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
                fetchNextPage()
            }
        })
        // console.log(data)
        observer.observe(observerRef.current)

        return () => observer.disconnect()
    }, [fetchNextPage, hasNextPage, isFetchingNextPage])

    if (isLoading) {
        return (
            <div className="h-[60vh] flex items-center justify-center">
                <Spinner />
            </div>
        )
    }

    if (isError) {
        return <div className="p-10 text-center">Error loading images</div>
    }

    return (
        <div className="p-4 sm:p-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                {data?.pages?.map(page =>
                    page.map(image => (
                        <img
                            key={image.id}
                            src={image.urls.small}
                            className="rounded-lg object-cover w-full h-40 sm:h-52 lg:h-60 cursor-zoom-in"
                            onClick={() => setFocusedImage(image.urls.regular, image.id)}
                        />
                    ))
                )}
            </div>

            <div ref={observerRef} className="h-10" />

            {isFetchingNextPage && <Spinner />}
        </div>

    )
}
