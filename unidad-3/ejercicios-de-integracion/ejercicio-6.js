let vistaEj6 = null;
let modeloEj6 = null;
let controladorEj6 = null;
let contenedorEj6 = null;

function iniciarEjercicio6() {
    if (contenedorEj6) {
        contenedorEj6.remove();
    }

    contenedorEj6 = document.createElement('div');
    contenedorEj6.style.marginTop = '20px';

    vistaEj6 = new View();
    contenedorEj6.appendChild(vistaEj6);

    modeloEj6 = new Model();
    controladorEj6 = new Controller(vistaEj6, modeloEj6);
    controladorEj6.enable();

    document.body.appendChild(contenedorEj6);

    let btnCargar = document.createElement('button');
    btnCargar.innerText = 'Cargar Figura (JSON)';
    btnCargar.style.marginRight = '10px';

    let btnLimpiar = document.createElement('button');
    btnLimpiar.innerText = 'Limpiar Canvas';

    contenedorEj6.appendChild(btnCargar);
    contenedorEj6.appendChild(btnLimpiar);

    btnCargar.onclick = function() {
        let jsonStr = prompt('Ingresá el objeto JSON de la figura:');
        
        if (jsonStr) {
            try {
                let figura = JSON.parse(jsonStr);
                
                vistaEj6.dispatchEvent(new CustomEvent('request', { 
                    detail: { tipo: 'agregar', data: figura } 
                }));
            } catch (e) {
                alert("JSON inválido. Revisá la sintaxis.");
            }
        }
    };

    btnLimpiar.onclick = function() {
        vistaEj6.dispatchEvent(new CustomEvent('request', { 
            detail: { tipo: 'limpiar' } 
        }));
    };
   }