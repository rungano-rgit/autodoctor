'use client'
import { createBrowserSupabaseClient } from '@/app/lib/supabaseClient'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

export default function GalleryPage() {
  const [images, setImages] = useState<any[]>([])
  const supabase = createBrowserSupabaseClient()

  useEffect(() => {
    const fetchImages = async () => {
      const { data } = await supabase
        .from('gallery_images')
        .select('*')
        .order('sort_order', { ascending: true })
      setImages(data || [])
    }
    fetchImages()
  }, [])

  const settings = {
    dots: true,                 // show dot indicators
    infinite: true,             // loop infinitely
    speed: 500,                // transition speed (ms)
    slidesToShow: 1,           // one image at a time
    slidesToScroll: 1,
    autoplay: true,            // auto slide
    autoplaySpeed: 3000,       // 3 seconds per image
    arrows: true,              // show next/prev buttons
    pauseOnHover: true,
    adaptiveHeight: true,
  }

  if (images.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        Loading gallery...
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Our Work Gallery</h1>
      <div className="bg-black rounded-xl overflow-hidden shadow-2xl">
        <Slider {...settings}>
          {images.map((img) => (
            <div key={img.id} className="relative h-96 md:h-[500px]">
              <Image
                src={img.image_url}
                alt={img.title || 'Workshop photo'}
                fill
                className="object-contain"
                priority={false}
              />
              {img.title && (
                <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-2 text-center">
                  {img.title}
                </div>
              )}
            </div>
          ))}
        </Slider>
      </div>
      {images.length < 2 && (
        <p className="text-center text-sm text-gray-400 mt-4">
          Add more images to enable looping.
        </p>
      )}
    </div>
  )
}