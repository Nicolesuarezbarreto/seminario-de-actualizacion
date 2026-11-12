class ModeloFiltrosImagen extends EventTarget {
    constructor() {
        super();
        this.imagen = null;
        this.filtros = 'brightness(120%) contrast(150%) blur(2px)';
        this.posicionX = 50;
        this.posicionY = 50;
    }

    asignarImagen(imagenCargada) {
        this.imagen = imagenCargada;
        this.dispatchEvent(new CustomEvent('imagen-lista'));
    }

    obtenerFiltros() {
        return this.filtros;
    }
}

class ControladorFiltrosImagen {
    constructor(modelo, vista) {
        this.modelo = modelo;
        this.vista = vista;

        this.alImagenLista = this.alImagenLista.bind(this);
        this.alTerminarCarga = this.alTerminarCarga.bind(this);
        this.alFallarCarga = this.alFallarCarga.bind(this);
    }

    activar() {
        this.modelo.addEventListener('imagen-lista', this.alImagenLista);
        this.vista.iniciarCarga(this.alTerminarCarga, this.alFallarCarga);
    }

    alTerminarCarga(imagen) {
        this.modelo.asignarImagen(imagen);
    }

    alFallarCarga() {
        this.vista.mostrarError();
    }

    alImagenLista() {
        this.vista.dibujarConFiltros(
            this.modelo.imagen,
            this.modelo.posicionX,
            this.modelo.posicionY,
            this.modelo.obtenerFiltros()
        );
    }
}

class VistaFiltrosImagen extends HTMLElement {
    constructor() {
        super();
        var sombra = this.attachShadow({ mode: 'open' });

        var estilos = document.createElement('style');
        estilos.textContent = `
            :host { display: block; font-family: sans-serif; padding: 20px; }
            canvas { border: 2px solid #333; background: #ffffff; display: block; }
            p { color: #555; font-size: 14px; margin-bottom: 10px; }
            .info-filtros {
                background: #f0f4f8;
                padding: 10px;
                border-radius: 6px;
                margin-bottom: 15px;
                font-size: 13px;
            }
        `;

        this.parrafo = document.createElement('p');
        this.parrafo.textContent = 'Ejercicio 25: Cargando imagen con filtros...';

        this.infoFiltros = document.createElement('div');
        this.infoFiltros.className = 'info-filtros';
        this.infoFiltros.textContent = 'Filtros aplicados: brightness(120%) + contrast(150%) + blur(2px)';

        this.canvas = document.createElement('canvas');
        this.canvas.width = 700;
        this.canvas.height = 500;
        this.ctx = this.canvas.getContext('2d');

        sombra.appendChild(estilos);
        sombra.appendChild(this.parrafo);
        sombra.appendChild(this.infoFiltros);
        sombra.appendChild(this.canvas);
    }

    iniciarCarga(alTerminar, alFallar) {
        var imagen = new Image();

        imagen.onload = function() {
            alTerminar(imagen);
        };
        imagen.onerror = function() {
            alFallar();
        };

        imagen.src = 'perroFluffy.jpg';
    }

    dibujarConFiltros(imagen, x, y, cadenaFiltros) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);


        this.ctx.save();
        this.ctx.filter = cadenaFiltros;
        this.ctx.drawImage(imagen, x, y, 300, 250);
        this.ctx.restore();
        this.ctx.beginPath();
        this.ctx.arc(500, 200, 80, 0, 2 * Math.PI);
        this.ctx.fillStyle = '#3b82f6';
        this.ctx.fill();
        this.ctx.strokeStyle = '#1e3a8a';
        this.ctx.lineWidth = 3;
        this.ctx.stroke();

        this.ctx.font = '14px sans-serif';
        this.ctx.fillStyle = '#333';
        this.ctx.fillText('Círculo SIN filtros (restore() funcionó)', 420, 310);

        this.parrafo.textContent = 'Imagen con filtros aplicada. Círculo dibujado sin filtros.';
    }

    mostrarError() {
        this.parrafo.textContent = 'Error: No se encontró "foto.jpg" en la carpeta.';
    }
}

window.customElements.define('x-ejercicio-25', VistaFiltrosImagen);


function iniciarEjercicio25() {
    var modelo = new ModeloFiltrosImagen();
    var vista = document.querySelector('x-ejercicio-25');
    var controlador = new ControladorFiltrosImagen(modelo, vista);
    controlador.activar();
}

window.addEventListener('load', iniciarEjercicio25);