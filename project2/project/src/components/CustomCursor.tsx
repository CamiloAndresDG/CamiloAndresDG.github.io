import { useEffect } from 'react';

export default function CustomCursor() {
  useEffect(() => {
    // Restablecer el cursor al predeterminado cuando se monta el componente
    document.body.style.cursor = 'default';

    return () => {
      // Asegurarse de que al desmontar también se restaure el cursor
      document.body.style.cursor = 'default';
    };
  }, []);

  return null;
}
