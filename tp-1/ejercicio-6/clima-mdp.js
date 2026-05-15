class ClimaTablaMdP extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        
        // Guardamos los datos de las tres filas de temperatura para los cálculos
        this.tempMaxAbs = [42.4, 38.1, 38.3, 32.5, 27.4, 22.2, 27.7, 24.7, 28.8, 34.4, 35.7, 39.4];
        this.tempMedia  = [20.3, 19.9, 18.0, 14.6, 11.3, 8.5, 8.1, 8.9, 10.5, 13.1, 15.9, 18.5];
        this.tempMinAbs = [4.7, 1.2, 1.9, -1.0, -3.0, -5.5, -9.3, -6.4, -5.5, -3.0, -2.0, -0.2];
    }

    connectedCallback() {
        this.render();
    }

    // Método que calcula y devuelve el conjunto de todos los promedios como pide la consigna
    obtenerPromediosTemperaturas() {
        const calcularPromedio = (arr) => (arr.reduce((a, b) => a + b, 0) / arr.length).toFixed(1);

        return {
            promedioMaximasAbsolutas: `${calcularPromedio(this.tempMaxAbs)}°C`,
            promedioTemperaturasMedias: `${calcularPromedio(this.tempMedia)}°C`,
            promedioMinimasAbsolutas: `${calcularPromedio(this.tempMinAbs)}°C`
        };
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                :host { display: block; font-family: sans-serif; font-size: 11px; color: #000; }
                table { border-collapse: collapse; width: 100%; max-width: 900px; text-align: center; border: 1px solid #aaa; }
                th, td { border: 1px solid #aaa; padding: 5px; }
                .header-clima { background-color: #f8f9fa; font-weight: bold; }
                .row-title { text-align: left; background-color: #f8f9fa; color: #0645ad; font-weight: bold; width: 180px; }
                .anual { font-weight: bold; }

                /* Colores de fondo basados exactamente en tu captura de pantalla */
                .bg-rojo-oscuro { background-color: #b30000; color: white; }
                .bg-rojo { background-color: #ff0000; color: white; }
                .bg-rojo-claro { background-color: #ff3333; color: white; }
                .bg-naranja-oscuro { background-color: #ff6600; }
                .bg-naranja { background-color: #ff9900; }
                .bg-naranja-claro { background-color: #ffcc00; }
                .bg-amarillo { background-color: #ffff00; }
                .bg-amarillo-claro { background-color: #ffff99; }
                .bg-amarillo-pálido { background-color: #ffffcc; }
                .bg-celeste-claro { background-color: #e6f2ff; }
                .bg-celeste { background-color: #cce6ff; }
                .bg-azul-pálido { background-color: #99ccff; }
                .bg-azul { background-color: #3399ff; color: white; }
                .bg-azul-oscuro { background-color: #0066ff; color: white; }
                .bg-azul-intenso { background-color: #0000ff; color: white; }
            </style>

            <table>
                <tr class="header-clima">
                    <th>Mes</th>
                    <th>Ene.</th><th>Feb.</th><th>Mar.</th><th>Abr.</th><th>May.</th><th>Jun.</th>
                    <th>Jul.</th><th>Ago.</th><th>Sep.</th><th>Oct.</th><th>Nov.</th><th>Dic.</th>
                    <th class="anual">Anual</th>
                </tr>
                <tr>
                    <td class="row-title">Temp. máx. abs. (°C)</td>
                    <td class="bg-rojo-oscuro">42.4</td><td class="bg-rojo">38.1</td><td class="bg-rojo">38.3</td><td class="bg-rojo-claro">32.5</td>
                    <td class="bg-naranja-oscuro">27.4</td><td class="bg-naranja">22.2</td><td class="bg-naranja-oscuro">27.7</td><td class="bg-naranja">24.7</td>
                    <td class="bg-naranja-oscuro">28.8</td><td class="bg-rojo-claro">34.4</td><td class="bg-rojo-claro">35.7</td><td class="bg-rojo">39.4</td>
                    <td class="bg-rojo anual">39.4</td>
                </tr>
                <tr>
                    <td class="row-title">Temp. media (°C)</td>
                    <td class="bg-naranja">20.3</td><td class="bg-naranja">19.9</td><td class="bg-naranja-claro">18.0</td><td class="bg-amarillo">14.6</td>
                    <td class="bg-amarillo-claro">11.3</td><td class="bg-amarillo-pálido">8.5</td><td class="bg-amarillo-pálido">8.1</td><td class="bg-amarillo-pálido">8.9</td>
                    <td class="bg-amarillo-claro">10.5</td><td class="bg-amarillo">13.1</td><td class="bg-naranja-claro">15.9</td><td class="bg-naranja-claro">18.5</td>
                    <td class="bg-amarillo anual">14.0</td>
                </tr>
                <tr>
                    <td class="row-title">Temp. mín. abs. (°C)</td>
                    <td class="bg-celeste-claro">4.7</td><td class="bg-celeste-claro">1.2</td><td class="bg-celeste-claro">1.9</td><td class="bg-celeste">-1.0</td>
                    <td class="bg-celeste">-3.0</td><td class="bg-azul-pálido">-5.5</td><td class="bg-azul">-9.3</td><td class="bg-azul-pálido">-6.4</td>
                    <td class="bg-azul-pálido">-5.5</td><td class="bg-celeste">-3.0</td><td class="bg-celeste">-2.0</td><td class="bg-celeste-claro">-0.2</td>
                    <td class="bg-azul anual">-9.3</td>
                </tr>
                <tr>
                    <td class="row-title">Precipitación total (mm)</td>
                    <td class="bg-azul">100.1</td><td class="bg-azul-pálido">72.8</td><td class="bg-azul">107.0</td><td class="bg-azul-pálido">73.3</td>
                    <td class="bg-azul-pálido">73.5</td><td class="bg-celeste">54.9</td><td class="bg-celeste">58.9</td><td class="bg-celeste">64.0</td>
                    <td class="bg-celeste">56.4</td><td class="bg-azul-pálido">83.4</td><td class="bg-azul-pálido">75.3</td><td class="bg-azul">104.0</td>
                    <td class="bg-azul anual">923.6</td>
                </tr>
                <tr>
                    <td class="row-title">Días de precipitaciones (≥ 0.1 mm)</td>
                    <td class="bg-celeste">9</td><td class="bg-celeste">8</td><td class="bg-celeste">9</td><td class="bg-celeste">9</td>
                    <td class="bg-celeste">9</td><td class="bg-celeste">9</td><td class="bg-celeste">9</td><td class="bg-celeste">8</td>
                    <td class="bg-celeste">7</td><td class="bg-azul-pálido">10</td><td class="bg-azul-pálido">10</td><td class="bg-azul-pálido">10</td>
                    <td class="bg-azul-pálido anual">107</td>
                </tr>
                <tr>
                    <td class="row-title">Horas de sol</td>
                    <td class="bg-naranja">288.3</td><td class="bg-naranja-claro">234.5</td><td class="bg-naranja-claro">232.5</td><td class="bg-naranja-claro">195.0</td>
                    <td class="bg-naranja-claro">167.4</td><td class="bg-amarillo">120.0</td><td class="bg-amarillo">127.1</td><td class="bg-naranja-claro">164.3</td>
                    <td class="bg-naranja-claro">174.0</td><td class="bg-naranja-claro">210.8</td><td class="bg-naranja-claro">222.0</td><td class="bg-naranja">269.7</td>
                    <td class="bg-naranja-claro anual">2405.6</td>
                </tr>
                <tr>
                    <td class="row-title">Humedad relativa (%)</td>
                    <td class="bg-azul">76</td><td class="bg-azul">77</td><td class="bg-azul-pálido">79</td><td class="bg-azul-oscuro">81</td>
                    <td class="bg-azul-oscuro">83</td><td class="bg-azul-intenso">84</td><td class="bg-azul-oscuro">81</td><td class="bg-azul-oscuro">81</td>
                    <td class="bg-azul-pálido">80</td><td class="bg-azul-pálido">80</td><td class="bg-azul font-weight:bold">77</td><td class="bg-azul">76</td>
                    <td class="bg-azul-pálido anual">80</td>
                </tr>
            </table>
        `;
    }
}

customElements.define('clima-tabla-mdp', ClimaTablaMdP);