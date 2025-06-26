'use client';
import { Button } from '@helsa/ui/components/button';
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '@helsa/ui/components/carousel';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';
const data = [
  {
    id: 'doctor-1',
    name: 'Ana Pérez',
    description:
      'Especialista en terapia cognitivo-conductual con más de 10 años de experiencia en el tratamiento de la ansiedad y la depresión.',
    experience: '20 años de experiencia',
    image: '/images/doctor-1.jpg',
    href: '#',
    title: 'Dra. Ana Pérez',
  },
  {
    id: 'doctor-2',
    name: 'Luis Gómez',
    description:
      'Especialista en psiquiatría infantil y adolescente, enfocado en el bienestar emocional de los más jóvenes.',
    experience: '15 años de experiencia',
    image: '/images/doctor-2.jpg',
    href: '#',
    title: 'Dr. Luis Gómez',
  },
  {
    id: 'doctor-3',
    name: 'María Rodríguez',
    description: 'Psicóloga clínica con amplia experiencia en terapia familiar y de pareja.',
    experience: '18 años de experiencia',
    image: '/images/doctor-3.jpg',
    href: '#',
    title: 'Dra. María Rodríguez',
  },
  {
    id: 'doctor-4',
    name: 'Carlos Sánchez',
    description: 'Especialista en trastornos del sueño y manejo del estrés en adultos.',
    experience: '12 años de experiencia',
    image: '/images/doctor-4.jpg',
    href: '#',
    title: 'Dr. Carlos Sánchez',
  },
  {
    id: 'doctor-5',
    name: 'Lucía Fernández',
    description: 'Psicóloga experta en mindfulness y terapias de tercera generación.',
    experience: '10 años de experiencia',
    image: '/images/doctor-5.jpg',
    href: '#',
    title: 'Dra. Lucía Fernández',
  },
];

const DoctorCarousel = () => {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (!carouselApi) {
      return;
    }
    const updateSelection = () => {
      setCanScrollPrev(carouselApi.canScrollPrev());
      setCanScrollNext(carouselApi.canScrollNext());
      setCurrentSlide(carouselApi.selectedScrollSnap());
    };
    updateSelection();
    carouselApi.on('select', updateSelection);
    return () => {
      carouselApi.off('select', updateSelection);
    };
  }, [carouselApi]);
  return (
    <div className="flex flex-col gap-6">
      <div className="hidden shrink-0 gap-2 md:flex self-end">
        <Button
          size="icon"
          variant="ghost"
          onClick={() => {
            carouselApi?.scrollPrev();
          }}
          disabled={!canScrollPrev}
          className="disabled:pointer-events-auto"
        >
          <ArrowLeft className="size-5" />
        </Button>
        <Button
          size="icon"
          variant="ghost"
          onClick={() => {
            carouselApi?.scrollNext();
          }}
          disabled={!canScrollNext}
          className="disabled:pointer-events-auto"
        >
          <ArrowRight className="size-5" />
        </Button>
      </div>
      <div className="w-full">
        <Carousel
          setApi={setCarouselApi}
          opts={{
            breakpoints: {
              '(max-width: 768px)': {
                dragFree: true,
              },
            },
            loop: true,
          }}
        >
          <CarouselContent className="ml-0  gap-3">
            {data.map((item) => (
              <CarouselItem key={item.id} className="max-w-[320px] pl-[20px] lg:max-w-[360px] ">
                <a href={item.href} className="group ">
                  <div className="group relative h-full min-h-[27rem] max-w-full overflow-hidden rounded-xl border border-black">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="absolute h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 h-full top-0 bottom-0 left-0 right-0 bg-gradient-to-b from-transparent to-white " />
                    <div className="absolute inset-x-0 bottom-0 flex flex-col items-start p-6 text-foreground md:p-8">
                      <div className="mb-2 pt-4 text-xl font-semibold md:mb-3 md:pt-4 lg:pt-4">{item.name}</div>
                      <div className="mb-8  md:mb-12 lg:mb-9">{item.description}</div>
                      <div className="mb-8  md:mb-12 lg:mb-9">{item.experience}</div>
                    </div>
                  </div>
                </a>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <div className="mt-8 flex justify-center gap-2">
          {data.map((_, index) => (
            <button
              key={index}
              className={`h-2 w-2 rounded-full transition-colors ${
                currentSlide === index ? 'bg-primary' : 'bg-primary/20'
              }`}
              onClick={() => carouselApi?.scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DoctorCarousel;
