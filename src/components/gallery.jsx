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
        status
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

        observer.observe(observerRef.current)

        return () => observer.disconnect()
    }, [fetchNextPage, hasNextPage, isFetchingNextPage])

    if (status === 'loading') {
        return <Spinner/>
    }

    if (status === 'error') {
        return <div className="p-10 text-center">Error loading images</div>
    }

    return (
        <div className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {data?.pages?.map(page =>
                    page.map(image => (

                        <img
                            key={image.id}
                            src={image.urls.small}
                            className="rounded-lg object-cover w-full h-60 cursor-zoom-in scroll-smooth"
                            onClick={() => {
                                setFocusedImage(image);
                            }}
                        />
                    ))
                )}
            </div>

            <div ref={observerRef} className="h-10" />

            {isFetchingNextPage && (
                <Spinner/>
            )}
        </div>
    )
}
