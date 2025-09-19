import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { Github, Linkedin, Mail, ChevronDown, ExternalLink, Code2, Languages, MapPin, Sun, Moon, Dumbbell, Music, Palette, Plane, Camera, Code, Heart, ChefHat, Rocket, Calendar } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from './hooks/useTheme';
import { useLanguage } from './hooks/useLanguage';
import Map from './components/Map';
import Footer from './components/Footer';
import Header from './components/Header';
import AnimatedSection from './components/AnimatedSection';
import ImageCarousel from './components/ImageCarousel';
import ScrollFloatText from './components/ScrollFloatText';
import ProfileCard from './components/ProfileCard';
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
          density: Math.random() * 100 + 10,
          speed: Math.random() * 0.3 + 0.3,
          angle: Math.random() * Math.PI * 5
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
      timeRef.current += 0.005;

      particlesRef.current.forEach(particle => {
        particle.angle += particle.speed * 0.005;
        const moveRadius = 30;
        const autoX = particle.baseX + Math.cos(particle.angle) * moveRadius;
        const autoY = particle.baseY + Math.sin(particle.angle) * moveRadius;

        const dx = mouseRef.current.x - autoX;
        const dy = mouseRef.current.y - autoY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const forceDirectionX = dx / distance;
        const forceDirectionY = dy / distance;
        const maxDistance = 100;
        const force = (maxDistance - distance) / maxDistance;
        const directionX = forceDirectionX * force * particle.density;
        const directionY = forceDirectionY * force * particle.density;

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

    const handleClick = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = event.clientX - rect.left;
      const clickY = event.clientY - rect.top;

      // Crear líneas de explosión
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Dibujar líneas de explosión
      for (let i = 0; i < 20; i++) {
        const angle = (i / 20) * Math.PI * 2;
        const length = 50 + Math.random() * 50;
        
        ctx.beginPath();
        ctx.moveTo(clickX, clickY);
        ctx.lineTo(
          clickX + Math.cos(angle) * length,
          clickY + Math.sin(angle) * length
        );
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      // Efecto en partículas
      particlesRef.current.forEach(particle => {
        const dx = clickX - particle.x;
        const dy = clickY - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 300) {
          const angle = Math.atan2(dy, dx);
          const force = 5000 / (distance + 1);
          
          particle.x = clickX + Math.cos(angle) * (distance + force);
          particle.y = clickY + Math.sin(angle) * (distance + force);
          particle.speed = Math.random() * 0.8 + 0.4;
          particle.angle = angle;
          particle.baseX = particle.x;
          particle.baseY = particle.y;
        }
      });
    };

    window.addEventListener('resize', handleResize);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('click', handleClick);

    init();
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full bg-gray-900"
    />
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

  const interests = useMemo(() => [
    {
      category: t('interests.hobbies.title'),
      icon: <Dumbbell className="w-8 h-8" />,
      items: [
        { name: t('interests.hobbies.sports'), icon: <Dumbbell className="w-4 h-4" /> },
        { name: t('interests.hobbies.music'), icon: <Music className="w-4 h-4" /> },
        { name: t('interests.hobbies.painting'), icon: <Palette className="w-4 h-4" /> }
      ],
      description: t('interests.hobbies.description'),
      images: interestImages['hobbies'] || []
    },
    {
      category: t('interests.interests.title'),
      icon: <Heart className="w-8 h-8" />,
      items: [
        { name: t('interests.interests.photography'), icon: <Camera className="w-4 h-4" /> },
        { name: t('interests.interests.cooking'), icon: <ChefHat className="w-4 h-4" /> },
        { name: t('interests.interests.traveling'), icon: <Plane className="w-4 h-4" /> }
      ],
      description: t('interests.interests.description'),
      images: interestImages['interests'] || []
    },
    {
      category: t('interests.passions.title'),
      icon: <Rocket className="w-8 h-8" />,
      items: [
        { name: t('interests.passions.programming'), icon: <Code className="w-4 h-4" /> },
        { name: t('interests.passions.dataScience'), icon: <Code2 className="w-4 h-4" /> },
        { name: t('interests.passions.aeronautic'), icon: <Plane className="w-4 h-4" /> },
        { name: t('interests.passions.astronomy'), icon: <Rocket className="w-4 h-4" /> }
      ],
      description: t('interests.passions.description'),
      images: interestImages['passions'] || []
    }
  ], [t, interestImages]);

  useEffect(() => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(this: HTMLAnchorElement, e: Event) {
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
          <ScrollFloatText className="text-6xl font-light text-white dark:text-white mb-8">
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
                loading="lazy"
              />
            </motion.div>
            Diaz
          </ScrollFloatText>
          
          <motion.p 
            className="text-xl text-white dark:text-white mb-8 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            dangerouslySetInnerHTML={{ __html: t('intro.title') }}
          />
          
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
          <ScrollFloatText className="text-3xl font-light text-center mb-16 text-gray-900 dark:text-white">
            {t('about.title')}
          </ScrollFloatText>
          <motion.div 
            className="bg-white dark:bg-gray-700 shadow-lg rounded-lg p-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="flex flex-col md:flex-row items-center gap-8">
              <motion.div 
                className="md:w-64 flex-shrink-0"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="sticky top-24 flex items-center justify-center h-full">
                  <ProfileCard
                    imageUrl="https://avatars.githubusercontent.com/u/60698278?v=4"
                    name="Camilo Diaz"
                    role="Data Engineer & ML Specialist"
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
          <ScrollFloatText className="text-3xl font-light text-center mb-16 text-gray-900 dark:text-white">
            {t('experience.title')}
          </ScrollFloatText>
          <div className="space-y-12">
            {[
              {
                company: "Ultra Tendency",
                logo: "https://media.licdn.com/dms/image/v2/C4D0BAQHIIO9g-VojKQ/company-logo_200_200/company-logo_200_200/0/1642706274260/ultra_tendency_logo?e=2147483647&v=beta&t=gbh7s_M5lpcbFDlExrvDZ4RUPT8e1I9aTMTaT96t0sU",
                website: "https://ultratendency.com/",
                title: t('experience.ultraTendency.title'),
                period: t('experience.ultraTendency.period'),
                description: t('experience.ultraTendency.description'),
                tags: ["Databricks", "Azure", "Python", "PySpark", "Spark"]
              },
              {
                company: "Qaracter",
                logo: "https://media.licdn.com/dms/image/v2/D4D0BAQEu4mQIjaGb1A/company-logo_200_200/company-logo_200_200/0/1698059452188/qaracter___beyond_your_challenge_logo?e=2147483647&v=beta&t=ZhNEDFZoGoaAeLetLANZcXHBd9hXCyLldUV-5GLaiNg",
                website: "https://www.qaracter.com/",
                title: t('experience.qaracter.title'),
                period: t('experience.qaracter.period'),
                description: t('experience.qaracter.description'),
                tags: ["Alteryx", "Tableau", "SQL", "Microsoft SQL Server", "Python"]
              },
              {
                company: "Publicis Sapient",
                logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/PS_Logo_RGB.svg/1200px-PS_Logo_RGB.svg.png",
                website: "https://www.publicissapient.com/",
                title: t('experience.publicis.title'),
                period: t('experience.publicis.period'),
                description: t('experience.publicis.description'),
                tags: ["Python", "PySpark", "Spark", "Databricks", "Azure", "SQL", "Microsoft SQL Server", "NoSQL"]
              },
              {
                company: "EY",
                logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/EY_logo_2019.svg/1200px-EY_logo_2019.svg.png",
                website: "https://www.ey.com/",
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
                  <a 
                    href={job.website}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-12 h-12 flex items-center justify-center bg-white rounded-lg"
                  >
                    <img 
                      src={job.logo}
                      alt={job.company}
                       className="w-10 h-10 object-contain"
                  />
                  </a>
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
          <ScrollFloatText className="text-3xl font-light text-center mb-16 text-gray-900 dark:text-white">
            {t('projects.featured.title')}
          </ScrollFloatText>
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
                src="/CaptureWebPage.png"
                alt="Portfolio Website"
                className="rounded-lg shadow-xl w-full"
                loading="lazy"
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
                {t('projects.portfolio.title')}
              </motion.h3>
              <motion.p 
                className="text-gray-700 dark:text-gray-300 mb-6"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
                viewport={{ once: true }}
              >
                {t('projects.portfolio.description')}
              </motion.p>
              <motion.a 
                href="https://github.com/CamiloAndresDG/CamiloAndresDG.github.io"
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
          <ScrollFloatText className="text-3xl font-light text-center mb-16 text-gray-900 dark:text-white">
            {t('projects.title')}
          </ScrollFloatText>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: t('projects.portfolio.title'),
                description: t('projects.portfolio.description'),
                github: "https://github.com/CamiloAndresDG/CamiloAndresDG.github.io",
                icon: "/LogoPortafolio.png",
                tags: [
                  t('projects.tags.portfolio.react'),
                  t('projects.tags.portfolio.typescript'),
                  t('projects.tags.portfolio.tailwind'),
                  t('projects.tags.portfolio.framer'),
                  t('projects.tags.portfolio.i18n'),
                  t('projects.tags.portfolio.responsive')
                ]
              },
              {
                title: t('projects.vocalmind.title'),
                description: t('projects.vocalmind.description'),
                github: "https://github.com/CamiloAndresDG/VocalMind",
                icon: "https://raw.githubusercontent.com/CamiloAndresDG/VocalMind/main/VocalMind_Icon.png",
                tags: [
                  t('projects.tags.vocalmind.python'),
                  t('projects.tags.vocalmind.ml'),
                  t('projects.tags.vocalmind.audio'),
                  t('projects.tags.vocalmind.data'),
                  t('projects.tags.vocalmind.health')
                ]
              },
              {
                title: t('projects.neuralcrime.title'),
                description: t('projects.neuralcrime.description'),
                github: "https://github.com/CamiloAndresDG/Crime_Prediction_LA",
                icon: "https://raw.githubusercontent.com/CamiloAndresDG/Crime_Prediction_LA/main/Neural_Crime_Icon.png",
                tags: [
                  t('projects.tags.neuralcrime.python'),
                  t('projects.tags.neuralcrime.pyspark'),
                  t('projects.tags.neuralcrime.spark'),
                  t('projects.tags.neuralcrime.pipeline'),
                  t('projects.tags.neuralcrime.etl'),
                  t('projects.tags.neuralcrime.ml'),
                  t('projects.tags.neuralcrime.analysis'),
                  t('projects.tags.neuralcrime.prediction'),
                  t('projects.tags.neuralcrime.safety')
                ]
              },
              {
                title: t('projects.seniortraining.title'),
                description: t('projects.seniortraining.description'),
                github: "https://github.com/CamiloAndresDG/SeniorTrAIning",
                icon: "https://raw.githubusercontent.com/CamiloAndresDG/SeniorTrAIning/main/img/logoF.png",
                tags: [
                  t('projects.tags.seniortraining.python'),
                  t('projects.tags.seniortraining.ml'),
                  t('projects.tags.seniortraining.gamification'),
                  t('projects.tags.seniortraining.health'),
                  t('projects.tags.seniortraining.ethics')
                ]
              },
              {
                title: t('projects.niote.title'),
                description: t('projects.niote.description'),
                github: "https://github.com/CamiloAndresDG/NIOTE",
                icon: "https://raw.githubusercontent.com/CamiloAndresDG/NIOTE/master/NIOTE_Icon.png",
                tags: [
                  t('projects.tags.niote.python'),
                  t('projects.tags.niote.sql'),
                  t('projects.tags.niote.ml'),
                  t('projects.tags.niote.iot'),
                  t('projects.tags.niote.climate'),
                  t('projects.tags.niote.simulation')
                ]
              },
              {
                title: t('projects.aereousb.title'),
                description: t('projects.aereousb.description'),
                github: "https://github.com/CamiloAndresDG/AereoUSB",
                icon: "https://raw.githubusercontent.com/CamiloAndresDG/AereoUSB/main/AereoUSB_Icon.png",
                tags: [
                  t('projects.tags.aereousb.java'),
                  t('projects.tags.aereousb.structures'),
                  t('projects.tags.aereousb.management')
                ]
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
                <div className="relative h-64 w-full bg-gray-100 dark:bg-gray-600 p-4 flex items-center justify-center">
                  <div className="w-full h-full flex items-center justify-center">
                    <img 
                      src={project.icon} 
                      alt={`${project.title} icon`}
                      className="w-full h-full object-contain"
                      loading="lazy"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "https://raw.githubusercontent.com/CamiloAndresDG/SeniorTrAIning/main/img/logoF.png";
                      }}
                    />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-4">{project.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, tagIndex) => (
                      <motion.span 
                        key={tagIndex} 
                        className="px-2 py-1 bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-100 text-xs rounded"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.2, delay: tagIndex * 0.1 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.05 }}
                      >
                        {tag}
                      </motion.span>
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
            <ScrollFloatText className="text-3xl font-light text-center mb-16 text-gray-900 dark:text-white">
              {t('interests.title')}
            </ScrollFloatText>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {interests.map((interest, index) => (
                <div
                  key={interest.category}
                  className="relative overflow-hidden rounded-xl bg-white dark:bg-gray-700 shadow-lg group"
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
                    <p 
                      className="text-gray-600 dark:text-gray-300 mb-4"
                      dangerouslySetInnerHTML={{ __html: interest.description }}
                    />
                    <div className="flex flex-wrap gap-2">
                      {interest.items.map((item, itemIndex) => (
                        <span 
                          key={itemIndex}
                          className="px-2 py-1 bg-gray-50 dark:bg-gray-600 text-gray-600 dark:text-white text-xs rounded-md hover:scale-105 transition-transform"
                        >
                          <span className="inline-flex items-center gap-1">
                            {item.icon}
                            {item.name}
                          </span>
                        </span>
                      ))}
                      </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        </motion.section>
      </AnimatedSection>

      <motion.section 
        id="contact" 
        className="py-20 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto px-4 text-center">
          <ScrollFloatText className="text-3xl font-light mb-8">
            {t('contact.title')}
          </ScrollFloatText>
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