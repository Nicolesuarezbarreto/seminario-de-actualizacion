/**
 * WCApplicationView
 */
class WCApplicationView extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        // Inyección de estilos externos (Requerido para W3.css)
        const links = document.querySelectorAll('link[rel="stylesheet"]');
        links.forEach(link => {
            this.shadowRoot.appendChild(link.cloneNode(true));
        });

        // Estilo de host (Necesario para el renderizado correcto del bloque)
        const hostStyle = document.createElement('style');
        hostStyle.textContent = `:host { display: block; width: 100%; }`;
        this.shadowRoot.appendChild(hostStyle);

        // Montaje de elementos
        this.navbar = this.createNavbar();
        this.shadowRoot.appendChild(this.navbar);
    }

    createNavbar() {
        //Construcción de elementos
        const nav = document.createElement("div");
        const bar = document.createElement("div");
        const logoDiv = document.createElement("div");
        const h5 = document.createElement("h5");
        const aLogo = document.createElement("a");
        const img = document.createElement("img");
        const labelToggle = document.createElement("label");
        const iToggle = document.createElement("i");
        const divSearch = document.createElement("div");
        const divSearchInner = document.createElement("div");
        const divRight = document.createElement("div");
        const btnEnv = document.createElement("button");
        const iEnv = document.createElement("i");
        const btnBell = document.createElement("button");
        const iBell = document.createElement("i");
        const divUser = document.createElement("div");
        const btnUser = document.createElement("div");
        const circle = document.createElement("div");
        const iUser = document.createElement("i");

        //Asignación de clases y estilos
        nav.classList.add("w3-top", "w3-card");
        nav.style.height = "54px";
        bar.classList.add("w3-flex-bar", "w3-theme", "w3-left-align");

        logoDiv.classList.add("admin-logo", "w3-bar-item", "w3-hide-medium", "w3-hide-small");
        h5.style.lineHeight = "1";
        h5.style.margin = "0";
        h5.style.fontWeight = "300";
        aLogo.href = "./index.html";
        aLogo.classList.add("w3-button", "w3-bold");
        
        img.classList.add("w3-image");
        img.width = "26";

        labelToggle.setAttribute("for", "sidebar-control");
        labelToggle.classList.add("w3-button", "w3-large", "w3-opacity-min");
        iToggle.classList.add("fa", "fa-bars");

        divSearch.style.width = "40%";
        divSearchInner.classList.add("w3-display-right", "w3-padding-small", "w3-margin-right");
        divSearchInner.id = "search-trigger"; 

        divRight.classList.add("w3-right");
        btnEnv.type = "button";
        btnEnv.classList.add("w3-button", "w3-large", "w3-opacity-min");
        iEnv.classList.add("fa", "fa-envelope-open");
        btnBell.type = "button";
        btnBell.classList.add("w3-button", "w3-large", "w3-opacity-min");
        iBell.classList.add("fa", "fa-bell");

        divUser.classList.add("text-right");
        btnUser.classList.add("w3-button");
        circle.classList.add("w3-circle", "w3-center", "w3-text-white", "w3-primary");
        circle.style.width = "38px";
        circle.style.height = "38px";
        iUser.classList.add("fa", "fa-fw", "fa-user");
        iUser.style.marginTop = "11px";

        // Ensamblaje
        aLogo.append(img, " W3Admin");
        h5.appendChild(aLogo);
        logoDiv.appendChild(h5);
        labelToggle.appendChild(iToggle);
        divSearch.appendChild(divSearchInner);
        btnEnv.appendChild(iEnv);
        btnBell.appendChild(iBell);
        divRight.append(btnEnv, btnBell);
        circle.appendChild(iUser);
        btnUser.appendChild(circle);
        divUser.appendChild(btnUser);
        bar.append(logoDiv, labelToggle, divSearch, divRight, divUser);
        nav.appendChild(bar);

        return nav;
    }

    // Manejador de evento
    onSearchTriggerClick(event) {
        event.target.parentNode.children[1].focus();
    }

    connectedCallback() {
        const searchTrigger = this.shadowRoot.querySelector('#search-trigger');
        if (searchTrigger) {
            searchTrigger.onclick = this.onSearchTriggerClick.bind(this);
        }
    }

    disconnectedCallback() {
        const searchTrigger = this.shadowRoot.querySelector('#search-trigger');
        if (searchTrigger) {
            searchTrigger.onclick = null;
        }
    }
}

customElements.define('wc-application-view', WCApplicationView);