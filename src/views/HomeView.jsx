/* eslint-disable no-unused-vars */
import React, { useRef, useEffect, useState } from 'react';
import { useKeenSlider } from 'keen-slider/react';
import { ChevronLeft, ChevronRight, Linkedin, Github } from 'lucide-react';
import { motion } from 'framer-motion';
import Layout from '../components/common/Layout';
import { useNavigationPresenter } from '../presenters/NavigationPresenter';
import pakHatta from "../assets/pakhatta.png";
import pakKarno from "../assets/pakkarno.png";
import Leo from "../assets/Leo_Prangs_Tobing.png";

const HomeView = () => {
  const { handleChatNavigation } = useNavigationPresenter();
  const [isHovered, setIsHovered] = useState(false);

  const teamMembers = [
    {
      id: 1,
      name: "Leo TP",
      role: "Machine Learning",
      image: Leo,
      linkedin: "#",
      github: "#"
    },
    {
      id: 2,
      name: "Rafi Alisba GS",
      role: "UI UX & Front End Developer", 
      image: Leo,
      linkedin: "#",
      github: "#"
    },
    {
      id: 3,
      name: "Nanda Safiq",
      role: "Back-End Developer",
      image: Leo, 
      linkedin: "#",
      github: "#"
    },
    {
      id: 4,
      name: "Sincan",
      role: "Front-End Developer",
      image: Leo,
      linkedin: "#", 
      github: "#"
    },
    {
      id: 5,
      name: "Khoirunnisa",
      role: "Machine Learning",
      image: Leo,
      linkedin: "#",
      github: "#"
    },
    {
      id: 6,
      name: "Ricchie",
      role: "Machine Learning",
      image: Leo,
      linkedin: "#",
      github: "#"
    }
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
      s.container.style.transitionDuration = "800ms";
      s.container.style.transitionTimingFunction = "cubic-bezier(0.25, 0.46, 0.45, 0.94)";
    },
    updated(s) {
      s.container.style.transitionDuration = "800ms";
      s.container.style.transitionTimingFunction = "cubic-bezier(0.25, 0.46, 0.45, 0.94)";
    },
    animationEnded(s) {
      s.container.style.transitionDuration = "800ms";
      s.container.style.transitionTimingFunction = "cubic-bezier(0.25, 0.46, 0.45, 0.94)";
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
      <div className="max-w-full overflow-hidden px-1 sm:px-0 py-4 lg:py-0">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="bg-transparent border border-[#ffffff34] rounded-lg p-4 sm:p-6">
            <div className="flex justify-center mb-3">
              <div className="w-24 h-24 sm:w-32 sm:h-32 lg:w-48 lg:h-48 overflow-hidden rounded-lg">
                <img 
                  src={pakKarno} 
                  alt="Ir. Soekarno" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <h3 className="text-lg sm:text-xl font-bold mb-3 text-center lg:text-left">IR. Soekarno</h3>
            <p className="text-gray-300 mb-4 text-sm sm:text-base text-center lg:text-left">
              Ayo berdialog langsung dengan IR Soekarno versi digital, dengarkan gagasannya, tanyakan pandangannya, dan temukan inspirasi dari sang proklamator.
            </p>
            <button
              onClick={() => handleChatNavigation('soekarno')}
              className="text-[#ffffffed] hover:text-white hover:cursor-pointer flex items-center justify-center w-full sm:w-auto mx-auto lg:mx-0"
            >
              Chat Soekarno
              <ChevronRight className="ml-2 w-4 h-4" />
            </button>
            </div>

          <div className="bg-transparent border border-[#ffffff34] rounded-lg p-4 sm:p-6">
            <div className="flex justify-center mb-3">
              <div className="w-24 h-24 sm:w-32 sm:h-32 lg:w-48 lg:h-48 overflow-hidden rounded-lg">
                <img 
                  src={pakHatta} 
                  alt="Moh. Hatta" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <h3 className="text-lg sm:text-xl font-bold mb-3 text-center lg:text-left">Moh. Hatta</h3>
            <p className="text-gray-300 mb-4 text-sm sm:text-base text-center lg:text-left">
              Temui Moh. Hatta versi digital dan ajak beliau berdiskusi soal kemerdekaan, ekonomi, dan cita-cita Indonesia yang berpijak pada keadilan.
            </p>
            <button
              onClick={() => handleChatNavigation('hatta')}
              className="text-[#ffffffed] hover:text-white hover:cursor-pointer flex items-center justify-center w-full sm:w-auto mx-auto lg:mx-0"
            >
              Chat Hatta
              <ChevronRight className="ml-2 w-4 h-4" />
            </button>
          </div>
        </motion.div>

        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="overflow-hidden"
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-4">
            <h2 className="text-xl sm:text-2xl font-bold">Histotalk Teams</h2>
            <div className="flex space-x-2">
              <button
                onClick={() => instanceRef.current?.prev()}
                className="p-2 bg-transparent border border-[#ffffff34] rounded-lg hover:bg-gray-700 transition-colors hover:cursor-pointer hidden lg:block"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <button
                onClick={() => instanceRef.current?.next()}
                className="p-2 bg-transparent border border-[#ffffff34] hover:cursor-pointer rounded-lg hover:bg-gray-700 transition-colors hidden lg:block"
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>

<div
  ref={sliderRef}
  onMouseEnter={() => setIsHovered(true)}
  onMouseLeave={() => setIsHovered(false)}
  className="keen-slider"
>

            {teamMembers.map((member) => (
              <div key={member.id} className="keen-slider__slide">
                <div className="bg-transparent border border-[#ffffff34] rounded-lg p-4 sm:p-6 h-full">
                  <div className="flex flex-col sm:flex-row gap-4 h-full">
                    <div className="flex-shrink-0 flex justify-center sm:justify-start items-center">
                      <div className="w-16 h-20 sm:w-20 sm:h-24 rounded-md overflow-hidden bg-gray-700 border border-[#ffffff34]">
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col justify-between flex-grow text-center sm:text-left">
                      <div>
                        <h3 className="font-bold text-white text-base sm:text-lg">{member.name}</h3>
                        <p className="text-gray-400 text-xs sm:text-sm mt-1">{member.role}</p>
                      </div>
                      
                      <div className="flex space-x-2 sm:space-x-3 mt-3 sm:mt-4 justify-center sm:justify-start">
                        <a
                          href={member.linkedin}
                          className="p-2 bg-transparent border border-[#ffffff34] rounded-lg hover:bg-gray-600 transition-colors"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Linkedin className="w-3 h-3 sm:w-4 sm:h-4 text-neutral-200" />
                        </a>
                        <a
                          href={member.github}
                          className="p-2 bg-transparent border border-[#ffffff34] rounded-lg hover:bg-gray-600 transition-colors"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Github className="w-3 h-3 sm:w-4 sm:h-4 text-neutral-200" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.section>
      </div>
    </Layout>
  );
};

export default HomeView;