# Bombón by Caro Zermeño — Sitio web escolar

Sitio **estático y demostrativo** de una galletería y pastelería artesanal en San Luis Potosí.
Es un proyecto académico: no tiene base de datos, servidor ni pagos reales. El formulario de pedido solo muestra un resumen en pantalla.

**Tecnologías:** HTML5, CSS3, JavaScript, Bootstrap 5.3 y Bootstrap Icons (por CDN), Google Fonts.

## Cómo abrirlo

Abre `index.html` en el navegador (o usa la extensión *Live Server* de VS Code).

## Estructura de carpetas

```
bombon-by-caro-zermeno/
├── index.html              ← Página 1: Inicio
├── README.md
├── css/
│   └── styles.css          ← Estilos globales (variables de color, componentes y estilos por página)
├── js/
│   └── app.js              ← Año del pie de página, imágenes de respaldo, animaciones,
│                             filtros del menú y formulario de pedido demostrativo
├── paginas/
│   ├── menu.html           ← Página 2: Menú
│   ├── sucursales.html     ← Página 3: Sucursales
│   ├── nuestra-historia.html ← Página 4: Nuestra Historia
│   └── pide-aqui.html      ← Página 5: Pide Aquí
└── assets/
    └── img/
        ├── comun/          ← Logotipo (se usa en todas las páginas)
        ├── inicio/         ← Imágenes del index (hero y destacados)
        ├── menu/           ← Una foto por producto (galleta-*.png, postre-*.png)
        ├── sucursales/     ← Mapas de cada sucursal
        ├── historia/       ← Fotos de Caro para Nuestra Historia
        └── pide-aqui/      ← Íconos de métodos de pago
```

**Convención de imágenes:** nombres en minúsculas, separados por guiones y descriptivos
(ej. `galleta-pistache-frambuesa.png`). Todas las imágenes tienen atributo `alt`.

## Las 5 páginas

| # | Página | Archivo | Contenido |
|---|--------|---------|-----------|
| 1 | Inicio | `index.html` | Hero, cinta de sabores, 3 productos destacados, "Tu antojo en 3 pasos", accesos rápidos, sucursales y redes. |
| 2 | Menú | `paginas/menu.html` | Galleta del mes y vitrina de 25 productos con filtro por categoría (clásicas, rellenas, gourmet, postres). |
| 3 | Sucursales | `paginas/sucursales.html` | Sucursales Lomas y Polanco con mapa, horario, servicios y enlace "Cómo llegar". |
| 4 | Nuestra Historia | `paginas/nuestra-historia.html` | Presentación de Caro, línea del tiempo, galería y valores de la marca. |
| 5 | Pide Aquí | `paginas/pide-aqui.html` | Cajas por ocasión, formulario de pedido demostrativo y métodos de pago. |

## Navegación

Todas las páginas comparten la misma plantilla:

- **Encabezado** con logotipo y menú principal (la página actual se marca como activa).
- **Migas de pan** (Inicio › Página) en cada subpágina.
- **Navegación anterior / siguiente** al final de cada subpágina: Inicio → Menú → Sucursales → Nuestra Historia → Pide Aquí → Inicio.
- **Pie de página** con enlaces a las 5 páginas.

Las subpáginas usan rutas relativas con `../` para llegar a `css/`, `js/` y `assets/`.
