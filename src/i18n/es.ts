export default {
  header: {
    home: 'Inicio',
    about: 'Sobre Mí',
    experience: 'Experiencia',
    projects: 'Proyectos',
    contact: 'Contacto'
  },
  intro: {
    title: '👋 ¡Hola! Soy ingeniero de datos bilingüe especializado en ETL, aprendizaje automático y soluciones en la nube. He trabajado en diversas industrias, desarrollando soluciones escalables basadas en datos. Siempre aprendiendo, siempre innovando. 💡',
    description: 'Implementando transformación y visualización de datos con paneles interactivos.'
  },
  about: {
    title: 'Sobre Mí',
    greeting: 'Hola, soy Camilo Diaz.',
    description1: 'Ayudo a empresas e investigadores a analizar, transformar y visualizar sus datos. Mi experiencia se centra en ingeniería de datos, procesos ETL y machine learning, asegurando que los insights no solo sean precisos sino también efectivamente comunicados. Si necesitas orientación para construir pipelines de datos escalables o crear visualizaciones convincentes, estoy aquí para ayudar.',
    description2: 'Con más de tres años de experiencia en ciencia e ingeniería de datos, he trabajado como consultor para industrias como finanzas, salud y telecomunicaciones. Actualmente estoy cursando un máster en Ciencia de Datos, Big Data e IA en la Universidad Complutense de Madrid mientras trabajo como consultor, expandiendo continuamente mi experiencia en análisis avanzado y soluciones basadas en datos.'
  },
  experience: {
    title: 'Experiencia Laboral',
    qaracter: {
      title: 'Business Consultant',
      period: 'Sept 2024 - Presente',
      description: 'Implementando transformación y visualización de datos con paneles interactivos.'
    },
    publicis: {
      title: 'Associate Data Engineering L2',
      period: 'Oct 2023 - Sept 2024',
      description: 'Diseñé y modernicé la arquitectura de datos para el sector salud, optimizando los procesos ETL.'
    },
    ey: {
      title: 'Data & Analytics Consultant',
      period: 'Ene 2022 - Oct 2023',
      description: 'Desarrollé soluciones para el procesamiento de datos estructurados, no estructurados y geoespaciales, implementando Machine Learning y optimizando los tiempos de procesamiento.'
    }
  },
  projects: {
    featured: {
      title: 'Proyecto Destacado',
      description: 'Una plataforma gamificada que mejora la salud cognitiva en adultos mayores mientras recopila éticamente datos no personales para entrenar modelos de IA. Reconocido con el Premio a la Innovación en el Hackathon OdiseIA4Good.'
    },
    title: 'Proyectos Personales',
    viewProject: 'Ver Proyecto',
    viewOnGithub: 'Ver en GitHub',
    projects: [
      {
        title: "VocalMind",
        description: "Un sistema basado en machine learning que detecta depresión y ansiedad a través del análisis de voz, utilizando espectrogramas de audio y características adicionales para predecir estados emocionales. Diseñado para la detección temprana y el apoyo a la salud mental.",
        github: "https://github.com/CamiloAndresDG/Speech_Recognition",
        tags: ["Machine Learning", "Análisis de Audio", "Salud Mental"]
      },
      {
        title: "NeuralCrime",
        description: "Un sistema de análisis y predicción de delitos para Los Ángeles, aprovechando registros de delitos disponibles públicamente desde 2020 hasta la actualidad. El proyecto involucra extracción de datos, procesamiento, visualización y modelado predictivo para identificar patrones y tendencias delictivas, ayudando en la toma de decisiones informada y las iniciativas de seguridad pública.",
        github: "https://github.com/CamiloAndresDG/Crime_Prediction_LA",
        tags: ["Análisis de Datos", "Modelado Predictivo", "Seguridad Pública"]
      },
      {
        title: "NioTe",
        description: "NioTe es un modelo de simulación de datos climáticos diseñado para apoyar el desarrollo de proyectos IoT. Aprovechando datos climáticos de código abierto de fuentes confiables como Datos Abiertos Colombia y aplicando controles de calidad, permite la generación de datos realistas para regiones específicas en Colombia. Utilizando técnicas de Machine Learning, NioTe captura patrones de datos climáticos históricos para crear conjuntos de datos sintéticos que imitan el comportamiento climático del mundo real.",
        github: "https://github.com/CamiloAndresDG/NIOTE",
        tags: ["IoT", "Datos Climáticos", "Simulación"]
      },
      {
        title: "AereoUSB",
        description: "AereoUSB es un sistema de gestión de aerolíneas desarrollado en Java como parte de un curso de Estructuras de Datos. El proyecto aprovecha varias estructuras de datos para manejar eficientemente los recursos clave de la aerolínea, incluyendo flota, tripulación, pilotos y vuelos. Al garantizar una comunicación clara y estructurada entre agentes y clientes, AereoUSB mejora la compra de boletos, optimiza las operaciones y proporciona un marco confiable de gestión de datos para servicios aéreos.",
        github: "https://github.com/CamiloAndresDG/AereoUSB",
        tags: ["Java", "Estructuras de Datos", "Sistema de Gestión"]
      }
    ]
  },
  contact: {
    title: 'Contacto',
    description: 'No dudes en contactarme para cualquier pregunta. Si quieres seguir mi trabajo, encuéntrame en GitHub. También puedes enviarme un email a',
    location: 'Madrid, España'
  },
  footer: {
    copyright: 'Copyright © Camilo Díaz 2025',
    privacy: 'Política de Privacidad',
    terms: 'Términos de Uso',
    credits: 'Inspirado por',
    theme: {
      light: 'Modo Claro',
      dark: 'Modo Oscuro'
    }
  }
};