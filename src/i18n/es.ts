export default {
  header: {
    home: 'Inicio',
    about: 'Sobre Mí',
    experience: 'Experiencia',
    projects: 'Proyectos',
    interests: 'Intereses',
    contact: 'Contacto'
  },
  intro: {
    title: '👋 ¡Hola! Soy consultor de datos bilingüe especializado en <strong>ingeniería de datos, aprendizaje automático y soluciones en la nube</strong>. He trabajado en diversas industrias, desarrollando soluciones escalables basadas en datos. Siempre aprendiendo, siempre innovando. 💡',
    description: 'Implementando transformación y visualización de datos con paneles interactivos.'
  },
  about: {
    title: 'Sobre Mí',
    greeting: 'Hola, soy Camilo Diaz.',
    description1: 'Me especializo en ayudar a empresas a diseñar, construir y optimizar plataformas de datos escalables. Mi experiencia principal se centra en la ingeniería de datos, con un fuerte enfoque en Databricks. Desarrollo pipelines ETL/ELT robustos, implemento las mejores prácticas para la calidad y gobernanza de datos, y permito a los equipos extraer valor real de sus datos. También aporto experiencia complementaria en ciencia de datos, lo que me permite conectar la ingeniería con la analítica avanzada cuando es necesario.',
    description2: 'Con más de cuatro años de experiencia en ingeniería y analítica de datos, he trabajado como consultor en sectores como agroindustria, salud, energía, telecomunicaciones, banca y automoción. Tengo un Máster en Ciencia de Datos, Big Data e Inteligencia Artificial por la <a href="https://www.ucm.es/" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">Universidad Complutense de Madrid</a>, lo que ha fortalecido mi capacidad para diseñar soluciones de datos integrales, desde la ingesta y la transformación hasta el modelado, la automatización y la visualización.',
    description3: 'Si necesitas ayuda para construir arquitecturas de datos escalables, mejorar tus flujos de trabajo en Databricks o implementar soluciones basadas en datos, estoy aquí para ayudarte.'
  },
  experience: {
    title: 'Experiencia Laboral',
    ultraTendency: {
      title: 'Big Data Developer',
      period: 'Sept 2025 - Presente',
      description: 'Desarrollé y mantuve pipelines ETL escalables para datos en Azure, asegurando el cumplimiento de los estándares regulatorios europeos. Implementé transformaciones reutilizables con Python, PySpark y Databricks, y entregué salidas XSD estructuradas para la integración downstream.',
      technologies: ['Databricks', 'Azure', 'Python', 'PySpark', 'Spark']
    },
    qaracter: {
      title: 'Business Consultant',
      period: 'Sept 2024 - Sept 2025',
      description: 'Implementé flujos de trabajo utilizando Alteryx y para su posterior visualización con Tableau para cliente en el sector bancario. Optimizé y aseguré la integración eficiente de fuentes de datos para obtener información procesable y apoyar decisiones estratégicas.'
    },
    publicis: {
      title: 'Associate Data Engineering L2',
      period: 'Oct 2023 - Sept 2024',
      description: 'Diseñé y modernicé la arquitectura de datos para el sector de salud, creando y optimizando procesos ETL. Aseguré el cumplimiento de las normas de seguridad de la información e implementé medidas para la protección de los datos.'
    },
    ey: {
      title: 'Data & Analytics Consultant',
      period: 'Ene 2022 - Oct 2023',
      description: 'Desarrollé soluciones ETL para procesar datos estructurados, no estructurados y geoespaciales, mejorando la eficiencia y tiempos de procesamiento. Implementé modelos de Machine Learning para optimizar decisiones y automatizar flujos de trabajo. Trabajé en el desarrollo de soluciones en la nube (Azure), apoyando la transformación y análisis de datos en tiempo real.'
    }
  },
  projects: {
    featured: {
      title: 'Último Proyecto',
      description: 'Portafolio web moderno y responsivo desarrollado con React, TypeScript y Tailwind CSS, con soporte para modo oscuro, multilingüe (inglés/español), animaciones con Framer Motion y un diseño profesional que presenta proyectos, experiencia e intereses de forma interactiva.'
    },
    title: 'Proyectos Personales',
    viewProject: 'Ver Proyecto',
    viewOnGithub: '<a href="#" class="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">Ver en GitHub</a>',
    portfolio: {
      title: 'Sitio Web de Portafolio',
      description: 'Un sitio web de portafolio moderno y responsivo construido con React, TypeScript y Tailwind CSS. Incluye soporte para modo oscuro, capacidades multilingües (inglés y español), animaciones suaves con Framer Motion y un diseño limpio y profesional. El sitio web muestra mis proyectos, experiencia e intereses de una manera interactiva y atractiva.'
    },
    vocalmind: {
      title: 'VocalMind',
      description: 'Un sistema basado en aprendizaje automático que detecta depresión y ansiedad a través del análisis de voz, utilizando espectrogramas de audio y características adicionales para predecir estados emocionales. Diseñado para la detección temprana y el apoyo a la salud mental.'
    },
    neuralcrime: {
      title: 'NeuralCrime',
      description: 'Un sistema de análisis y predicción de delitos basado en datos para Los Ángeles, utilizando registros de delitos disponibles públicamente desde 2020 hasta el presente. El proyecto involucra extracción, procesamiento, visualización y modelado predictivo de datos para identificar patrones y tendencias de delitos, ayudando en la toma de decisiones informadas y las iniciativas de seguridad pública.'
    },
    seniortraining: {
      title: 'SeniorTrAIning',
      description: 'Una plataforma gamificada que mejora la salud cognitiva en adultos mayores mientras recopila datos no personales de manera ética para entrenar modelos de IA. Reconocido con el Premio a la Innovación en el Hackathon OdiseIA4Good.'
    },
    niote: {
      title: 'NioTe',
      description: 'NioTe es un modelo de simulación de datos climáticos diseñado para apoyar el desarrollo de proyectos IoT. Al aprovechar los datos climáticos de código abierto de fuentes confiables como Datos Abiertos Colombia y aplicar controles de calidad, permite la generación realista de datos para regiones específicas de Colombia. Utilizando técnicas de Machine Learning, NioTe captura patrones de datos climáticos históricos para crear conjuntos de datos sintéticos que imitan el comportamiento del clima del mundo real.'
    },
    aereousb: {
      title: 'AereoUSB',
      description: 'AereoUSB es un sistema de gestión de aerolíneas basado en Java desarrollado como parte de un curso de Estructuras de Datos. El proyecto aprovecha varias estructuras de datos para manejar eficientemente recursos clave de la aerolínea, incluyendo flota, tripulación, pilotos y vuelos. Al asegurar una comunicación clara y estructurada entre agentes y clientes, AereoUSB mejora la compra de boletos, optimiza las operaciones y proporciona un marco confiable de gestión de datos para los servicios de la aerolínea.'
    },
    tags: {
      portfolio: {
        react: 'React',
        typescript: 'TypeScript',
        tailwind: 'Tailwind CSS',
        framer: 'Framer Motion',
        i18n: 'i18next',
        responsive: 'Diseño Responsivo'
      },
      vocalmind: {
        python: 'Python',
        ml: 'Aprendizaje Automático',
        audio: 'Análisis de Audio',
        data: 'Análisis de Datos',
        health: 'Salud Mental'
      },
      neuralcrime: {
        python: 'Python',
        pyspark: 'PySpark',
        spark: 'Apache Spark',
        pipeline: 'Pipeline',
        etl: 'ETL',
        ml: 'Aprendizaje Automático',
        analysis: 'Análisis de Datos',
        prediction: 'Modelado Predictivo',
        safety: 'Seguridad Pública'
      },
      seniortraining: {
        python: 'Python',
        ml: 'Aprendizaje Automático',
        gamification: 'Gamificación',
        health: 'Tecnología de Salud',
        ethics: 'Ética en IA'
      },
      niote: {
        python: 'Python',
        sql: 'SQL',
        ml: 'Aprendizaje Automático',
        iot: 'IoT',
        climate: 'Datos Climáticos',
        simulation: 'Simulación'
      },
      aereousb: {
        java: 'Java',
        structures: 'Estructuras de Datos',
        management: 'Sistema de Gestión'
      }
    }
  },
  interests: {
    title: 'Intereses y Pasiones',
    comingSoon: 'Próximamente',
    sections: {
      interests: {
        title: 'Intereses',
        description: 'Explorando nuevas tecnologías y su impacto en la sociedad'
      },
      likes: {
        title: 'Gustos',
        description: 'Una colección de cosas que me inspiran y motivan'
      },
      passions: {
        title: 'Pasiones',
        description: 'Lo que me impulsa hacia adelante y me mantiene motivado'
      },
      hobbies: {
        title: 'Pasatiempos',
        description: 'Actividades que me ayudan a mantener el equilibrio entre trabajo y vida'
      }
    },
    hobbies: {
      title: 'Pasatiempos',
      sports: 'Deportes',
      music: 'Música',
      painting: 'Pintura',
      description: 'Actividades físicas, escuchar música y expresarme a través del arte. Estas actividades me ayudan a desconectarme, mantenerme energizado y expresarme.'
    },
    interests: {
      title: 'Intereses',
      photography: 'Fotografía',
      cooking: 'Cocina',
      traveling: 'Viajes',
      description: 'Capturar momentos y crear experiencias culinarias. Comparto varios tipos de fotos en mi cuenta personal de Instagram, <a href="https://www.instagram.com/pocket._.lens/" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">@pocket._.lens</a>, incluyendo paisajes, retratos, escenas urbanas y composiciones creativas.'
    },
    passions: {
      title: 'Pasiones',
      programming: 'Programación',
      dataScience: 'Entusiasta de datos',
      aeronautic: 'Aeronáutica',
      astronomy: 'Astronomía',
      description: 'Construir soluciones, analizar datos y explorar el mundo.'
    }
  },
  contact: {
    title: 'Contacto',
    description: 'No dudes en contactarme para cualquier pregunta. Si quieres seguir mi trabajo, encuéntrame en GitHub. También puedes enviarme un email a',
    location: 'Madrid, España'
  },
  footer: {
    copyright: 'Copyright © Camilo Diaz 2025',
    credits: 'Inspirado por',
    theme: {
      light: 'Modo Claro',
      dark: 'Modo Oscuro'
    },
    language: {
      en: 'Inglés',
      es: 'Español'
    }
  }
};