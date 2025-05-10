import React, { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Mail, ChevronDown, ExternalLink, Code2, Languages, MapPin, Sun, Moon, Dumbbell, Music, Palette, Plane, Camera, Code, Heart, ChefHat, Rocket, Calendar } from 'lucide-react';
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
  const { t, i18n } = useTranslation();
  const { currentLanguage, toggleLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [activeSection, setActiveSection] = useState('home');

  const handleLanguageChange = () => {
    const newLang = currentLanguage === 'en' ? 'es' : 'en';
    i18n.changeLanguage(newLang);
    toggleLanguage();
  };

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
          <a href="#latest_project" className={getNavLinkClass('latest_project')}>{t('header.projects')}</a>
          <a href="#interests" className={getNavLinkClass('interests')}>{t('header.interests')}</a>
          <a href="#contact" className={getNavLinkClass('contact')}>{t('header.contact')}</a>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={handleLanguageChange}
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
      description: (
        <>
          <p>Physical activities, creating melodies, and expressing through art.</p>
          <p>These activities help me disconnect, stay energized, and express myself.</p>
        </>
      ),
      images: interestImages['hobbies'] || []
    },
    {
      category: "Interests",
      icon: <Heart className="w-8 h-8" />,
      items: [
        { name: "Photography", icon: <Camera className="w-4 h-4" /> },
        { name: "Cooking", icon: <ChefHat className="w-4 h-4" /> },
        { name: "Traveling", icon: <Plane className="w-4 h-4" /> }
      ],
      description: (
        <>
          <p>Capturing moments and creating culinary experiences.</p>
          <p>I share various types of photos on my personal Instagram account, <a href="https://www.instagram.com/pocket._.lens/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">@pocket._.lens</a>, including landscapes, portraits, urban scenes, and creative compositions.</p>
        </>
      ),
      images: interestImages['interests'] || []
    },
    {
      category: "Passions",
      icon: <Rocket className="w-8 h-8" />,
      items: [
        { name: "Programming", icon: <Code className="w-4 h-4" /> },
        { name: "Data Science", icon: <Code2 className="w-4 h-4" /> },
        { name: "Aeronautic", icon: <Plane className="w-4 h-4" /> },
        { name: "Astronomy", icon: <Rocket className="w-4 h-4" /> }
      ],
      description: "Building solutions, analyzing data, and exploring the world.",
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
        <motion.div 
          className="relative max-w-3xl mx-auto px-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="text-6xl font-light text-white dark:text-white mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Camilo
            <motion.div 
              className="inline-block mx-4"
              initial={{ rotate: -10, scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <img
                src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/People/Astronaut.png"
                alt="Astronaut Programmer"
                className="w-24 h-24 inline-block"
              />
            </motion.div>
            Diaz
          </motion.h1>
          
          <motion.p 
            className="text-xl text-white dark:text-white mb-8 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            {t('intro.title')}
          </motion.p>
          
          <motion.hr 
            className="w-32 mx-auto border-gray-300 dark:border-gray-600 mb-8"
            initial={{ width: 0 }}
            animate={{ width: "8rem" }}
            transition={{ duration: 0.8, delay: 0.8 }}
          />
          
          <motion.div 
            className="flex text-white dark:text-white justify-center gap-8 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            <motion.a 
              href="https://github.com/CamiloAndresDG" 
              className="social-icon github"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Github size={28} />
            </motion.a>
            <motion.a 
              href="https://www.linkedin.com/in/camiloandresdg/" 
              className="social-icon linkedin"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Linkedin size={28} />
            </motion.a>
            <motion.a 
              href="mailto:camiloandres2288@hotmail.com" 
              className="social-icon email"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Mail size={28} />
            </motion.a>
            <motion.a 
              href="https://calendly.com/camiloandres2288/30min" 
              className="social-icon calendly"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Calendar size={28} />
            </motion.a>
          </motion.div>

          <motion.button
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            className="mt-12"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ChevronDown size={36} className="text-gray-400 dark:text-gray-600" />
          </motion.button>
        </motion.div>
      </section>

      <motion.section 
        id="about" 
        className="py-20 bg-gray-50 dark:bg-gray-800"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto px-4">
          <motion.div 
            className="bg-white dark:bg-gray-700 shadow-lg rounded-lg p-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="flex flex-col md:flex-row items-center gap-8">
              <motion.div 
                className="md:w-48 flex-shrink-0"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="sticky top-24 flex items-center justify-center h-full">
                  <img
                    src="https://avatars.githubusercontent.com/u/60698278?v=4"
                    alt="Camilo Diaz"
                    className="w-48 h-48 object-cover rounded-lg shadow-md"
                  />
                </div>
              </motion.div>
              <motion.div 
                className="flex-grow"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="prose prose-lg dark:prose-invert">
                  <motion.p 
                    className="text-gray-700 dark:text-gray-300 mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    viewport={{ once: true }}
                  >
                    {t('about.greeting')}
                  </motion.p>
                  <motion.p 
                    className="text-gray-700 dark:text-gray-300 mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    viewport={{ once: true }}
                  >
                    {t('about.description1')}
                  </motion.p>
                  <motion.p 
                    className="text-gray-700 dark:text-gray-300"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    viewport={{ once: true }}
                    dangerouslySetInnerHTML={{ __html: t('about.description2') }}
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      <motion.section 
        id="experience" 
        className="py-20 bg-white dark:bg-gray-900"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto px-4">
          <motion.h2 
            className="text-3xl font-light text-center mb-16 text-gray-900 dark:text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            {t('experience.title')}
          </motion.h2>
          <div className="space-y-12">
            {[
              {
                company: "Qaracter",
                logo: "https://media.licdn.com/dms/image/v2/D4D0BAQEu4mQIjaGb1A/company-logo_200_200/company-logo_200_200/0/1698059452188/qaracter___beyond_your_challenge_logo?e=2147483647&v=beta&t=ZhNEDFZoGoaAeLetLANZcXHBd9hXCyLldUV-5GLaiNg",
                title: t('experience.qaracter.title'),
                period: t('experience.qaracter.period'),
                description: t('experience.qaracter.description'),
                tags: ["Alteryx", "Tableau", "SQL", "Microsoft SQL Server", "Python"]
              },
              {
                company: "Publicis Sapient",
                logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/PS_Logo_RGB.svg/1200px-PS_Logo_RGB.svg.png",
                title: t('experience.publicis.title'),
                period: t('experience.publicis.period'),
                description: t('experience.publicis.description'),
                tags: ["Python", "PySpark", "Spark", "Databricks", "Azure", "SQL", "Microsoft SQL Server", "NoSQL"]
              },
              {
                company: "EY",
                logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/EY_logo_2019.svg/1200px-EY_logo_2019.svg.png",
                title: t('experience.ey.title'),
                period: t('experience.ey.period'),
                description: t('experience.ey.description'),
                tags: ["Python", "R", "PySpark", "SQL", "PostgreSQL", "NoSQL", "GIS", "Machine Learning", "Deep Learning", "Databricks", "Azure", "Power BI"]
              }
            ].map((job, index) => (
              <motion.div 
                key={job.company}
                className="flex gap-6"
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <motion.div 
                  className="flex-shrink-0"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="w-12 h-12 flex items-center justify-center bg-white rounded-lg">
                    <img 
                      src={job.logo} 
                      alt={job.company} 
                      className="w-10 h-10 object-contain"
                    />
                  </div>
                </motion.div>
                <div>
                  <motion.h3 
                    className="text-xl font-medium text-gray-900 dark:text-white"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.2 + 0.1 }}
                    viewport={{ once: true }}
                  >
                    {job.title}
                  </motion.h3>
                  <motion.p 
                    className="text-gray-600 dark:text-gray-400 mb-2"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.2 + 0.2 }}
                    viewport={{ once: true }}
                  >
                    {job.period}
                  </motion.p>
                  <motion.p 
                    className="text-gray-600 dark:text-gray-400 mb-3"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.2 + 0.3 }}
                    viewport={{ once: true }}
                  >
                    {job.description}
                  </motion.p>
                  <motion.div 
                    className="flex flex-wrap gap-2"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.2 + 0.4 }}
                    viewport={{ once: true }}
                  >
                    {job.tags.map((tag, tagIndex) => (
                      <motion.span 
                        key={tagIndex}
                        className="px-2 py-1 bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.2, delay: index * 0.2 + 0.4 + tagIndex * 0.1 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.05 }}
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section 
        id="latest_project" 
        className="py-20 bg-gray-50 dark:bg-gray-800"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto px-4">
          <motion.h2 
            className="text-3xl font-light text-center mb-16 text-gray-900 dark:text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            {t('projects.featured.title')}
          </motion.h2>
          <motion.div 
            className="flex flex-col md:flex-row gap-8 items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <motion.div 
              className="md:w-1/2"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <img
                src="https://raw.githubusercontent.com/CamiloAndresDG/SeniorTrAIning/refs/heads/main/img/logo.jpg"
                alt="SeniorTrAIning"
                className="rounded-lg shadow-xl w-full"
              />
            </motion.div>
            <motion.div 
              className="md:w-1/2"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <motion.h3 
                className="text-2xl font-medium text-gray-900 dark:text-white mb-4"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
                viewport={{ once: true }}
              >
                SeniorTrAIning
              </motion.h3>
              <motion.p 
                className="text-gray-700 dark:text-gray-300 mb-6"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
                viewport={{ once: true }}
              >
                {t('projects.featured.description')}
              </motion.p>
              <motion.a 
                href="https://github.com/CamiloAndresDG/SeniorTrAIning"
                className="inline-flex items-center text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {t('projects.viewProject')} <ExternalLink size={16} className="ml-2" />
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      <motion.section 
        id="latest_project" 
        className="py-20 bg-white dark:bg-gray-900"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-light text-center mb-16 text-gray-900 dark:text-white">{t('projects.title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "VocalMind",
                description: "A machine learning-based system that detects depression and anxiety through voice analysis, leveraging audio spectrograms and additional features to predict emotional states. Designed for early detection and mental health support.",
                github: "https://github.com/CamiloAndresDG/VocalMind",
                icon: "https://raw.githubusercontent.com/CamiloAndresDG/VocalMind/main/VocalMind_Icon.png",
                tags: ["Python", "Machine Learning", "Audio Analysis", "Data Analysis", "Mental Health"]
              },
              {
                title: "NeuralCrime",
                description: "A data-driven crime analysis and prediction system for Los Angeles, leveraging publicly available crime records from 2020 to present. The project involves data extraction, processing, visualization, and predictive modeling to identify crime patterns and trends, aiding in informed decision-making and public safety initiatives.",
                github: "https://github.com/CamiloAndresDG/Crime_Prediction_LA",
                icon: "https://raw.githubusercontent.com/CamiloAndresDG/Crime_Prediction_LA/main/Neural_Crime_Icon.png",
                tags: ["Python", "PySpark", "Apache Spark", "Pipeline", "ETL",  "Machine Learning", "Data Analysis", "Predictive Modeling", "Public Safety"]
              },
              {
                title: "NioTe",
                description: "NioTe is a climate data simulation model designed to support IoT project development. By leveraging open-source climate data from reliable sources like Datos Abiertos Colombia and applying quality controls, it enables realistic data generation for specific regions in Colombia. Using Machine Learning techniques, NioTe captures patterns from historical climate data to create synthetic datasets that mimic real-world weather behavior.",
                github: "https://github.com/CamiloAndresDG/NIOTE",
                icon: "https://raw.githubusercontent.com/CamiloAndresDG/NIOTE/master/NIOTE_Icon.png",
                tags: ["Python", "SQL", "Machine Learning", "IoT", "Climate Data", "Simulation"]
              },
              {
                title: "AereoUSB",
                description: "AereoUSB is a Java-based airline management system developed as part of a Data Structures course. The project leverages various data structures to efficiently handle key airline resources, including fleet, crew, pilots, and flights. By ensuring clear and structured communication between agents and customers, AereoUSB enhances ticket purchasing, optimizes operations, and provides a reliable data management framework for airline services.",
                github: "https://github.com/CamiloAndresDG/AereoUSB",
                icon: "https://raw.githubusercontent.com/CamiloAndresDG/AereoUSB/main/AereoUSB_Icon.png",
                tags: ["Java", "Data Structures", "Management System"]
              }
            ].map((project, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="relative h-64 w-full bg-gray-50 dark:bg-gray-700 p-4 flex items-center justify-center">
                  <div className="w-full h-full flex items-center justify-center">
                    <img 
                      src={project.icon} 
                      alt={`${project.title} icon`}
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "https://raw.githubusercontent.com/CamiloAndresDG/SeniorTrAIning/main/img/logo.jpg";
                      }}
                    />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-4">{project.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className="px-2 py-1 bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div 
                    dangerouslySetInnerHTML={{ __html: t('projects.viewOnGithub') }}
                    onClick={() => window.open(project.github, '_blank', 'noopener,noreferrer')}
                    className="inline-flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white cursor-pointer"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <AnimatedSection delay={0.6}>
        <motion.section 
          id="interests" 
          className="py-20 bg-gray-50 dark:bg-gray-800"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-light text-center mb-16 text-gray-900 dark:text-white">
              {t('interests.title')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <AnimatePresence>
                {interests.map((interest, index) => (
                  <motion.div
                    key={interest.category}
                    className="relative overflow-hidden rounded-xl bg-white dark:bg-gray-700 shadow-lg group"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
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
                          <span
                            key={itemIndex}
                            className="flex items-center gap-1 px-3 py-1 bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                          >
                            {item.icon}
                            {item.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </motion.section>
      </AnimatedSection>

      <motion.section 
        id="contact" 
        className="py-20 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.h2 
            className="text-3xl font-light mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            {t('contact.title')}
          </motion.h2>
          <motion.p 
            className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {t('contact.description')}{' '}
            <motion.a 
              href="mailto:camiloandres2288@hotmail.com"
              className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              camiloandres2288@hotmail.com
            </motion.a>
          </motion.p>
          <motion.div 
            className="flex justify-center gap-6 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <motion.a 
              href="https://github.com/CamiloAndresDG"
              className="inline-flex items-center px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Github size={20} className="mr-2" />
              GitHub
            </motion.a>
            <motion.a 
              href="https://www.linkedin.com/in/camiloandresdg/"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Linkedin size={20} className="mr-2" />
              LinkedIn
            </motion.a>
            <motion.a 
              href="https://calendly.com/camiloandres2288/30min"
              className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Calendar size={20} className="mr-2" />
              Calendly
            </motion.a>
          </motion.div>
          <div className="flex items-center justify-center text-gray-600 dark:text-gray-300 mb-4">
            <MapPin size={20} className="mr-2" />
            <span>{t('contact.location')}</span>
          </div>
          <div className="mb-8">
            <Map />
          </div>
        </div>
      </motion.section>

      <Footer />
    </div>
  );
}

export default App;