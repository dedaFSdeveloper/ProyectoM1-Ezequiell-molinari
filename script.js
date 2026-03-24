let boton = document.getElementById("btn-generar");
let contenedor = document.getElementById("contenedor-colores");
let selector = document.getElementById("cantidad-colores");
let toast = document.getElementById("toast");
let btnGuardar = document.getElementById("btn-guardar");
let btnTogglePanel = document.getElementById("btn-toggle-panel");
let panelPaletas = document.getElementById("panel-paletas");
let listaPaletas = document.getElementById("lista-paletas");
let modoActual = "hex";
let toggleFormato = document.getElementById("toggle-formato");
let labelTexto = document.querySelector(".label-texto");
function rgbAHsl(r, g, b) {
    r /= 255; g /= 255; b /= 255;
    let max = Math.max(r, g, b);
    let min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
    if (max === min) {
        h = s = 0;
    } else {
        let d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
            case g: h = ((b - r) / d + 2) / 6; break;
            case b: h = ((r - g) / d + 4) / 6; break;
        }
    }
    return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
}
function colorchanger(r, g, b) {
    let luminancia = 0.299 * r + 0.587 * g + 0.114 * b;
    return luminancia > 186;
}
function mostrarToast(texto) {
    toast.textContent = texto;
    toast.classList.add("visible");
    setTimeout(function() { toast.classList.remove("visible"); }, 1500);
}
function guardarEstadoActual() {
    let tarjetas = contenedor.querySelectorAll(".tarjeta-color");
    let paleta = [];
    tarjetas.forEach(function(t) {
        paleta.push({ bg: t.style.backgroundColor, hex: t.children[1].textContent, hsl: t.children[2].textContent, textColor: t.style.color, locked: t.classList.contains("locked") });
    });
    localStorage.setItem("paletaActual", JSON.stringify(paleta));
}
function renderizarPaletas() {
    let paletas = JSON.parse(localStorage.getItem("paletas") || "[]");
    listaPaletas.innerHTML = "";
    if (paletas.length === 0) {
        listaPaletas.innerHTML = "<p style='opacity:0.5'>No hay paletas guardadas</p>";
        return;
    }
    paletas.forEach(function(paleta, index) {
        let fila = document.createElement("div");
        fila.classList.add("paleta-guardada");
        let miniaturas = paleta.colores.map(function(c) { return `<div class="miniatura-color" style="background:${c.bg}"></div>`; }).join("");
        fila.innerHTML = miniaturas + `<span>${paleta.nombre}</span><button class="btn-eliminar">✕</button>`;
        fila.querySelector(".btn-eliminar").addEventListener("click", function(e) {
            e.stopPropagation();
            paletas.splice(index, 1);
            localStorage.setItem("paletas", JSON.stringify(paletas));
            renderizarPaletas();
        });
        fila.addEventListener("click", function() {
            contenedor.innerHTML = "";
            paleta.colores.forEach(function(c) {
                let tarjeta = document.createElement("div");
                tarjeta.classList.add("tarjeta-color");
                tarjeta.style.backgroundColor = c.bg;
                tarjeta.style.color = c.textColor;
                tarjeta.innerHTML = `<button class="lock-btn">🔓</button><span class="hex">${c.hex}</span><span class="hsl">${c.hsl}</span>`;
                let lockBtn = tarjeta.querySelector(".lock-btn");
                lockBtn.addEventListener("click", function(e) {
                    e.stopPropagation();
                    tarjeta.classList.toggle("locked");
                    lockBtn.textContent = tarjeta.classList.contains("locked") ? "🔒" : "🔓";
                    guardarEstadoActual();
                });
                tarjeta.addEventListener("click", function() { navigator.clipboard.writeText(modoActual === "hex" ? tarjeta.querySelector(".hex").textContent : tarjeta.querySelector(".hsl").textContent); mostrarToast("¡Color copiado!"); });
                contenedor.appendChild(tarjeta);
            });
            guardarEstadoActual();
        });
        listaPaletas.appendChild(fila);
    });
}
let data = localStorage.getItem("paletaActual");
if (data) {
    let paleta = JSON.parse(data);
    paleta.forEach(function(c) {
        let tarjeta = document.createElement("div");
        tarjeta.classList.add("tarjeta-color");
        tarjeta.style.backgroundColor = c.bg;
        tarjeta.style.color = c.textColor;
        if (c.locked) tarjeta.classList.add("locked");
        tarjeta.innerHTML = `<button class="lock-btn">${c.locked ? "🔒" : "🔓"}</button><span class="hex">${c.hex}</span><span class="hsl">${c.hsl}</span>`;
        let lockBtn = tarjeta.querySelector(".lock-btn");
        lockBtn.addEventListener("click", function(e) {
            e.stopPropagation();
            tarjeta.classList.toggle("locked");
            lockBtn.textContent = tarjeta.classList.contains("locked") ? "🔒" : "🔓";
            guardarEstadoActual();
        });
        tarjeta.addEventListener("click", function() { navigator.clipboard.writeText(modoActual === "hex" ? tarjeta.querySelector(".hex").textContent : tarjeta.querySelector(".hsl").textContent); mostrarToast("¡Color copiado!"); });
        contenedor.appendChild(tarjeta);
    });
}
renderizarPaletas();
boton.addEventListener("click", function() {
    let tarjetasExistentes = contenedor.querySelectorAll(".tarjeta-color");
    let cantidad = Number(selector.value);
    let bloqueadas = [];
    tarjetasExistentes.forEach(function(t) {
        if (t.classList.contains("locked")) {
            bloqueadas.push({ bg: t.style.backgroundColor, hex: t.children[1].textContent, hsl: t.children[2].textContent, textColor: t.style.color, locked: true });
        }
    });
    contenedor.innerHTML = "";
    bloqueadas.forEach(function(c) {
        let tarjeta = document.createElement("div");
        tarjeta.classList.add("tarjeta-color");
        tarjeta.classList.add("locked");
        tarjeta.style.backgroundColor = c.bg;
        tarjeta.style.color = c.textColor;
        tarjeta.innerHTML = `<button class="lock-btn">🔒</button><span class="hex">${c.hex}</span><span class="hsl">${c.hsl}</span>`;
        let lockBtn = tarjeta.querySelector(".lock-btn");
        lockBtn.addEventListener("click", function(e) {
            e.stopPropagation();
            tarjeta.classList.toggle("locked");
            lockBtn.textContent = tarjeta.classList.contains("locked") ? "🔒" : "🔓";
            guardarEstadoActual();
        });
        tarjeta.addEventListener("click", function() { navigator.clipboard.writeText(modoActual === "hex" ? tarjeta.querySelector(".hex").textContent : tarjeta.querySelector(".hsl").textContent); mostrarToast("¡Color copiado!"); });
        contenedor.appendChild(tarjeta);
    });
    for (let i = 0; i < cantidad - bloqueadas.length; i++) {
        let r = Math.floor(Math.random() * 256);
        let g = Math.floor(Math.random() * 256);
        let b = Math.floor(Math.random() * 256);
        let hex = "#" + r.toString(16).padStart(2, "0") + g.toString(16).padStart(2, "0") + b.toString(16).padStart(2, "0");
        let hsl = rgbAHsl(r, g, b);
        let tarjeta = document.createElement("div");
        tarjeta.classList.add("tarjeta-color");
        tarjeta.style.backgroundColor = hex;
        tarjeta.style.color = colorchanger(r, g, b) ? "black" : "white";
        tarjeta.innerHTML = `<button class="lock-btn">🔓</button><span class="hex">${hex}</span><span class="hsl">${hsl}</span>`;
        let lockBtn = tarjeta.querySelector(".lock-btn");
        lockBtn.addEventListener("click", function(e) {
            e.stopPropagation();
            tarjeta.classList.toggle("locked");
            lockBtn.textContent = tarjeta.classList.contains("locked") ? "🔒" : "🔓";
            guardarEstadoActual();
        });
        tarjeta.addEventListener("click", function() { navigator.clipboard.writeText(modoActual === "hex" ? tarjeta.querySelector(".hex").textContent : tarjeta.querySelector(".hsl").textContent); mostrarToast("¡Color copiado!"); });
        contenedor.appendChild(tarjeta);
    }
    guardarEstadoActual();
});
btnGuardar.addEventListener("click", function() {
    let tarjetas = contenedor.querySelectorAll(".tarjeta-color");
    if (tarjetas.length === 0) return;
    let nombre = prompt("Nombre de la paleta:");
    if (!nombre) return;
    let colores = [];
    tarjetas.forEach(function(t) {
        colores.push({ bg: t.style.backgroundColor, hex: t.children[1].textContent, hsl: t.children[2].textContent, textColor: t.style.color });
    });
    let paletas = JSON.parse(localStorage.getItem("paletas") || "[]");
    paletas.push({ nombre, colores });
    localStorage.setItem("paletas", JSON.stringify(paletas));
    renderizarPaletas();
    mostrarToast("¡Paleta guardada!");
});
btnTogglePanel.addEventListener("click", function() {
    panelPaletas.classList.toggle("visible");
});
document.addEventListener("keydown", function(e) {
    if (e.code === "Space") {
        e.preventDefault();
        boton.click();
    }
});
toggleFormato.addEventListener("change", function() {
    if (toggleFormato.checked) {
        document.body.classList.add("modo-hsl");
        modoActual = "hsl";
        labelTexto.textContent = "HSL";
    } else {
        document.body.classList.remove("modo-hsl");
        modoActual = "hex";
        labelTexto.textContent = "HEX";
    }
    localStorage.setItem("modo", modoActual);
});
let modoGuardado = localStorage.getItem("modo");
if (modoGuardado === "hsl") {
    document.body.classList.add("modo-hsl");
    toggleFormato.checked = true;
    modoActual = "hsl";
    labelTexto.textContent = "HSL";
}
if (contenedor.children.length === 0) boton.click();