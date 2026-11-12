class ModeloImagenEscalada extends EventTarget {
    constructor() {
        super();
        this.anchoCanvas = 600;
        this.altoCanvas = 400;
        this.imagen = null;
    }

    asignarImagen(imagenCargada) {
        this.imagen = imagenCargada;
        this.dispatchEvent(new CustomEvent('imagen-disponible'));
    }
}

class ControladorImagenEscalada {
    constructor(modelo, vista) {
        this.modelo = modelo;
        this.vista = vista;

        this.alCargarImagen = this.alCargarImagen.bind(this);
        this.alTerminarCarga = this.alTerminarCarga.bind(this);
        this.alFallarCarga = this.alFallarCarga.bind(this);
    }

    activar() {
        this.modelo.addEventListener('imagen-disponible', this.alCargarImagen);
        this.vista.iniciarCarga(this.alTerminarCarga, this.alFallarCarga);
    }

    alTerminarCarga(imagen) {
        this.modelo.asignarImagen(imagen);
    }

    alFallarCarga() {
        this.vista.mostrarError();
    }

    alCargarImagen() {
        this.vista.dibujarEscalada(
            this.modelo.imagen, 
            this.modelo.anchoCanvas, 
            this.modelo.altoCanvas
        );
    }
}

class VistaImagenEscalada extends HTMLElement {
    constructor() {
        super();
        var sombra = this.attachShadow({ mode: 'open' });

        var estilos = document.createElement('style');
        estilos.textContent = `
            :host { display: block; font-family: sans-serif; padding: 20px; }
            canvas { border: 2px solid #333; background: #ffffff; display: block; }
            p { color: #555; font-size: 14px; margin-bottom: 10px; }
        `;

        this.parrafo = document.createElement('p');
        this.parrafo.textContent = 'Ejercicio 21: Cargando imagen...';

        this.canvas = document.createElement('canvas');
        this.canvas.width = 600;
        this.canvas.height = 400;
        this.ctx = this.canvas.getContext('2d');

        sombra.appendChild(estilos);
        sombra.appendChild(this.parrafo);
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

        imagen.src = 'fluffy.jpg';
    }

    dibujarEscalada(imagen, ancho, alto) {
        this.ctx.drawImage(imagen, 0, 0, ancho, alto);
        this.parrafo.textContent = 'Imagen escalada para ocupar todo el canvas (' + ancho + 'x' + alto + ')';
    }

    mostrarError() {
        this.parrafo.textContent = 'Error: No se encontró "fluffy.jpg" en la carpeta.';
    }
}

window.customElements.define('x-ejercicio-21', VistaImagenEscalada);

function iniciarEjercicio21() {
    var modelo = new ModeloImagenEscalada();
    var vista = document.querySelector('x-ejercicio-21');
    var controlador = new ControladorImagenEscalada(modelo, vista);
    controlador.activar();
}

window.addEventListener('load', iniciarEjercicio21);