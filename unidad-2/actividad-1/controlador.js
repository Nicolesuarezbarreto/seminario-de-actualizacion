class CalculadoraControlador {
    constructor(modelo, vista) {
        this.modelo = modelo;
        this.vista = vista;
        this.vista.registrarControlador(this.ejecutar.bind(this));
    }

    ejecutar(valor) {
        if (valor === 'BORRAR') {
            this.modelo.resetear();
        } else if (valor === '+' || valor === '-' || valor === '*' || valor === '/') {
            this.modelo.agregarOperador(valor);
        } else if (valor === '=') {
            this.modelo.resolver();
        } else {
            this.modelo.agregarValor(valor);
        }
        this.vista.actualizar(this.modelo.obtenerPantalla());
    }
}