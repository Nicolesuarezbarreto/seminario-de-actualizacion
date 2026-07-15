class ClimaInteractivoMdP extends ClimaTablaMdP {
    constructor() {
        super();
        this._botonRef = null;
        this._esCelsius = true; // Variable de estado para controlar la conversión
    }

    connectedCallback() {
        super._render();
        this._crearBoton();
    }

    _crearBoton() {
        this._botonRef = document.createElement('button');
        // El texto cambia según el estado
        this._botonRef.textContent = this._esCelsius ? 'Cambiar a Fahrenheit' : 'Cambiar a Celsius';
        this._botonRef.style.marginTop = '10px';
        this._botonRef.onclick = this._alternarUnidades.bind(this);
        this.shadowRoot.appendChild(this._botonRef);
    }

    disconnectedCallback() {
        if (this._botonRef) {
            this._botonRef.onclick = null;
        }
    }

    _alternarUnidades() {
        for (let i = 0; i < this.datos.length; i++) {
            for (let j = 0; j < this.datos[i].valores.length; j++) {
                let valorActual = parseFloat(this.datos[i].valores[j]);
                
                if (this._esCelsius) {
                    // Convertir a Fahrenheit
                    this.datos[i].valores[j] = ((valorActual * 9 / 5) + 32).toFixed(1);
                } else {
                    // Convertir de vuelta a Celsius
                    this.datos[i].valores[j] = ((valorActual - 32) * 5 / 9).toFixed(1);
                }
            }
        }

        // Invertimos el estado
        this._esCelsius = !this._esCelsius;

        // Limpiar y redibujar
        while (this.shadowRoot.firstChild) {
            this.shadowRoot.removeChild(this.shadowRoot.firstChild);
        }
        
        super._render();
        this._crearBoton();
    }
}

customElements.define('clima-interactivo-mdp', ClimaInteractivoMdP);