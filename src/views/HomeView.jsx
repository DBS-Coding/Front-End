import { useEffect, useState } from 'react';
import { useKeenSlider } from 'keen-slider/react';
import {
  ChevronLeft,
  ChevronRight,
  Linkedin,
  Github,
  Crown,
  Scroll,
  MessageCircle,
  Users,
  Star,
} from 'lucide-react';
import { motion } from 'framer-motion';
import Layout from '../components/common/Layout';
import { useNavigationPresenter } from '../hooks/navigationutils';
import pakHatta from '../assets/pakhatta.png';
import pakKarno from '../assets/pakkarno.png';
import Leo from '../assets/Leo_Prangs_Tobing.png';

const HomeView = () => {
  const { handleChatNavigation } = useNavigationPresenter();
  const [isHovered, setIsHovered] = useState(false);

  const teamMembers = [
    {
      id: 1,
      name: 'Leo TP',
      role: 'Machine Learning',
      image: Leo,
      linkedin: '#',
      github: '#',
    },
    {
      id: 2,
      name: 'Rafi Alisba GS',
      role: 'UI UX & Front End Developer',
      image: 'https://avatars.githubusercontent.com/u/189972723?s=96&v=4',
      linkedin: '#',
      github: '#',
    },
    {
      id: 3,
      name: 'Nanda Safiq',
      role: 'Back-End Developer',
      image:
        'https://ndav.my.id/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fndav.f8a2254e.png&w=384&q=75',
      linkedin: '#',
      github: '#',
    },
    {
      id: 4,
      name: 'Sincan',
      role: 'Front-End Developer',
      image: 'https://avatars.githubusercontent.com/u/67074459?v=4',
      linkedin: '#',
      github: '#',
    },
    {
      id: 5,
      name: 'Khoirunnisa',
      role: 'Machine Learning',
      image: 'https://avatars.githubusercontent.com/u/173612032?s=96&v=4',
      linkedin: '#',
      github: '#',
    },
    {
      id: 6,
      name: 'Ricchie',
      role: 'Machine Learning',
      image: 'https://avatars.githubusercontent.com/u/94582518?s=96&v=4',
      linkedin: '#',
      github: '#',
    },
  ];

  const [sliderRef, instanceRef] = useKeenSlider({
    slides: {
      perView: 1,
      spacing: 16,
    },
    breakpoints: {
      '(min-width: 640px)': {
        slides: {
          perView: 2,
          spacing: 16,
        },
      },
      '(min-width: 768px)': {
        slides: {
          perView: 2,
          spacing: 20,
        },
      },
      '(min-width: 1024px)': {
        slides: {
          perView: 3,
          spacing: 24,
        },
      },
      '(min-width: 1280px)': {
        slides: {
          perView: 4,
          spacing: 24,
        },
      },
    },
    loop: true,
    created(s) {
      s.container.style.transitionDuration = '800ms';
      s.container.style.transitionTimingFunction =
        'cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    },
    updated(s) {
      s.container.style.transitionDuration = '800ms';
      s.container.style.transitionTimingFunction =
        'cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    },
    animationEnded(s) {
      s.container.style.transitionDuration = '800ms';
      s.container.style.transitionTimingFunction =
        'cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    },
    rubberband: false,
    dragSpeed: 0.5,
    defaultAnimation: {
      duration: 1200,
      easing: (t) => 1 - Math.pow(1 - t, 3),
    },
  });

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovered) {
        instanceRef.current?.next();
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <Layout>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        {/* Welcome Section */}
        <motion.div
          className='text-center mb-12'
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className='flex justify-center mb-6'>
            <div className='relative -z-10'>
              <div className='w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center shadow-2xl border-4 border-amber-300'>
                <Scroll className='w-8 h-8 text-amber-900' />
              </div>
              <div className='absolute  -inset-2 bg-gradient-to-r from-amber-400 to-red-400 rounded-full blur opacity-30 animate-pulse'></div>
            </div>
          </div>

          <h1
            className='text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-amber-200 via-yellow-200 to-amber-300 bg-clip-text text-transparent mb-4'
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Selamat Datang di HistoTalk
          </h1>

          <p className='text-amber-100 text-lg sm:text-xl max-w-3xl mx-auto'>
            Mulai percakapan dengan para pahlawan Indonesia dan temukan
            kisah-kisah heroik yang menginspirasi
          </p>

          <div className='flex items-center justify-center gap-4 mt-6'>
            <div className='w-12 h-0.5 bg-gradient-to-r from-transparent to-amber-400'></div>
            <Crown className='w-5 h-5 text-amber-400' />
            <div className='w-12 h-0.5 bg-gradient-to-l from-transparent to-amber-400'></div>
          </div>
        </motion.div>

        {/* Heroes Section */}
        <motion.div
          className='grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-16'
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {/* Soekarno Card */}
          <motion.div
            className='group bg-black/20 backdrop-blur-sm border-2 border-amber-400/30 rounded-2xl p-6 lg:p-8 hover:border-amber-400/60 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/20'
            whileHover={{ scale: 1.02, y: -5 }}
          >
            <div className='flex flex-col lg:flex-row items-center gap-6'>
              <div className='relative'>
                <div className='w-32 h-32 lg:w-40 lg:h-40 rounded-2xl overflow-hidden border-4 border-amber-300 shadow-xl'>
                  <img
                    src={pakKarno || '/placeholder.svg'}
                    alt='Ir. Soekarno'
                    className='w-full h-full object-cover'
                  />
                </div>
                <div className='absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full flex items-center justify-center border-2 border-amber-300'>
                  <Crown className='w-4 h-4 text-amber-900' />
                </div>
              </div>

              <div className='flex-1 text-center lg:text-left'>
                <div className='flex items-center justify-center lg:justify-start gap-2 mb-3'>
                  <h3 className='text-2xl lg:text-3xl font-bold text-amber-100'>
                    IR. Soekarno
                  </h3>
                  <Star className='w-5 h-5 text-amber-400 fill-amber-400' />
                </div>

                <p className='text-amber-50 mb-6 leading-relaxed'>
                  Ayo berdialog langsung dengan IR Soekarno versi digital,
                  dengarkan gagasannya, tanyakan pandangannya, dan temukan
                  inspirasi dari sang proklamator.
                </p>

                <motion.button
                  onClick={() => handleChatNavigation('soekarno')}
                  className='group/btn inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-amber-900 font-bold rounded-xl hover:from-amber-400 hover:to-amber-500 transition-all duration-300 shadow-lg hover:shadow-amber-500/25 border-2 border-amber-300'
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <MessageCircle className='w-5 h-5' />
                  Chat dengan Soekarno
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{
                      duration: 1.5,
                      repeat: Number.POSITIVE_INFINITY,
                    }}
                  >
                    <ChevronRight className='w-5 h-5' />
                  </motion.div>
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Hatta Card */}
          <motion.div
            className='group bg-black/20 backdrop-blur-sm border-2 border-amber-400/30 rounded-2xl p-6 lg:p-8 hover:border-amber-400/60 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/20'
            whileHover={{ scale: 1.02, y: -5 }}
          >
            <div className='flex flex-col lg:flex-row items-center gap-6'>
              <div className='relative'>
                <div className='w-32 h-32 lg:w-40 lg:h-40 rounded-2xl overflow-hidden border-4 border-amber-300 shadow-xl'>
                  <img
                    src={pakHatta || '/placeholder.svg'}
                    alt='Moh. Hatta'
                    className='w-full h-full object-cover'
                  />
                </div>
                <div className='absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full flex items-center justify-center border-2 border-amber-300'>
                  <Crown className='w-4 h-4 text-amber-900' />
                </div>
              </div>

              <div className='flex-1 text-center lg:text-left'>
                <div className='flex items-center justify-center lg:justify-start gap-2 mb-3'>
                  <h3 className='text-2xl lg:text-3xl font-bold text-amber-100'>
                    Moh. Hatta
                  </h3>
                  <Star className='w-5 h-5 text-amber-400 fill-amber-400' />
                </div>

                <p className='text-amber-50 mb-6 leading-relaxed'>
                  Temui Moh. Hatta versi digital dan ajak beliau berdiskusi soal
                  kemerdekaan, ekonomi, dan cita-cita Indonesia yang berpijak
                  pada keadilan.
                </p>

                <motion.button
                  onClick={() => handleChatNavigation('hatta')}
                  className='group/btn inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-amber-900 font-bold rounded-xl hover:from-amber-400 hover:to-amber-500 transition-all duration-300 shadow-lg hover:shadow-amber-500/25 border-2 border-amber-300'
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <MessageCircle className='w-5 h-5' />
                  Chat dengan Hatta
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{
                      duration: 1.5,
                      repeat: Number.POSITIVE_INFINITY,
                    }}
                  >
                    <ChevronRight className='w-5 h-5' />
                  </motion.div>
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Team Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className='overflow-hidden'
        >
          <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4'>
            <div className='flex items-center gap-3'>
              <div className='w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center border-2 border-amber-300'>
                <Users className='w-6 h-6 text-amber-900' />
              </div>
              <div>
                <h2 className='text-2xl sm:text-3xl font-bold text-amber-100'>
                  Tim HistoTalk
                </h2>
                <p className='text-amber-200 text-sm'>
                  Para pengembang di balik platform ini
                </p>
              </div>
            </div>

            <div className='flex space-x-3'>
              <motion.button
                onClick={() => instanceRef.current?.prev()}
                className='p-3 bg-black/30 backdrop-blur-sm border-2 border-amber-400/30 rounded-xl hover:border-amber-400/60 hover:bg-black/40 transition-all duration-300 hidden lg:block'
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronLeft className='w-5 h-5 text-amber-300' />
              </motion.button>
              <motion.button
                onClick={() => instanceRef.current?.next()}
                className='p-3 bg-black/30 backdrop-blur-sm border-2 border-amber-400/30 rounded-xl hover:border-amber-400/60 hover:bg-black/40 transition-all duration-300 hidden lg:block'
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronRight className='w-5 h-5 text-amber-300' />
              </motion.button>
            </div>
          </div>

          <div
            ref={sliderRef}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className='keen-slider'
          >
            {teamMembers.map((member) => (
              <div key={member.id} className='keen-slider__slide'>
                <motion.div
                  className='bg-black/20 backdrop-blur-sm border-2 border-amber-400/30 rounded-2xl p-6 h-full hover:border-amber-400/60 transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/10'
                  whileHover={{ y: -5 }}
                >
                  <div className='flex flex-col items-center text-center h-full'>
                    <div className='relative mb-4'>
                      <div className='w-20 h-20 rounded-2xl overflow-hidden border-3 border-amber-300 shadow-lg'>
                        <img
                          src={member.image || '/placeholder.svg'}
                          alt={member.name}
                          className='w-full h-full object-cover'
                        />
                      </div>
                      <div className='absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full flex items-center justify-center border-2 border-amber-300'>
                        <Star className='w-3 h-3 text-amber-900 fill-amber-900' />
                      </div>
                    </div>

                    <div className='flex-grow flex flex-col justify-between'>
                      <div>
                        <h3 className='font-bold text-amber-100 text-lg mb-1'>
                          {member.name}
                        </h3>
                        <p className='text-amber-200 text-sm mb-4'>
                          {member.role}
                        </p>
                      </div>

                      <div className='flex space-x-3 justify-center'>
                        <motion.a
                          href={member.linkedin}
                          className='p-2 bg-black/30 backdrop-blur-sm border border-amber-400/30 rounded-lg hover:border-amber-400/60 hover:bg-black/40 transition-all duration-300'
                          target='_blank'
                          rel='noopener noreferrer'
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Linkedin className='w-4 h-4 text-amber-300' />
                        </motion.a>
                        <motion.a
                          href={member.github}
                          className='p-2 bg-black/30 backdrop-blur-sm border border-amber-400/30 rounded-lg hover:border-amber-400/60 hover:bg-black/40 transition-all duration-300'
                          target='_blank'
                          rel='noopener noreferrer'
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Github className='w-4 h-4 text-amber-300' />
                        </motion.a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Footer CTA */}
        <motion.div
          className='text-center mt-16 py-8'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <div className='flex items-center justify-center gap-4 mb-4'>
            <div className='w-16 h-0.5 bg-gradient-to-r from-transparent to-amber-400'></div>
            <Scroll className='w-6 h-6 text-amber-400' />
            <div className='w-16 h-0.5 bg-gradient-to-l from-transparent to-amber-400'></div>
          </div>
          <p className='text-amber-200 text-lg'>
            Mulai percakapan sejarah Anda hari ini
          </p>
        </motion.div>
      </div>
    </Layout>
  );
};

export default HomeView;
