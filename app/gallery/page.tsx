'use client'
import { createBrowserSupabaseClient } from '@/app/lib/supabaseClient'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import dynamic from 'next/dynamic'

// Dynamically import heavy carousel library only when needed
const Slider = dynamic(() => import('react-slick'), {
  ssr: false,
  loading: () => <div className="animate-pulse bg-gray-300 h-96 md:h-[500px] rounded-xl" />
})

// Dynamically load carousel styles only when component mounts
const useSlickStyles = () => {
  useEffect(() => {
    import('slick-carousel/slick/slick.css')
    import('slick-carousel/slick/slick-theme.css')
  }, [])
}

export default function GalleryPage() {
  const [images, setImages] = useState<any[]>([])
  const [mounted, setMounted] = useState(false)
  const supabase = createBrowserSupabaseClient()

  useSlickStyles()

  useEffect(() => {
    const fetchImages = async () => {
      const { data } = await supabase.from('gallery_images').select('*').order('sort_order')
      setImages(data || [])
      setMounted(true)
    }
    fetchImages()
  }, [])

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    pauseOnHover: true,
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Our Work Gallery</h1>
      <div className="bg-black rounded-xl overflow-hidden shadow-2xl min-h-96 md:min-h-[500px] flex items-center justify-center">
        {images.length === 0 ? (
          <div className="text-center py-12 text-white">Loading gallery...</div>
        ) : (
          mounted && (
            <Slider {...settings}>
              {images.map((img) => (
                <div key={img.id} className="relative h-96 md:h-[500px]">
                  <Image
                    src={img.image_url}
                    alt={img.title || 'Workshop photo'}
                    fill
                    className="object-cover w-full h-full"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 56rem"
                    loading="lazy"
                    quality={75}
                  />
                  {img.title && (
                    <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-2 text-center">
                      {img.title}
                    </div>
                  )}
                </div>
              ))}
            </Slider>
          )
        )}
      </div>
    </div>
  )
}