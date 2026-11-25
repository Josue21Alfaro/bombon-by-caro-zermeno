/* =========================================================
   BOMBÓN BY CARO ZERMEÑO - LÓGICA GLOBAL
   Proyecto escolar: todo es demostrativo y se ejecuta
   únicamente en el navegador (sin servidor ni pagos reales).
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
  actualizarAnioFooter();
  configurarRespaldoImagenes();
  activarAnimacionesAlDesplazar();
  configurarFiltrosMenu();
  configurarFormularioPedido();
  configurarSeleccionadorCombos();
});

/**
 * Pide aquí: seleccionador animado de cajas.
 * - Al pasar el cursor (o enfocar con teclado) sobre una caja, se activa
 *   la animación de selección (clase .is-selected).
 * - Al hacer clic (o Enter/Espacio), esa caja se elige en el formulario.
 */
function configurarSeleccionadorCombos() {
  const tarjetas = document.querySelectorAll('.combo-card[data-combo]');
  const selectCombo = document.getElementById('combo');
  if (!tarjetas.length) return;

  const activar = (tarjeta) => {
    tarjetas.forEach((t) => t.classList.toggle('is-selected', t === tarjeta));
  };

  const elegir = (tarjeta) => {
    activar(tarjeta);
    if (selectCombo) {
      selectCombo.value = tarjeta.dataset.combo;
      selectCombo.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  tarjetas.forEach((tarjeta) => {
    tarjeta.addEventListener('mouseenter', () => activar(tarjeta));
    tarjeta.addEventListener('focus', () => activar(tarjeta));
    tarjeta.addEventListener('click', () => elegir(tarjeta));
    tarjeta.addEventListener('keydown', (evento) => {
      if (evento.key === 'Enter' || evento.key === ' ') {
        evento.preventDefault();
        elegir(tarjeta);
      }
    });
  });
}

/**
 * Actualiza automáticamente el año en el pie de página.
 */
function actualizarAnioFooter() {
  const spanAnio = document.getElementById('anio-actual');
  if (spanAnio) {
    spanAnio.textContent = new Date().getFullYear();
  }
}

/**
 * Si una imagen no se encuentra, la reemplaza por un SVG rosa
 * provisional con el texto de data-fallback (evita iconos rotos).
 */
function configurarRespaldoImagenes() {
  const imagenes = document.querySelectorAll('img[data-fallback]');

  imagenes.forEach((img) => {
    img.addEventListener('error', function manejarErrorImagen() {
      const etiqueta = this.getAttribute('data-fallback') || 'Bombón';
      const svgProvisional = `
        <svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600">
          <rect width="600" height="600" fill="#FDE4EC"/>
          <circle cx="300" cy="260" r="95" fill="#E6286B" opacity="0.18"/>
          <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle"
                font-family="sans-serif" font-weight="bold" font-size="28" fill="#A8184B">${etiqueta}</text>
          <text x="50%" y="57%" dominant-baseline="middle" text-anchor="middle"
                font-family="sans-serif" font-size="18" fill="#380E1D">(Imagen provisional)</text>
        </svg>`.trim();

      this.src = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svgProvisional)}`;
      this.removeEventListener('error', manejarErrorImagen);
    });
  });
}

/**
 * Muestra suavemente los elementos con la clase .reveal
 * cuando entran en pantalla.
 */
function activarAnimacionesAlDesplazar() {
  const elementos = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    elementos.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observador = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
      if (entrada.isIntersecting) {
        entrada.target.classList.add('is-visible');
        observador.unobserve(entrada.target);
      }
    });
  }, { threshold: 0.15 });

  elementos.forEach((el) => observador.observe(el));
}

/**
 * Menú: filtra la vitrina por categoría usando data-categoria.
 * Solo se ejecuta si la página tiene botones [data-filtro].
 */
function configurarFiltrosMenu() {
  const botones = document.querySelectorAll('[data-filtro]');
  const productos = document.querySelectorAll('[data-categoria]');
  if (!botones.length) return;

  botones.forEach((boton) => {
    boton.addEventListener('click', () => {
      const filtro = boton.dataset.filtro;

      botones.forEach((b) => {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });
      boton.classList.add('active');
      boton.setAttribute('aria-pressed', 'true');

      productos.forEach((producto) => {
        const coincide = filtro === 'todas' || producto.dataset.categoria === filtro;
        producto.classList.toggle('is-hidden', !coincide);
      });
    });
  });
}

/**
 * Pide aquí: formulario DEMOSTRATIVO. No envía datos a ningún
 * servidor; solo valida los campos y muestra un resumen del pedido.
 */
function configurarFormularioPedido() {
  const formulario = document.getElementById('form-pedido');
  const resumen = document.getElementById('resumen-pedido');
  if (!formulario || !resumen) return;

  formulario.addEventListener('submit', (evento) => {
    evento.preventDefault();

    if (!formulario.checkValidity()) {
      formulario.classList.add('was-validated');
      return;
    }

    const datos = new FormData(formulario);
    const sabores = datos.getAll('sabores');

    resumen.innerHTML = '';
    const titulo = document.createElement('h3');
    titulo.className = 'h5 fw-bold';
    titulo.textContent = `¡Gracias, ${datos.get('nombre')}! Tu antojo quedó apartado 🍪`;

    const lista = document.createElement('ul');
    lista.className = 'mb-2';
    [
      `Combo: ${datos.get('combo')}`,
      `Sabores: ${sabores.length ? sabores.join(', ') : 'Sorpréndeme (selección de la casa)'}`,
      `Ocasión: ${datos.get('ocasion')}`,
      `Recoger en: ${datos.get('sucursal')} el ${datos.get('fecha')}`,
      `Pago: ${datos.get('pago')}`,
    ].forEach((texto) => {
      const li = document.createElement('li');
      li.textContent = texto;
      lista.appendChild(li);
    });

    const nota = document.createElement('p');
    nota.className = 'small mb-0';
    nota.textContent = 'Este es un pedido de demostración (proyecto escolar): no se realizó ningún cargo ni envío de datos.';

    resumen.append(titulo, lista, nota);
    resumen.hidden = false;
    resumen.scrollIntoView({ behavior: 'smooth', block: 'center' });
    formulario.reset();
    formulario.classList.remove('was-validated');
  });
}
