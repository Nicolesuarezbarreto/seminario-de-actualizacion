let entrada;
let fechaIngresada;
let reintentos = 0; // contador de reintentos

do {
    entrada = prompt("Ingrese su fecha de nacimiento (AAAA-MM-DD):");
    reintentos++;
    
    fechaIngresada = new Date(entrada);

    // .getTime() convierte la fecha a un número (o da NaN si falló)
    // isNaN(...) pregunta si ese resultado es un error (¿Esto NO es un número?") da true o false.
    // Mostras el error solo cuando falla:
    if (isNaN(fechaIngresada.getTime())) {
        alert(`Error: "${entrada}" no es válido. Reintento nro: ${reintentos}`);
    }

} while (isNaN(fechaIngresada.getTime()));  
                                        

alert("¡Perfecto! La fecha es válida.");