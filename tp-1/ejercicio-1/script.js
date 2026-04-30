let nombre = prompt("Ingrese su nombre");
let apellido = prompt("Ingrese su apellido");

let apellidoMayus = apellido.toUpperCase();

let primeraLetra = nombre.charAt(0).toUpperCase();
let restoDelNombre = nombre.slice(1).toLowerCase();

let nombreFinal = primeraLetra + restoDelNombre;

alert(`¡Buenos dias ${apellidoMayus}, ${nombreFinal}!`);