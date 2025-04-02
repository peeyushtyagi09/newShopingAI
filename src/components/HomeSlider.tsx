import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const slides = [
  {
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1200&h=600',
    title: 'Summer Collection',
    description: 'Discover our latest summer styles',
    link: '/category/summer'
  },
  {
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=1200&h=600',
    title: 'Fashion Week Special',
    description: 'Exclusive designs from top brands',
    link: '/category/fashion'
  },
  {
    image: 'https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?auto=format&fit=crop&q=80&w=1200&h=600',
    title: 'New Arrivals',
    description: 'Be the first to shop new trends',
    link: '/category/new'
  }
];

interface HomeSliderProps {
  onCategorySelect: (category: string) => void;
}

export function HomeSlider({ onCategorySelect }: HomeSliderProps) {
  const handleSlideClick = (category: string) => {
    const formattedCategory = category.replace('/category/', '');
    onCategorySelect(formattedCategory);
  };

  return (
    <div className="relative mb-8 rounded-xl overflow-hidden">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{ delay: 5000 }}
        pagination={{ clickable: true }}
        navigation
        loop
        className="h-[400px] rounded-xl"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <button 
              onClick={() => handleSlideClick(slide.link)}
              className="relative h-full w-full focus:outline-none"
            >
              <div className="relative h-full w-full group cursor-pointer">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                  <div className="text-white p-8 transform transition-transform duration-300 group-hover:translate-y-[-10px]">
                    <h2 className="text-4xl font-bold mb-2">{slide.title}</h2>
                    <p className="text-xl">{slide.description}</p>
                  </div>
                </div>
              </div>
            </button>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}