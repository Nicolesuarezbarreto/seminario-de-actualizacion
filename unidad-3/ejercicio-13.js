class ComponenteDeslizador extends HTMLElement {
    constructor() {
        super();
        var sombra = this.attachShadow({ mode: 'open' });
        
        var contenedor = document.createElement('div');
        contenedor.style.marginBottom = '15px';
        contenedor.style.fontFamily = 'sans-serif';

        var cabecera = document.createElement('div');
        cabecera.style.display = 'flex';
        cabecera.style.justifyContent = 'space-between';
        cabecera.style.fontWeight = 'bold';
        cabecera.style.marginBottom = '5px';

        this.etiqueta = document.createElement('label');
        this.valorTexto = document.createElement('span');
        this.valorTexto.textContent = '0';
        this.valorTexto.style.color = '#555';

        cabecera.appendChild(this.etiqueta);
        cabecera.appendChild(this.valorTexto);

        this.entrada = document.createElement('input');
        this.entrada.type = 'range';
        this.entrada.min = '0';
        this.entrada.max = '255';
        this.entrada.value = '0';
        this.entrada.style.width = '100%';
        this.entrada.style.cursor = 'pointer';

        var self = this;
        this.entrada.addEventListener('input', function(evento) {
            self.valorTexto.textContent = evento.target.value;
            self.dispatchEvent(new CustomEvent('cambio-deslizador', {
                detail: { canal: self._canal, valor: evento.target.value }
            }));
        });

        contenedor.appendChild(cabecera);
        contenedor.appendChild(this.entrada);
        sombra.appendChild(contenedor);
        
        this._canal = '';
    }

    configurar(canal, textoVisible) {
        this._canal = canal;
        this.etiqueta.textContent = textoVisible;
    }
}
window.customElements.define('x-deslizador-rgb', ComponenteDeslizador);


class ModeloTableroAjedrez extends EventTarget {
    constructor() {
        super();
        this.estadoColor = { r: 0, g: 0, b: 0 };
    }

    actualizarColor(canal, valor) {
        this.estadoColor[canal] = parseInt(valor);
        this.dispatchEvent(new CustomEvent('modelo-actualizado'));
    }

    obtenerStringRGB() {
        return 'rgb(' + this.estadoColor.r + ', ' + this.estadoColor.g + ', ' + this.estadoColor.b + ')';
    }
}

class Ejercicio13Principal extends HTMLElement {
    constructor() {
        super();
        var sombra = this.attachShadow({ mode: 'open' });
        this.modelo = new ModeloTableroAjedrez();

        var estilos = document.createElement('style');
        estilos.textContent = `
            :host { display: block; font-family: 'Segoe UI', sans-serif; padding: 20px; }
            .contenedor-flex { display: flex; gap: 30px; align-items: flex-start; }
            .panel-control { background: #f0f4f8; padding: 20px; border-radius: 8px; border: 1px solid #cbd5e1; min-width: 200px; }
            canvas { border: 3px solid #1e293b; background: #ffffff; display: block; }
        `;

        var contenedor = document.createElement('div');
        contenedor.className = 'contenedor-flex';

        var panel = document.createElement('div');
        panel.className = 'panel-control';

        this.canvas = document.createElement('canvas');
        this.canvas.width = 256;
        this.canvas.height = 256; 
        this.ctx = this.canvas.getContext('2d');

        this.sliderR = document.createElement('x-deslizador-rgb');
        this.sliderR.configurar('r', 'Nivel Rojo');
        
        this.sliderG = document.createElement('x-deslizador-rgb');
        this.sliderG.configurar('g', 'Nivel Verde');
        
        this.sliderB = document.createElement('x-deslizador-rgb');
        this.sliderB.configurar('b', 'Nivel Azul');

        panel.appendChild(this.sliderR);
        panel.appendChild(this.sliderG);
        panel.appendChild(this.sliderB);

        contenedor.appendChild(panel);
        contenedor.appendChild(this.canvas);
        
        sombra.appendChild(estilos);
        sombra.appendChild(contenedor);

        var self = this;

        this.sliderR.addEventListener('cambio-deslizador', function(evento) { self._manejarCambio(evento); });
        this.sliderG.addEventListener('cambio-deslizador', function(evento) { self._manejarCambio(evento); });
        this.sliderB.addEventListener('cambio-deslizador', function(evento) { self._manejarCambio(evento); });

        this.modelo.addEventListener('modelo-actualizado', function() { self._dibujarTablero(); });

        this._dibujarTablero();
    }

    _manejarCambio(evento) {
        var datos = evento.detail;
        this.modelo.actualizarColor(datos.canal, datos.valor);
    }

    _dibujarTablero() {
        var colorDinamico = this.modelo.obtenerStringRGB();
        var tamano = 32;
        var limite = 8;
        
        this.ctx.clearRect(0, 0, 256, 256);

        for (var f = 0; f < limite; f++) {
            for (var c = 0; c < limite; c++) {
                var esDinamica = (f + c) % 2 !== 0;
                
                this.ctx.fillStyle = esDinamica ? colorDinamico : '#ffffff';
                this.ctx.fillRect(c * tamano, f * tamano, tamano, tamano);
            }
        }
    }
}
window.customElements.define('x-ejercicio-13', Ejercicio13Principal);