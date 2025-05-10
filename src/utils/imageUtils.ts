// Función para obtener la lista de imágenes de una carpeta específica
export const getImagesFromFolder = async (folder: string): Promise<string[]> => {
  try {
    // En Vite, podemos usar import.meta.glob para cargar imágenes dinámicamente
    const images = import.meta.glob('/public/images/*/*.{png,jpg,jpeg,gif,webp}', { eager: true });
    
    // Filtrar las imágenes por la carpeta solicitada
    const folderImages = Object.entries(images)
      .filter(([path]) => path.includes(`/images/${folder}/`))
      .map(([path]) => path.replace('/public', ''));

    return folderImages;
  } catch (error) {
    console.error('Error al cargar imágenes:', error);
    return [];
  }
};

// Función para generar un objeto de imagen con la información necesaria
export const createImageObject = (url: string, category: string): {
  url: string;
  alt: string;
  description: string;
} => {
  // Extraer el nombre del archivo sin la extensión
  const fileName = url.split('/').pop()?.split('.')[0] || '';
  // Convertir el nombre del archivo a un formato más legible
  const readableName = fileName
    .split(/[-_]/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return {
    url,
    alt: readableName,
    description: `${readableName} - ${category}`
  };
}; 