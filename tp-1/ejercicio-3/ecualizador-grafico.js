class EcualizadorGrafico extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        
        this._datos = {
            "32Hz": 0, "64Hz": 0, "130Hz": 0, "260Hz": 0, "500Hz": 0,
            "1k": 0, "2k": 0, "4k": 0, "8.3k": 0, "16.5k": 0
        };

        // solo creo el render, sin asignar eventos
        this._render();
    }

    connectedCallback() {
        // aca se asignan los eventos
        const sliders = this.shadowRoot.querySelectorAll('input[type="range"]');
        for (let i = 0; i < sliders.length; i++) {
            sliders[i].addEventListener('input', this._onSliderInput.bind(this));
        }
    }

    disconnectedCallback() {
        // aca se remueven los eventos
        const sliders = this.shadowRoot.querySelectorAll('input[type="range"]');
        for (let i = 0; i < sliders.length; i++) {
            sliders[i].removeEventListener('input', this._onSliderInput.bind(this));
        }
    }

    // Método de clase nombrado
    _onSliderInput(event) {
        const target = event.target;
        const freq = target.dataset.freq;
        const val = parseInt(target.value);
        
        this._datos[freq] = val;
        this._updateLabel(target);
    }

    _updateLabel(input) {
        const val = input.value;
        const label = input.parentNode.querySelector('.db-label');
        if (label) {
            label.textContent = (val >= 0 ? '+' : '') + val + 'dB';
        }
    }

    getData() {
        return { ...this._datos };
    }

    setData(nuevosDatos) {
        this._datos = { ...this._datos, ...nuevosDatos };
        const sliders = this.shadowRoot.querySelectorAll('input[type="range"]');
        for (let i = 0; i < sliders.length; i++) {
            const input = sliders[i];
            const freq = input.dataset.freq;
            if (nuevosDatos[freq] !== undefined) {
                input.value = nuevosDatos[freq];
                this._updateLabel(input);
            }
        }
    }

    _render() {
        const style = document.createElement('style');
        style.textContent = `
            :host { display: inline-block; background: #c0c0c0; border: 2px outset #ffffff; padding: 10px; font-family: sans-serif; }
            .contenedor-sliders { display: flex; gap: 5px; }
            .columna { display: flex; flex-direction: column; align-items: center; }
            input[type="range"] { writing-mode: vertical-lr; direction: rtl; height: 100px; }
        `;
        
        const container = document.createElement('div');
        container.className = 'contenedor-sliders';

        for (const f in this._datos) {
            const col = document.createElement('div');
            col.className = 'columna';

            const labelFreq = document.createElement('span');
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

        this.shadowRoot.appendChild(style);
        this.shadowRoot.appendChild(container);
    }
}

customElements.define('ecualizador-grafico', EcualizadorGrafico);