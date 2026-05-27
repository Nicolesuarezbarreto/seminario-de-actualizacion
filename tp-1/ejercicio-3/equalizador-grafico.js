class EqualizadorGrafico extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        
        // Estado interno del componente
        this._datos = {
            "32Hz": 0, "64Hz": 0, "130Hz": 0, "260Hz": 0, "500Hz": 0,
            "1k": 0, "2k": 0, "4k": 0, "8.3k": 0, "16.5k": 0
        };

        // Enlazamos el método para asegurar el contexto de 'this' sin usar funciones flecha
        this._onSliderInput = this._onSliderInput.bind(this);
    }


    connectedCallback() {
        this._render(); // 1. Creamos la estructura visual en el DOM

        // 2. Buscamos los inputs range y les asociamos el evento de forma explícita
        const sliders = this.shadowRoot.querySelectorAll('input[type="range"]');
        for (const slider of sliders) {
            slider.addEventListener('input', this._onSliderInput);
        }
    }

    // Limpieza de eventos para evitar memory leak
    disconnectedCallback() {
        const sliders = this.shadowRoot.querySelectorAll('input[type="range"]');
        for (const slider of sliders) {
            slider.removeEventListener('input', this._onSliderInput);
        }
    }


    getData() {
        return { ...this._datos };
    }

    setData(nuevosDatos) {
        this._datos = { ...this._datos, ...nuevosDatos };
        
        // Sincronización visual directa mediante DOM API
        const sliders = this.shadowRoot.querySelectorAll('input[type="range"]');
        for (const input of sliders) {
            const freq = input.dataset.freq;
            if (nuevosDatos[freq] !== undefined) {
                input.value = nuevosDatos[freq];
                this._updateLabel(input);
            }
        }
    }

    // --- MÉTODO DE CLASE NOMBRADO (no función flecha, es rastreable en la consola)
    _onSliderInput(event) {
        const freq = event.target.dataset.freq;
        const val = parseInt(event.target.value);
        
        this._datos[freq] = val; 
        this._updateLabel(event.target);
    }

    _updateLabel(input) {
        const val = input.value;
        const label = input.parentNode.querySelector('.db-label');
        if (label) {
            label.textContent = (val >= 0 ? '+' : '') + val + 'dB';
        }
    }

    // --- RENDERIZADO EXCLUSIVO CON DOM API (Sin innerHTML incrustado)
    _render() {
        const fragment = document.createDocumentFragment();

        // Estilos encapsulados
        const style = document.createElement('style');
        style.textContent = `
            :host { display: inline-block; background: #d4d0c8; border: 2px solid #808080; padding: 15px; font-family: 'Tahoma', sans-serif; }
            .contenedor-sliders { display: flex; gap: 4px; background: #808080; padding: 2px; }
            .columna { display: flex; flex-direction: column; align-items: center; background: #d4d0c8; padding: 8px 4px; width: 45px; border: 1px solid #fff; border-right-color: #404040; border-bottom-color: #404040; }
            input[type="range"] { writing-mode: vertical-lr; direction: rtl; height: 150px; margin: 10px 0; cursor: pointer; width: 20px; }
            .freq-label { font-size: 10px; font-weight: bold; margin-bottom: 5px; }
            .db-label { font-size: 10px; margin-top: 5px; }
        `;

        const container = document.createElement('div');
        container.className = 'contenedor-sliders';

        // Construcción de la interfaz nodo por nodo
        const frecuencias = Object.keys(this._datos);
        for (const f of frecuencias) {
            const col = document.createElement('div');
            col.className = 'columna';

            const labelFreq = document.createElement('span');
            labelFreq.className = 'freq-label';
            labelFreq.textContent = f;

            const input = document.createElement('input');
            input.type = 'range';
            input.min = -12;
            input.max = 12;
            input.value = this._datos[f];
            input.dataset.freq = f;

            const labelDb = document.createElement('span');
            labelDb.className = 'db-label';
            labelDb.textContent = '+0dB';

            col.appendChild(labelFreq);
            col.appendChild(input);
            col.appendChild(labelDb);
            container.appendChild(col);
        }

        fragment.appendChild(style);
        fragment.appendChild(container);
        this.shadowRoot.appendChild(fragment);
    }
}

// Nombre especifico del component
customElements.define('equalizador-grafico', EqualizadorGrafico);