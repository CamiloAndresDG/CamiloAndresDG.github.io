import React, { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Mail, ChevronDown, ExternalLink, Code2, Languages, MapPin, Sun, Moon, Dumbbell, Music, Palette, Plane, Camera, Code, Heart, ChefHat, Rocket } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from './hooks/useTheme';
import { useLanguage } from './hooks/useLanguage';
import Map from './components/Map';
import Footer from './components/Footer';
import AnimatedSection from './components/AnimatedSection';
import ImageCarousel from './components/ImageCarousel';
import { getImagesFromFolder, createImageObject } from './utils/imageUtils';

function BackgroundAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const timeRef = useRef(0);
  const { theme } = useTheme();
  const particlesRef = useRef<Array<{
    x: number;
    y: number;
    radius: number;
    baseX: number;
    baseY: number;
    density: number;
    speed: number;
    angle: number;
  }>>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const handleResize = () => {
      const container = canvas.parentElement;
      if (!container) return;
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
    };

    const init = () => {
      handleResize();
      particlesRef.current = [];

      const numberOfParticles = (canvas.width * canvas.height) / 9000;
      for (let i = 0; i < numberOfParticles; i++) {
        const radius = Math.random() * 2 + 1;
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        particlesRef.current.push({
          x,
          y,
          radius,
          baseX: x,
          baseY: y,
          density: Math.random() * 50 + 20,
          speed: Math.random() * 0 + 0.2,
          angle: Math.random() * Math.PI * 2
        });
      }
    };

    const connect = () => {
      const particleColor = 'rgba(75, 85, 99, 0.8)';
      const lineColor = (distance: number) => `rgba(75, 85, 99, ${1 - distance / 120})`;

      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i; j < particlesRef.current.length; j++) {
          const dx = particlesRef.current[i].x - particlesRef.current[j].x;
          const dy = particlesRef.current[i].y - particlesRef.current[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            ctx.beginPath();
            ctx.strokeStyle = lineColor(distance);
            ctx.lineWidth = 1;
            ctx.moveTo(particlesRef.current[i].x, particlesRef.current[i].y);
            ctx.lineTo(particlesRef.current[j].x, particlesRef.current[j].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      timeRef.current += 0.02;

      particlesRef.current.forEach(particle => {
        particle.angle += particle.speed * 0.02;
        const moveRadius = 50;
        const autoX = particle.baseX + Math.cos(particle.angle) * moveRadius;
        const autoY = particle.baseY + Math.sin(particle.angle) * moveRadius;

        const dx = mouseRef.current.x - autoX;
        const dy = mouseRef.current.y - autoY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const forceDirectionX = dx / distance;
        const forceDirectionY = dy / distance;
        const maxDistance = 150;
        const force = (maxDistance - distance) / maxDistance;
        const directionX = forceDirectionX * force * particle.density * 2;
        const directionY = forceDirectionY * force * particle.density * 2;

        if (distance < maxDistance) {
          particle.x = autoX - directionX;
          particle.y = autoY - directionY;
        } else {
          particle.x = autoX;
          particle.y = autoY;
        }

        ctx.beginPath();
        ctx.fillStyle = 'rgba(75, 85, 99, 0.8)';
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      connect();
      requestAnimationFrame(animate);
    };

    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = event.clientX - rect.left;
      mouseRef.current.y = event.clientY - rect.top;
    };

    window.addEventListener('resize', handleResize);
    canvas.addEventListener('mousemove', handleMouseMove);

    init();
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full bg-gray-900"
    />
  );
}

function Header() {
  const { t } = useTranslation();
  const { currentLanguage, toggleLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    document.querySelectorAll('section[id]').forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const getNavLinkClass = (section: string) => {
    return `transition-all duration-200 ${
      activeSection === section
        ? 'text-blue-600 dark:text-blue-400 font-medium'
        : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
    }`;
  };

  const getNextLanguageInfo = () => {
    return currentLanguage === 'en' 
      ? { flag: 'https://flagcdn.com/w40/es.png', text: 'ES' }
      : { flag: 'https://flagcdn.com/w40/gb.png', text: 'EN' };
  };

  const nextLang = getNextLanguageInfo();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
      <nav className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex space-x-6">
          <a href="#home" className={getNavLinkClass('home')}>{t('header.home')}</a>
          <a href="#about" className={getNavLinkClass('about')}>{t('header.about')}</a>
          <a href="#experience" className={getNavLinkClass('experience')}>{t('header.experience')}</a>
          <a href="#projects" className={getNavLinkClass('projects')}>{t('header.projects')}</a>
          <a href="#contact" className={getNavLinkClass('contact')}>{t('header.contact')}</a>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleLanguage}
            className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
          >
            <img 
              src={nextLang.flag}
              alt={currentLanguage === 'en' ? 'Español' : 'English'}
              className="w-6 h-4"
            />
            <span>{nextLang.text}</span>
          </button>
          <button
            onClick={toggleTheme}
            className="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            aria-label={theme === 'dark' ? t('footer.theme.light') : t('footer.theme.dark')}
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </nav>
    </header>
  );
}

function App() {
  const { t } = useTranslation();
  const [activeSection, setActiveSection] = useState('home');
  const { theme } = useTheme();
  const [interestImages, setInterestImages] = useState<{
    [key: string]: Array<{ url: string; alt: string; description: string; }>;
  }>({});

  useEffect(() => {
    const loadImages = async () => {
      const categories = ['hobbies', 'interests', 'passions'];
      const images: { [key: string]: Array<{ url: string; alt: string; description: string; }> } = {};

      for (const category of categories) {
        const imageUrls = await getImagesFromFolder(category);
        images[category] = imageUrls.map(url => createImageObject(url, category));
      }

      setInterestImages(images);
    };

    loadImages();
  }, []);

  const interests = [
    {
      category: "Hobbies",
      icon: <Dumbbell className="w-8 h-8" />,
      items: [
        { name: "Sports", icon: <Dumbbell className="w-4 h-4" /> },
        { name: "Music", icon: <Music className="w-4 h-4" /> },
        { name: "Painting", icon: <Palette className="w-4 h-4" /> }
      ],
      description: "Physical activities, creating melodies, and expressing through art",
      images: interestImages['hobbies'] || []
    },
    {
      category: "Interests",
      icon: <Heart className="w-8 h-8" />,
      items: [
        { name: "Photography", icon: <Camera className="w-4 h-4" /> },
        { name: "Cooking", icon: <ChefHat className="w-4 h-4" /> }
      ],
      description: "Capturing moments and creating culinary experiences",
      images: interestImages['interests'] || []
    },
    {
      category: "Passions",
      icon: <Rocket className="w-8 h-8" />,
      items: [
        { name: "Programming", icon: <Code className="w-4 h-4" /> },
        { name: "Data Science", icon: <Code2 className="w-4 h-4" /> },
        { name: "Traveling", icon: <Plane className="w-4 h-4" /> }
      ],
      description: "Building solutions, analyzing data, and exploring the world",
      images: interestImages['passions'] || []
    }
  ];

  useEffect(() => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const href = this.getAttribute('href');
        if (href) {
          document.querySelector(href)?.scrollIntoView({
            behavior: 'smooth'
          });
        }
      });
    });
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />
      
      <section id="home" className="relative min-h-screen flex items-center justify-center pt-16">
        <BackgroundAnimation />
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <h1 className="text-6xl font-light dark:text-white mb-8">
            Camilo
            <div className="inline-block mx-4">
              <img
                src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/People/Astronaut.png"
                alt="Astronaut Programmer"
                className="w-24 h-24 inline-block"
              />
            </div>
            Diaz
          </h1>
          
          <p className="text-xl dark:text-white dark:text-white mb-8 leading-relaxed">
            {t('intro.title')}
          </p>
          
          <hr className="w-32 mx-auto border-gray-300 dark:border-gray-600 mb-8" />
          
          <div className="flex justify-center gap-8 mb-12">
            <a href="https://github.com/CamiloAndresDG" className="social-icon github">
              <Github size={28} />
            </a>
            <a href="https://linkedin.com" className="social-icon linkedin">
              <Linkedin size={28} />
            </a>
            <a href="mailto:camiloandres2288@hotmail.com" className="social-icon email">
              <Mail size={28} />
            </a>
          </div>

          <button
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            className="animate-bounce mt-12"
          >
            <ChevronDown size={36} className="text-gray-400 dark:text-gray-600" />
          </button>
        </div>
      </section>

      <section id="about" className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white dark:bg-gray-700 shadow-lg rounded-lg p-8">
            <div className="flex flex-col md:flex-row items-start gap-8">
              <div className="md:w-48 flex-shrink-0">
                <div className="sticky top-24">
                  <img
                    src="https://avatars.githubusercontent.com/u/60698278?v=4"
                    alt="Camilo Diaz"
                    className="w-48 h-48 object-cover rounded-lg shadow-md"
                  />
                </div>
              </div>
              <div className="flex-grow">
                <div className="prose prose-lg dark:prose-invert">
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    {t('about.greeting')}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    {t('about.description1')}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    {t('about.description2')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="experience" className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-light text-center mb-16 text-gray-900 dark:text-white">{t('experience.title')}</h2>
          <div className="space-y-12">
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 flex items-center justify-center bg-white rounded-lg">
                  <img src="https://media.licdn.com/dms/image/v2/D4D0BAQEu4mQIjaGb1A/company-logo_200_200/company-logo_200_200/0/1698059452188/qaracter___beyond_your_challenge_logo?e=2147483647&v=beta&t=ZhNEDFZoGoaAeLetLANZcXHBd9hXCyLldUV-5GLaiNg" 
                       alt="Qaracter" 
                       className="w-10 h-10 object-contain"
                  />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-medium text-gray-900 dark:text-white">{t('experience.qaracter.title')}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-2">{t('experience.qaracter.period')}</p>
                <p className="text-gray-600 dark:text-gray-400 mb-3">{t('experience.qaracter.description')}</p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs rounded">Alteryx</span>
                  <span className="px-2 py-1 bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs rounded">Tableau</span>
                  <span className="px-2 py-1 bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs rounded">SQL</span>
                  <span className="px-2 py-1 bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs rounded">Microsoft SQL Server</span>
                  <span className="px-2 py-1 bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs rounded">Python</span>
                </div>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 flex items-center justify-center bg-white rounded-lg">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/PS_Logo_RGB.svg/1200px-PS_Logo_RGB.svg.png" 
                       alt="Publicis Sapient" 
                       className="w-10 h-10 object-contain"
                  />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-medium text-gray-900 dark:text-white">{t('experience.publicis.title')}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-2">{t('experience.publicis.period')}</p>
                <p className="text-gray-600 dark:text-gray-400 mb-3">{t('experience.publicis.description')}</p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs rounded">Python</span>
                  <span className="px-2 py-1 bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs rounded">PySpark</span>
                  <span className="px-2 py-1 bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs rounded">Spark</span>
                  <span className="px-2 py-1 bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs rounded">Databricks</span>
                  <span className="px-2 py-1 bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs rounded">Azure</span>
                  <span className="px-2 py-1 bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs rounded">SQL</span>
                  <span className="px-2 py-1 bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs rounded">Microsoft SQL Server</span>
                  <span className="px-2 py-1 bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs rounded">NoSQL</span>
                </div>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 flex items-center justify-center bg-white rounded-lg">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/EY_logo_2019.svg/1200px-EY_logo_2019.svg.png" 
                       alt="EY" 
                       className="w-10 h-10 object-contain"
                  />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-medium text-gray-900 dark:text-white">{t('experience.ey.title')}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-2">{t('experience.ey.period')}</p>
                <p className="text-gray-600 dark:text-gray-400 mb-3">{t('experience.ey.description')}</p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs rounded">Python</span>
                  <span className="px-2 py-1 bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs rounded">R</span>
                  <span className="px-2 py-1 bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs rounded">PySpark</span>
                  <span className="px-2 py-1 bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs rounded">SQL</span>
                  <span className="px-2 py-1 bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs rounded">PostgreSQL</span>
                  <span className="px-2 py-1 bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs rounded">NoSQL</span>
                  <span className="px-2 py-1 bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs rounded">GIS</span>
                  <span className="px-2 py-1 bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs rounded">Machine Learning</span>
                  <span className="px-2 py-1 bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs rounded">Deep Learning</span>
                  <span className="px-2 py-1 bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs rounded">Databricks</span>
                  <span className="px-2 py-1 bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs rounded">Azure</span>
                  <span className="px-2 py-1 bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs rounded">Power BI</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-light text-center mb-16 text-gray-900 dark:text-white">{t('projects.featured.title')}</h2>
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/2">
              <img
                src="https://raw.githubusercontent.com/CamiloAndresDG/SeniorTrAIning/refs/heads/main/img/logo.jpg"
                alt="SeniorTrAIning"
                className="rounded-lg shadow-xl w-full"
              />
            </div>
            <div className="md:w-1/2">
              <h3 className="text-2xl font-medium text-gray-900 dark:text-white mb-4">SeniorTrAIning</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                {t('projects.featured.description')}
              </p>
              <a 
                href="https://github.com/CamiloAndresDG/SeniorTrAIning"
                className="inline-flex items-center text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t('projects.viewProject')} <ExternalLink size={16} className="ml-2" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-light text-center mb-16 text-gray-900 dark:text-white">{t('projects.title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "VocalMind",
                description: "A machine learning-based system that detects depression and anxiety through voice analysis, leveraging audio spectrograms and additional features to predict emotional states. Designed for early detection and mental health support.",
                github: "https://github.com/CamiloAndresDG/VocalMind",
                tags: ["Python", "Machine Learning", "Audio Analysis", "Data Analysis", "Mental Health"]
              },
              {
                title: "NeuralCrime",
                description: "A data-driven crime analysis and prediction system for Los Angeles, leveraging publicly available crime records from 2020 to present. The project involves data extraction, processing, visualization, and predictive modeling to identify crime patterns and trends, aiding in informed decision-making and public safety initiatives.",
                github: "https://github.com/CamiloAndresDG/Crime_Prediction_LA",
                tags: ["Python", "PySpark", "Apache Spark", "Pipeline", "ETL",  "Machine Learning", "Data Analysis", "Predictive Modeling", "Public Safety"]
              },
              {
                title: "NioTe",
                description: "NioTe is a climate data simulation model designed to support IoT project development. By leveraging open-source climate data from reliable sources like Datos Abiertos Colombia and applying quality controls, it enables realistic data generation for specific regions in Colombia. Using Machine Learning techniques, NioTe captures patterns from historical climate data to create synthetic datasets that mimic real-world weather behavior.",
                github: "https://github.com/CamiloAndresDG/NIOTE",
                tags: ["Python", "SQL", "Machine Learning", "IoT", "Climate Data", "Simulation"]
              },
              {
                title: "AereoUSB",
                description: "AereoUSB is a Java-based airline management system developed as part of a Data Structures course. The project leverages various data structures to efficiently handle key airline resources, including fleet, crew, pilots, and flights. By ensuring clear and structured communication between agents and customers, AereoUSB enhances ticket purchasing, optimizes operations, and provides a reliable data management framework for airline services.",
                github: "https://github.com/CamiloAndresDG/AereoUSB",
                tags: ["Java", "Data Structures", "Management System"]
              }
            ].map((project, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                <div className="p-6">
                  <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">{project.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className="px-2 py-1 bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <a 
                    href={project.github}
                    className="inline-flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github size={16} className="mr-2" />
                    {t('projects.viewOnGithub')}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <AnimatedSection delay={0.6}>
        <section className="py-20 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-light text-center mb-16 text-gray-900 dark:text-white">
              {t('interests.title')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <AnimatePresence>
                {interests.map((interest, index) => (
                  <motion.div
                    key={interest.category}
                    className="relative overflow-hidden rounded-xl bg-white dark:bg-gray-700 shadow-lg group hover:shadow-xl transition-shadow duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ 
                      duration: 0.5, 
                      delay: index * 0.2,
                      ease: [0.22, 1, 0.36, 1]
                    }}
                    whileHover={{ y: -5 }}
                  >
                    {interest.images.length > 0 && (
                      <ImageCarousel 
                        images={interest.images.map(img => ({
                          ...img,
                          alt: interest.category,
                          description: undefined
                        }))}
                        height="h-48"
                        interval={4000}
                      />
                    )}
                    <div className="p-6">
                      <p className="text-gray-600 dark:text-gray-300 mb-4">
                        {interest.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {interest.items.map((item, itemIndex) => (
                          <motion.span
                            key={itemIndex}
                            className="flex items-center gap-1 px-3 py-1 bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            {item.icon}
                            {item.name}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </section>
      </AnimatedSection>

      <section id="contact" className="py-20 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-light mb-8">{t('contact.title')}</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            {t('contact.description')}{' '}
            <a 
              href="mailto:camiloandres2288@hotmail.com"
              className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
            >
              camiloandres2288@hotmail.com
            </a>
          </p>
          <div className="flex justify-center gap-6 mb-12">
            <a 
              href="https://github.com/CamiloAndresDG"
              className="inline-flex items-center px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github size={20} className="mr-2" />
              GitHub
            </a>
            <a 
              href="https://www.linkedin.com/in/camiloandresdg/"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin size={20} className="mr-2" />
              LinkedIn
            </a>
          </div>
          <div className="flex items-center justify-center text-gray-600 dark:text-gray-300 mb-4">
            <MapPin size={20} className="mr-2" />
            <span>{t('contact.location')}</span>
          </div>
          <div className="mb-8">
            <Map />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default App;