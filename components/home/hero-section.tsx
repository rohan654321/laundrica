'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const youtubeContainerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<any>(null);

  const heroSlides = [
    {
      tag: 'LAUNDRY SERVICE THAT CARES FOR EVERY DETAIL',
      title: 'Freshness That',
      highlight: 'Lasts',
      subtitle:
        'Advanced cleaning methods, gentle detergents, and expert care to keep your clothes fresh longer.',
      cta: 'Schedule a Pickup',
      secondaryCta: 'View Pricing',
    },
    {
      tag: 'PREMIUM LAUNDRY SERVICE IN DUBAI, MADE EASY',
      title: 'Convenience at Your',
      highlight: 'Fingertips',
      subtitle:
        'Enjoy free pickup and delivery anywhere in Dubai. While you focus on life, we handle your laundry with precision and care',
      cta: 'Book Free Pickup',
      secondaryCta: 'View Pricing',
    },
    {
      tag: 'FAST & RELIABLE LAUNDRY SOLUTIONS',
      title: 'Clean Clothes,',
      highlight: 'Zero Hassle',
      subtitle:
        'We ensure timely service with high-quality cleaning so you never worry about laundry again.',
      cta: 'Get Started',
      secondaryCta: 'Learn More',
    },
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, heroSlides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 8000);
  };

  // Load YouTube API and create player
  useEffect(() => {
    if (!youtubeContainerRef.current) return;
    
    const videoId = '6v2L2UGZJAM';
    
    // Load YouTube IFrame API
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

    // Create player when API is ready
    (window as any).onYouTubeIframeAPIReady = () => {
      playerRef.current = new (window as any).YT.Player(youtubeContainerRef.current, {
        videoId: videoId,
        playerVars: {
          autoplay: 1,
          loop: 1,
          mute: 1,
          controls: 0,
          showinfo: 0,
          rel: 0,
          modestbranding: 1,
          iv_load_policy: 3,
          disablekb: 1,
          playsinline: 1,
          playlist: videoId, // Required for looping
        },
        events: {
          onReady: (event: any) => {
            event.target.playVideo();
            setIsVideoPlaying(true);
          },
          onStateChange: (event: any) => {
            // Loop video when it ends
            if (event.data === (window as any).YT.PlayerState.ENDED) {
              event.target.playVideo();
            }
          },
        },
      });
    };

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
      }
    };
  }, []);

  const togglePlayPause = () => {
    if (playerRef.current) {
      if (isVideoPlaying) {
        playerRef.current.pauseVideo();
      } else {
        playerRef.current.playVideo();
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };

  const toggleMute = () => {
    if (playerRef.current) {
      if (isVideoMuted) {
        playerRef.current.unMute();
      } else {
        playerRef.current.mute();
      }
      setIsVideoMuted(!isVideoMuted);
    }
  };

  return (
    <section className="relative w-full h-[600px] lg:h-[700px] overflow-hidden">
      
      {/* YouTube Background */}
   {/* YouTube Background */}
<div className="absolute inset-0 w-full h-full">

  {/* VIDEO */}
  <div className="absolute inset-0 w-full h-full overflow-hidden">
    <div
      ref={youtubeContainerRef}
      className="absolute top-1/2 left-1/2 w-[177.77vh] h-[56.25vw] min-w-full min-h-full -translate-x-1/2 -translate-y-1/2 pointer-events-none"
    />
  </div>

  {/* ✅ DARK OVERLAY (PUT HERE) */}
  <div className="absolute inset-0 bg-black/50 z-[1]" />

  {/* GRADIENT */}
  <div 
    className="absolute bottom-0 left-0 right-0 pointer-events-none z-[2]"
    style={{
      height: '70%',
      background: 'linear-gradient(to top, #0B3B2F, rgba(11, 59, 47, 0.7), transparent)'
    }}
  />
</div>

      {/* Video Control Buttons */}
      <div 
        className="absolute bottom-6 left-6 z-30 flex gap-3"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={togglePlayPause}
          className="bg-black/50 backdrop-blur-md hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 border border-white/20"
          aria-label={isVideoPlaying ? 'Pause' : 'Play'}
        >
          {isVideoPlaying ? <Pause size={20} /> : <Play size={20} />}
        </motion.button>

        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleMute}
          className="bg-black/50 backdrop-blur-md hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 border border-white/20"
          aria-label={isVideoMuted ? 'Unmute' : 'Mute'}
        >
          {isVideoMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </motion.button>
      </div>

      {/* Clean, Centered Content */}
      <div className="absolute inset-0 z-10">
        <AnimatePresence mode="wait">
          {heroSlides.map(
            (slide, index) =>
              index === currentSlide && (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="flex items-center justify-center h-full"
                >
                  <div className="text-center max-w-5xl mx-auto px-6">
                    
                    {/* Tag */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="mb-6"
                    >
                      <span className="text-[#74C69D] text-sm md:text-base tracking-wider font-medium inline-block max-w-full break-words">
                        {slide.tag}
                      </span>
                    </motion.div>

                    {/* Heading - Properly sized and wrapped */}
                    <motion.h1
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6"
                    >
                      {slide.title}{' '}
                      <span className="text-[#74C69D] whitespace-nowrap">{slide.highlight}</span>
                    </motion.h1>

                    {/* Subtitle - Properly spaced and wrapped */}
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-base md:text-lg text-gray-200 max-w-3xl mx-auto mb-10 leading-relaxed px-4"
                    >
                      {slide.subtitle}
                    </motion.p>

                    {/* Buttons */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="flex gap-4 justify-center flex-wrap"
                    >
                      <Link href="/services">
                        <button className="bg-[#74C69D] hover:bg-[#95D5B2] text-[#0B3B2F] font-semibold px-8 py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-base md:text-lg">
                          {slide.cta}
                        </button>
                      </Link>

                      <Link href="/pricing">
                        <button className="border-2 border-white/30 hover:border-white/50 text-white font-semibold px-8 py-3 rounded-full transition-all duration-300 hover:bg-white/10 text-base md:text-lg">
                          {slide.secondaryCta}
                        </button>
                      </Link>
                    </motion.div>
                  </div>
                </motion.div>
              )
          )}
        </AnimatePresence>
      </div>

      {/* Slide Navigation */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentSlide
                ? 'w-8 h-1 bg-[#74C69D]'
                : 'w-1.5 h-1.5 bg-white/40 hover:bg-white/60'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}