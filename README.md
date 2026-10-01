# Portafolio Web Samuel

Este es mi portafolio web personal, creado para mostrar mis proyectos, habilidades y tecnologías como estudiante de Ingeniería de Sistemas.

## Demo en vivo

🔗 **[portafolio-web-samuel.vercel.app](https://portafolio-web-samuel.vercel.app/)**

## Descripción

El proyecto es una página web personal estática desarrollada con HTML, CSS y JavaScript, sin frameworks ni dependencias.

Su objetivo es presentar mi perfil, mi ruta de aprendizaje, mis certificaciones, mis tecnologías y mis proyectos destacados.

## Diseño

- Identidad visual en negro y dorado champagne, con colores y tipografías centralizados en `css/tokens.css`.
- Intro animada con el monograma SL y frases en japonés (una sola vez por sesión; se puede saltar con clic o `Esc`).
- Navegación con indicador de sección activa, menú móvil a pantalla completa y botón para volver arriba.
- Animaciones ligadas al scroll: títulos que aparecen palabra por palabra, texto que se ilumina al bajar, línea de tiempo y venas doradas tipo kintsugi.
- Diseño responsive y compatible con `prefers-reduced-motion`.
- Tipografías: Cormorant Garamond, Inter, JetBrains Mono y Noto Serif JP (Google Fonts).

## Tecnologías utilizadas

- HTML
- CSS
- JavaScript
- Git
- GitHub

## Secciones del portafolio

- Inicio
- Sobre mí
- Ruta de aprendizaje
- Certificaciones
- Tecnologías
- Proyectos
- Contacto

## Ruta de aprendizaje

Actualmente estoy fortaleciendo conocimientos en:

- Desarrollo web con HTML, CSS y JavaScript
- Backend con Java y Spring Boot, y Node.js con Express
- Bases de datos relacionales y no relacionales
- Python para análisis de datos
- Git y GitHub
- Inteligencia artificial aplicada

## Objetivo del proyecto

Crear una página personal para presentar mi perfil profesional y tener una base donde pueda agregar futuros proyectos académicos, personales y de aprendizaje.

## Estructura del proyecto

```text
portafolio-web-samuel/
│
├── index.html
├── README.md
├── css/
│   ├── tokens.css        # colores, tipografías y medidas
│   ├── base.css          # reset y estilos globales
│   ├── components.css    # intro, navegación, botones
│   └── sections.css      # hero, secciones y animaciones de scroll
├── js/
│   ├── main.js           # navegación, menú móvil y reveals
│   ├── intro.js          # intro SL
│   └── scroll.js         # animaciones ligadas al scroll
└── assets/
    ├── favicon.svg
    ├── img/
    │   ├── logo-sl.webp
    │   ├── perfil-hero.webp
    │   └── perfil.jpg
    └── docs/
        ├── Samuel_Rodolfo_Diaz_Licht_CV.pdf
        ├── AWS_Cloud_Practitioner_Essentials_ESP_LATAM.pdf
        └── Aspectos_basico_del_analisis_en_AWS_Parte_1.pdf
```

## Cómo ejecutar el proyecto

1. Clonar el repositorio:

```bash
git clone https://github.com/samuelLicht/portafolio-web-samuel.git
```

2. Entrar a la carpeta del proyecto:

```bash
cd portafolio-web-samuel
```

3. Servir la carpeta con un servidor local (el sitio usa módulos de JavaScript, que no funcionan al abrir `index.html` directamente con `file://`). Cualquiera de estas opciones sirve:

```bash
python -m http.server 8080
```

o abrir la carpeta en VS Code y usar la extensión Live Server.

4. Abrir `http://localhost:8080` en el navegador.

## Actualizaciones del proyecto

- Se creó la estructura inicial del portafolio.
- Se agregó una sección de ruta de aprendizaje.
- Se documentaron tecnologías, objetivos y estructura del proyecto.
- Se publicó el portafolio con GitHub Pages.
- Se desplegó el portafolio en Vercel.
- Se agregó botón de descarga de CV.
- Se rediseñó la interfaz completa con identidad negro y dorado.
- Se agregó intro animada con el monograma SL y frases en japonés.
- Se agregó sección de certificaciones.
- Se agregaron animaciones de scroll, menú móvil y botón para volver arriba.

## Autor

Samuel Licht
