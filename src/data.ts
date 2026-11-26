export interface Enlace {
  id: string
  titulo: string
  descripcion: string
  url: string
  icono: string
  color?: string
}

export interface Documento {
  id: string
  titulo: string
  descripcion: string
  archivo: string
  icono: string
  paginas?: number
  tamanio?: string
  color?: string
}

export interface Desarrollador {
  id: string
  nombre: string
  rol: string
  iniciales: string
  foto?: string
}

export const enlaces: Enlace[] = [
  {
    id: 'app',
    titulo: 'FoodTag App',
    descripcion: 'Plataforma principal. Gestiona tu restaurante, menú, pedidos, pagos y programa de sellos.',
    url: 'https://foodtag-app.netlify.app/',
    icono: '🍽️',
    color: '#e4572e',
  },
  {
    id: 'instagram',
    titulo: '@foodtag_official',
    descripcion: 'Cuenta oficial de FoodTag en Instagram. Novedades, contenido y actualizaciones del proyecto.',
    url: 'https://www.instagram.com/foodtag_official?avpt=MWFocDQ1MG42aG5x',
    icono: '📸',
    color: '#c2316a',
  },
  {
    id: 'video-presentacion',
    titulo: 'Video presentación',
    descripcion: 'Reel oficial de presentación de FoodTag: qué es, cómo funciona y para quién es.',
    url: 'https://www.instagram.com/reel/Df8f11lMXuG/?avpt=ZjRzNW5nem1ncndo',
    icono: '▶️',
    color: '#241c17',
  },
  {
    id: 'diferenciador',
    titulo: 'Lo que diferencia a FoodTag',
    descripcion: 'Reel sobre qué hace único a FoodTag frente a otras soluciones para restaurantes.',
    url: 'https://www.instagram.com/reel/DgA4cz3BJ8G/?cnvx=MXVmdHJrcW51ejlxMg==',
    icono: '⭐',
    color: '#d39b1f',
  },
]

export const documentos: Documento[] = [
  {
    id: 'guia-diseno',
    titulo: 'Guía de diseño',
    descripcion: 'Sistema visual completo: colores, tipografía, componentes, animaciones y plantilla base. 21 páginas.',
    archivo: 'docs/06-guia-diseno-foodtag.pdf',
    icono: '🎨',
    paginas: 21,
    tamanio: '2.1 MB',
    color: '#e4572e',
  },
  {
    id: 'especificaciones',
    titulo: 'Especificaciones técnicas',
    descripcion: 'Stack, arquitectura, base de datos (74 tablas), seguridad RLS, 247 pruebas automáticas y despliegue.',
    archivo: 'docs/07-especificaciones-tecnicas-foodtag.pdf',
    icono: '⚙️',
    paginas: 8,
    tamanio: '1.9 MB',
    color: '#1e2f4f',
  },
  {
    id: 'para-tu-marca',
    titulo: '¿Por qué FoodTag para tu marca?',
    descripcion: 'Para dueños de restaurantes: pedidos más rápidos, menos errores, pagos sin filas y clientes que vuelven.',
    archivo: 'docs/08-por-que-foodtag-para-tu-marca.pdf',
    icono: '📊',
    paginas: 7,
    tamanio: '1.1 MB',
    color: '#4d6340',
  },
]

export const desarrolladores: Desarrollador[] = [
  { id: 'lerman',  nombre: 'Lerman Maestre',  rol: 'Desarrollador',  iniciales: 'LM', foto: 'fotos/lerman.jpg' },
  { id: 'miguel',  nombre: 'Miguel Lima',     rol: 'Desarrollador',  iniciales: 'ML', foto: 'fotos/miguel.jpg' },
  { id: 'josue',   nombre: 'Josué Herrera',   rol: 'Desarrollador',  iniciales: 'JH' },
  { id: 'jose',    nombre: 'José Araujo',     rol: 'Desarrollador',  iniciales: 'JA' },
  { id: 'wilman',  nombre: 'Wilman Vega',     rol: 'Docente',        iniciales: 'WV' },
]
