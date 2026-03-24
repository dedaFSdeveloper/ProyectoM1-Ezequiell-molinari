let boton = document.getElementById("btn-generar");
let contenedor = document.getElementById("contenedor-colores");
let selector = document.getElementById("cantidad-colores");
let toast = document.getElementById("toast");
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
function colorchanger(r, g, b){
    let luminancia = 0.299*r + 0.587*g + 0.114*b;
    return luminancia > 186;
}
boton.addEventListener("click", function() {
    let tarjetasExistentes = contenedor.querySelectorAll(".tarjeta-color");
    let bloqueadas = [];
    tarjetasExistentes.forEach(function(t) {
        if (t.classList.contains("locked")) {
            bloqueadas.push(t.cloneNode(true));
        }
    });
    contenedor.innerHTML = "";
    bloqueadas.forEach(function(t) {
        contenedor.appendChild(t);
    });
    let cantidad = Number(selector.value);
    let bloqueadasCount = bloqueadas.length;
    for (let i = 0; i < cantidad - bloqueadasCount; i++) {
        let r = Math.floor(Math.random() * 256);
        let g = Math.floor(Math.random() * 256);
        let b = Math.floor(Math.random() * 256);
        let hex = "#" + r.toString(16).padStart(2, "0")
        + g.toString(16).padStart(2, "0")
        + b.toString(16).padStart(2, "0");
        let tarjeta = document.createElement("div");
        tarjeta.classList.add("tarjeta-color");
        tarjeta.style.backgroundColor = hex;
        let hsl = rgbAHsl(r, g, b);
        tarjeta.innerHTML = `
            <button class="lock-btn">🔓</button>
            <span>${hex}</span>
            <span>${hsl}</span>
        `;
        tarjeta.style.color = colorchanger(r, g, b) ? "black" : "white";
        contenedor.appendChild(tarjeta);
        let lockBtn = tarjeta.querySelector(".lock-btn");
        lockBtn.addEventListener("click", function(evento) {
            evento.stopPropagation();
            tarjeta.classList.toggle("locked");
            lockBtn.textContent = tarjeta.classList.contains("locked") ? "🔒" : "🔓";
        });
        tarjeta.addEventListener("click", function() {
            navigator.clipboard.writeText(hex);
            toast.classList.add("visible");
            setTimeout(function() {
                toast.classList.remove("visible");
            }, 1500);
        });
    }
});