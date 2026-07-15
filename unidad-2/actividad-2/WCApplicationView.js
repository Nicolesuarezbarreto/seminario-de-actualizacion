/**
 * WCApplicationView
 */
class WCApplicationView extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

    
        this.onSearchTriggerClick = this.onSearchTriggerClick.bind(this);

        const links = document.querySelectorAll('link[rel="stylesheet"]');
        for (const link of links) {
            this.shadowRoot.appendChild(link.cloneNode(true));
        }


        const hostStyle = document.createElement('style');
        hostStyle.textContent = `:host { display: block; width: 100%; }`;
        this.shadowRoot.appendChild(hostStyle);

        // Montaje de elementos
        this.navbar = this.createNavbar();
        this.sidebar = this.createSidebar();
        this.content = this.createContent();
        this.footer = this.createFooter();

        // Se crea y agrega los botones del menú de forma encapsulada
        this.btnDashboard = this.createButtonMenu("Dashboard", "fa fa-dashboard", true);
        this.btnIcons = this.createButtonMenu("UI Icons", "fa fa-diamond", false);
        this.btnForms = this.createButtonMenu("Forms", "fa fa-edit", false);
        this.btnTables = this.createButtonMenu("Tables", "fa fa-table", false);

        this.sidebar.appendChild(this.btnDashboard);
        this.sidebar.appendChild(this.btnIcons);
        this.sidebar.appendChild(this.btnForms);
        this.sidebar.appendChild(this.btnTables);

        // Se añade todo al Shadow DOM en orden
        this.shadowRoot.appendChild(this.navbar);
        this.shadowRoot.appendChild(this.sidebar);
        this.shadowRoot.appendChild(this.content);
        this.shadowRoot.appendChild(this.footer);
    }

    createNavbar() {
        
        const nav = document.createElement("div");
        const bar = document.createElement("div");
        const logoDiv = document.createElement("div");
        const h5 = document.createElement("h5");
        const aLogo = document.createElement("a");
        const img = document.createElement("img");
        const labelToggle = document.createElement("label");
        const iToggle = document.createElement("i");
        
        // Contenedor de búsqueda, lupa e input real para que funcione el foco
        const divSearch = document.createElement("div");
        const divSearchInner = document.createElement("div");
        const iSearch = document.createElement("i");
        const inputSearch = document.createElement("input");

        const divRight = document.createElement("div");
        const btnEnv = document.createElement("button");
        const iEnv = document.createElement("i");
        const btnBell = document.createElement("button");
        const iBell = document.createElement("i");
        const divUser = document.createElement("div");
        const btnUser = document.createElement("div");
        const circle = document.createElement("div");
        const iUser = document.createElement("i");

    
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
        divSearch.style.position = "relative";
        divSearch.style.display = "inline-block";

        divSearchInner.classList.add("w3-display-right", "w3-padding-small", "w3-margin-right");
        divSearchInner.id = "search-trigger"; 
        divSearchInner.style.cursor = "pointer";
        iSearch.classList.add("fa", "fa-search");

        inputSearch.type = "text";
        inputSearch.placeholder = "Search..";
        inputSearch.classList.add("w3-input", "w3-border", "w3-round-large");
        inputSearch.style.width = "100%";
        inputSearch.style.paddingRight = "30px";

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

        divSearchInner.appendChild(iSearch);
        divSearch.append(inputSearch, divSearchInner); 
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

    createSidebar() {
        const nav = document.createElement("nav");
        const divCabecera = document.createElement("div");
        const h6Cabecera = document.createElement("h6");
        
        nav.classList.add("w3-sidebar", "w3-bar-block", "w3-collapse", "w3-white", "w3-animate-left", "w3-card");
        nav.style.zIndex = "3";
        nav.style.width = "250px";
        nav.style.marginTop = "54px";

        divCabecera.classList.add("w3-container", "w3-padding-16");
        h6Cabecera.classList.add("w3-text-grey", "w3-small", "w3-uppercase", "w3-bold");
        h6Cabecera.innerText = "MAIN NAVIGATION";

        divCabecera.appendChild(h6Cabecera);
        nav.appendChild(divCabecera);

        return nav;
    }

    // Encapsulación de botones del menú lateral
    createButtonMenu(texto, iconoClase, esActivo) {
        const a = document.createElement("a");
        const icono = document.createElement("i");
        const nodoTexto = document.createTextNode(" " + texto);

        a.href = "#";
        a.classList.add("w3-bar-item", "w3-button", "w3-padding-large", "w3-hover-text-primary");
        
        if (esActivo) {
            a.classList.add("w3-light-grey", "w3-text-primary");
        }

        const clasesIcono = iconoClase.split(" ");
        for (let i = 0; i < clasesIcono.length; i++) {
            icono.classList.add(clasesIcono[i]);
        }

        a.appendChild(icono);
        a.appendChild(nodoTexto);

        return a;
    }

    createContent() {
        const div = document.createElement("div");
        div.classList.add("w3-main");
        div.style.marginLeft = "250px";
        div.style.marginTop = "54px";
        div.style.padding = "20px";
        return div;
    }

    createFooter() {
        const footer = document.createElement("footer");
        const p = document.createElement("p");
        const texto = document.createTextNode("© 2026 - Seminario de Actualización");

        footer.classList.add("w3-container", "w3-padding-16", "w3-light-grey", "w3-border-top");
        footer.style.marginLeft = "250px";
        p.classList.add("w3-medium");

        p.appendChild(texto);
        footer.appendChild(p);

        return footer;
    }


    onSearchTriggerClick(event) {
        event.currentTarget.parentNode.children[0].focus();
    }


    connectedCallback() {
        const searchTrigger = this.shadowRoot.querySelector('#search-trigger');
        if (searchTrigger) {
            searchTrigger.addEventListener("click", this.onSearchTriggerClick);
        }
    }


    disconnectedCallback() {
        const searchTrigger = this.shadowRoot.querySelector('#search-trigger');
        if (searchTrigger) {
            searchTrigger.removeEventListener("click", this.onSearchTriggerClick);
        }
    }
}

customElements.define('wc-application-view', WCApplicationView);