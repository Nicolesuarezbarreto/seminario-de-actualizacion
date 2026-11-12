// 14. Construir un rectángulo de (200px, 400px) coloreado mediante un gradiente lineal horizontal entre dos colores 
// diferentes empleando la notación HEX. Ambos colores deben ser provistos por dos inputs de color por fuera del canvas. 

class RectanguloGradiente extends HTMLElement {
    constructor() {
        super();
        
        var shadow = this.attachShadow({ mode: 'open' });

        var style = document.createElement('style');
        style.textContent = `
            :host {
                display: block;
                font-family: Arial, sans-serif;
            }
            .contenedor-principal {
                display: flex;
                gap: 20px;
                align-items: center;
            }
            .panel-colores {
                display: flex;
                flex-direction: column;
                gap: 12px;
                background: #f4f4f9;
                padding: 15px;
                border-radius: 6px;
                border: 1px solid #ddd;
            }
            .grupo-color {
                display: flex;
                flex-direction: column;
                gap: 4px;
                font-size: 14px;
            }
            input[type="color"] {
                width: 100px;
                height: 35px;
                border: 1px solid #ccc;
                border-radius: 4px;
                cursor: pointer;
            }
            canvas {
                border: 2px solid #333;
                background-color: #fff;
            }
        `;

        var contenedorPrincipal = document.createElement('div');
        contenedorPrincipal.className = 'contenedor-principal';

        
        var panelColores = document.createElement('div');
        panelColores.className = 'panel-colores';

        var self = this;

        
        this.inputColor1 = this.crearControlColor(panelColores, 'Color Inicial (HEX)', '#ff4b5c');
        this.inputColor2 = this.crearControlColor(panelColores, 'Color Final (HEX)', '#2a52be');

        var canvas = document.createElement('canvas');
        canvas.width = 200;
        canvas.height = 400;
        
        var ctx = canvas.getContext('2d');

        function dibujar() {
            var color1 = self.inputColor1.value;
            var color2 = self.inputColor2.value;

            var gradiente = ctx.createLinearGradient(0, 0, canvas.width, 0);
            gradiente.addColorStop(0, color1);
            gradiente.addColorStop(1, color2);

            ctx.fillStyle = gradiente;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        this.inputColor1.addEventListener('input', function() {
            dibujar();
        });
        this.inputColor2.addEventListener('input', function() {
            dibujar();
        });

        shadow.appendChild(style);
        contenedorPrincipal.appendChild(panelColores);
        contenedorPrincipal.appendChild(canvas);
        shadow.appendChild(contenedorPrincipal);

        dibujar();
    }

    crearControlColor(contenedorPadre, etiquetaTexto, valorHexInicial) {
        var grupo = document.createElement('div');
        grupo.className = 'grupo-color';

        var lbl = document.createElement('label');
        lbl.textContent = etiquetaTexto;

        var input = document.createElement('input');
        input.type = 'color';
        input.value = valorHexInicial;

        grupo.appendChild(lbl);
        grupo.appendChild(input);
        contenedorPadre.appendChild(grupo);

        return input;
    }
}

window.customElements.define('rectangulo-gradiente', RectanguloGradiente);