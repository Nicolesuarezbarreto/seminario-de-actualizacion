class MyElement extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        
        // El objeto de datos con toda la información de la imagen
        this._datos = {
            "32Hz": 0, "64Hz": 0, "130Hz": 0, "260Hz": 0, "500Hz": 0,
            "1k": 0, "2k": 0, "4k": 0, "8.3k": 0, "16.5k": 0
        };

        this.render();
    }

    // Método para obtener los datos (Consigna)
    getData() {
        return this._datos;
    }

    // Método para asignar datos y actualizar visualmente (Consigna)
    setData(nuevosDatos) {
        this._datos = { ...this._datos, ...nuevosDatos };
        
        // Actualizamos los sliders en la pantalla
        for (const frecuencia in this._datos) {
            const slider = this.shadowRoot.querySelector(`input[data-freq="${frecuencia}"]`);
            if (slider) {
                slider.value = this._datos[frecuencia];
                // También actualizamos el texto de dB
                const label = slider.nextElementSibling;
                label.textContent = (this._datos[frecuencia] >= 0 ? '+' : '') + this._datos[frecuencia] + 'dB';
            }
        }
        
        return "Datos actualizados correctamente";
    }


    render() {
        // Generamos los 10 controles automáticamente usando un bucle
        const frecuencias = Object.keys(this._datos);
        
        let htmlSliders = frecuencias.map(f => `
            <div class="columna">
                <span>${f}</span>
                <input type="range" min="-12" max="12" value="${this._datos[f]}" data-freq="${f}">
                <span>+0dB</span>
            </div>
        `).join('');

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: inline-block;
                    background-color: #ece9d8;
                    border: 2px solid #808080;
                    padding: 20px;
                    font-family: 'Tahoma', sans-serif;
                }
                .contenedor-sliders {
                    display: flex;
                    gap: 5px;
                }
                .columna {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    border: 1px solid #ffffff;
                    border-right-color: #808080;
                    border-bottom-color: #808080;
                    padding: 5px;
                    background: #d4d0c8;
                }
                input[type="range"] {
                    writing-mode: vertical-lr;
                    direction: rtl;
                    height: 120px;
                    margin: 10px 0;
                    cursor: pointer;
                }
                span { font-size: 11px; }
            </style>
            <div class="contenedor-sliders">
                ${htmlSliders}
            </div>
        `;

        // Escuchar cambios manuales para actualizar el objeto interno
        this.shadowRoot.querySelectorAll('input').forEach(input => {
            input.oninput = (e) => {
                const freq = e.target.dataset.freq;
                const val = e.target.value;
                this._datos[freq] = parseInt(val);
                e.target.nextElementSibling.textContent = (val >= 0 ? '+' : '') + val + 'dB';
            };
        });
    }
}

customElements.define('my-element', MyElement);