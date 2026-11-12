class ModeloGradienteRadial extends EventTarget {
    constructor() {
        super();
        
        this.colorNucleo = '#ffcc00';
        this.colorPeriferia = '#cc00ff';
    }

    actualizarColores(nucleo, periferia) {
        this.colorNucleo = nucleo;
        this.colorPeriferia = periferia;
        this.dispatchEvent(new CustomEvent('estado-modificado'));
    }
}

class ComponenteEjercicio16 extends HTMLElement {
    constructor() {
        super();
        var sombra = this.attachShadow({ mode: 'open' });
        this.modelo = new ModeloGradienteRadial();

        var estilos = document.createElement('style');
        estilos.textContent = `
            :host { 
                display: block; 
                font-family: 'Segoe UI', sans-serif; 
                padding: 20px; 
            }
            .contenedor-flex { 
                display: flex; 
                gap: 30px; 
                align-items: flex-start; 
            }
            .panel-control { 
                background: #f0f4f8; 
                padding: 20px; 
                border-radius: 8px; 
                border: 1px solid #cbd5e1; 
                min-width: 200px; 
            }
            .grupo-input {
                margin-bottom: 15px;
                display: flex;
                flex-direction: column;
                gap: 5px;
            }
            .grupo-input label {
                font-weight: bold;
                font-size: 14px;
            }
            .grupo-input input {
                width: 100%;
                height: 40px;
                cursor: pointer;
                border: none;
            }
            canvas { 
                border: 3px solid #1e293b; 
                background: #ffffff; 
                display: block; 
            }
        `;

        var contenedor = document.createElement('div');
        contenedor.className = 'contenedor-flex';

        var panel = document.createElement('div');
        panel.className = 'panel-control';

        this.canvas = document.createElement('canvas');
        this.canvas.width = 400;
        this.canvas.height = 400;
        this.ctx = this.canvas.getContext('2d');

        var grupoNucleo = document.createElement('div');
        grupoNucleo.className = 'grupo-input';
        var labelNucleo = document.createElement('label');
        labelNucleo.textContent = 'Color Centro (Focal)';
        this.inputNucleo = document.createElement('input');
        this.inputNucleo.type = 'color';
        this.inputNucleo.value = '#ffcc00';
        grupoNucleo.appendChild(labelNucleo);
        grupoNucleo.appendChild(this.inputNucleo);

        var grupoPeriferia = document.createElement('div');
        grupoPeriferia.className = 'grupo-input';
        var labelPeriferia = document.createElement('label');
        labelPeriferia.textContent = 'Color Borde Exterior';
        this.inputPeriferia = document.createElement('input');
        this.inputPeriferia.type = 'color';
        this.inputPeriferia.value = '#cc00ff';
        grupoPeriferia.appendChild(labelPeriferia);
        grupoPeriferia.appendChild(this.inputPeriferia);

        panel.appendChild(grupoNucleo);
        panel.appendChild(grupoPeriferia);

        contenedor.appendChild(panel);
        contenedor.appendChild(this.canvas);
        
        sombra.appendChild(estilos);
        sombra.appendChild(contenedor);

        var self = this;

        this.inputNucleo.addEventListener('input', function() { self._manejarCambioUsuario(); });
        this.inputPeriferia.addEventListener('input', function() { self._manejarCambioUsuario(); });

        this.modelo.addEventListener('estado-modificado', function() { self._pintarCirculo(); });

        this._pintarCirculo();
    }

    _manejarCambioUsuario() {
        this.modelo.actualizarColores(this.inputNucleo.value, this.inputPeriferia.value);
    }

    _pintarCirculo() {
        var ancho = this.canvas.width;
        var alto = this.canvas.height;
        var centroX = ancho / 2;
        var centroY = alto / 2;
        var radio = 150;

        this.ctx.clearRect(0, 0, ancho, alto);

        var gradiente = this.ctx.createRadialGradient(
            centroX, centroY, 0,
            centroX, centroY, radio
        );

        gradiente.addColorStop(0, this.modelo.colorNucleo);
        gradiente.addColorStop(1, this.modelo.colorPeriferia);

        this.ctx.beginPath();
        this.ctx.arc(centroX, centroY, radio, 0, 2 * Math.PI);
        this.ctx.fillStyle = gradiente;
        this.ctx.fill();
        
        this.ctx.strokeStyle = '#333';
        this.ctx.lineWidth = 2;
        this.ctx.stroke();
    }
}

window.customElements.define('x-ejercicio-16', ComponenteEjercicio16);