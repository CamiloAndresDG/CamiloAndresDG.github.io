import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { folder } = req.query;

  if (!folder || typeof folder !== 'string') {
    return res.status(400).json({ error: 'Folder parameter is required' });
  }

  try {
    const publicPath = path.join(process.cwd(), 'public');
    const folderPath = path.join(publicPath, 'images', folder);

    // Verificar si la carpeta existe
    if (!fs.existsSync(folderPath)) {
      return res.status(404).json({ error: 'Folder not found' });
    }

    // Leer los archivos de la carpeta
    const files = fs.readdirSync(folderPath);

    // Filtrar solo archivos de imagen
    const imageFiles = files.filter(file => {
      const ext = path.extname(file).toLowerCase();
      return ['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext);
    });

    // Crear URLs para las imágenes
    const images = imageFiles.map(file => `/images/${folder}/${file}`);

    res.status(200).json({ images });
  } catch (error) {
    console.error('Error reading images:', error);
    res.status(500).json({ error: 'Error reading images' });
  }
} 