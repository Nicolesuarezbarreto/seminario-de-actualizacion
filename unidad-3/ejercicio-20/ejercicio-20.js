class ModeloImagen extends EventTarget {
    constructor() {
        super();
        this.x = 100;
        this.y = 80;
        this.imagen = null;
    }

    asignarImagen(imagenCargada) {
        this.imagen = imagenCargada;
        this.dispatchEvent(new CustomEvent('imagen-disponible'));
    }
}

class ControladorImagen {
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
        this.vista.dibujar(this.modelo.imagen, this.modelo.x, this.modelo.y);
    }
}


class VistaImagen extends HTMLElement {
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
        this.parrafo.textContent = 'Ejercicio 20: Cargando imagen...';

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

        imagen.src = 'perro.jpg';
    }

    dibujar(imagen, x, y) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(imagen, x, y);
        this.parrafo.textContent = 'Imagen cargada con new Image() y dibujada en (' + x + ', ' + y + ')';
    }

    mostrarError() {
        this.parrafo.textContent = 'Error: No se encontró "foto.jpg" en la carpeta.';
    }
}

window.customElements.define('x-ejercicio-20', VistaImagen);

function iniciarEjercicio20() {
    var modelo = new ModeloImagen();
    var vista = document.querySelector('x-ejercicio-20');
    var controlador = new ControladorImagen(modelo, vista);
    controlador.activar();
}

window.addEventListener('load', iniciarEjercicio20);