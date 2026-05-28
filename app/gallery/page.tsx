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
    <div className="max-w-5xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-10 text-center">
        <p className="text-sm uppercase tracking-[0.36em] text-sky-600 font-semibold mb-3">Gallery</p>
        <h1 className="text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">Our Work Gallery</h1>
        <p className="mt-4 max-w-2xl mx-auto text-slate-600">Browse recent repair and diagnostic work to see the quality and care we bring to every vehicle.</p>
      </div>

      <div className="overflow-hidden rounded-[32px] border border-slate-200 shadow-2xl bg-white">
        <div className="border-b border-slate-200 bg-slate-950 px-6 py-5">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-sky-400 font-semibold">Work showcase</p>
              <p className="mt-1 text-slate-300">A curated selection of jobs completed by Auto Doctor.</p>
            </div>
            <div className="rounded-full bg-slate-800 px-4 py-2 text-sm text-slate-200">Swipe or click through the gallery</div>
          </div>
        </div>

        <div className="bg-slate-950 min-h-[540px] flex items-center justify-center">
          {images.length === 0 ? (
            <div className="animate-pulse rounded-[28px] bg-slate-900 p-10 text-center shadow-xl shadow-slate-950/30">
              <div className="mx-auto mb-6 h-8 w-48 rounded-full bg-slate-700"></div>
              <div className="mx-auto mb-3 h-4 w-72 rounded-full bg-slate-700"></div>
              <div className="mx-auto h-4 w-56 rounded-full bg-slate-700"></div>
            </div>
          ) : (
            mounted && (
              <Slider {...settings}>
                {images.map((img) => (
                  <div key={img.id} className="relative h-[420px] sm:h-[520px] md:h-[560px]">
                    <Image
                      src={img.image_url}
                      alt={img.title || 'Workshop photo'}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 56rem"
                      loading="lazy"
                      quality={75}
                    />
                    {img.title && (
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-950/90 to-transparent px-5 py-4 text-center text-sm font-medium text-white">
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
    </div>
  )
}