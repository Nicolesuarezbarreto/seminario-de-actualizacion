class ChatComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        
        // Estructura base del chat
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    font-family: Arial, Helvetica, sans-serif;
                    max-width: 800px;
                    margin: 0 auto;
                }
                .chat-window {
                    border: 3px solid #f1f1f1;
                    padding: 20px;
                }
                .container {
                    border: 2px solid #dedede;
                    background-color: #f1f1f1;
                    border-radius: 5px;
                    padding: 10px;
                    margin: 10px 0;
                    position: relative;
                }
                .darker {
                    border-color: #ccc;
                    background-color: #ddd;
                }
                .container::after {
                    content: "";
                    clear: both;
                    display: table;
                }
                .container img {
                    float: left;
                    max-width: 60px;
                    width: 100%;
                    margin-right: 20px;
                    border-radius: 50%;
                }
                .container img.right {
                    float: right;
                    margin-left: 20px;
                    margin-right:0;
                }
                .time-right { float: right; color: #aaa; }
                .time-left { float: left; color: #999; }
            </style>
            
            <div class="chat-window" id="chat-container">
                <h2>Chat Messages</h2>
                <!-- Aquí se irán insertando los mensajes -->
            </div>
        `;
        //mensaje de bienvenida
        this.insertarMensaje("¡Bienvenido al chat! Escribí algo en la consola.", "10:52", false);
    }

    // Método para insertar mensajes
    insertarMensaje(texto, tiempo, esMio = false) {
        const contenedor = this.shadowRoot.querySelector('#chat-container');
        
        // Elegimos el avatar y la clase según quién envía
        const claseDarker = esMio ? 'darker' : '';
        const claseImagen = esMio ? 'right' : '';
        const claseTiempo = esMio ? 'time-left' : 'time-right';
        const srcImagen = esMio 
            ? "https://www.w3schools.com/howto/img_avatar2.png" 
            : "https://www.w3schools.com/howto/img_bandmember.jpg";

        const nuevoMensaje = `
            <div class="container ${claseDarker}">
                <img src="${srcImagen}" alt="Avatar" class="${claseImagen}" style="width:100%;">
                <p>${texto}</p>
                <span class="${claseTiempo}">${tiempo}</span>
            </div>
        `;

        // Lo agregamos al final de la ventana de chat
        contenedor.innerHTML += nuevoMensaje;

        return "Mensaje insertado con éxito";
    }
}

customElements.define('chat-component', ChatComponent);