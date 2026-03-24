let boton = document.getElementById("btn-generar");
let contenedor = document.getElementById("contenedor-colores");
let selector = document.getElementById("cantidad-colores");
function colorchanger(r, g, b){
    let luminancia = 0.299*r + 0.587*g + 0.114*b;
    return luminancia > 186;
}
boton.addEventListener("click", function() {
    contenedor.innerHTML = "";
    for (let i = 0; i < Number(selector.value); i++) {  
        let r = Math.floor(Math.random() * 256);
        let g = Math.floor(Math.random() * 256);
        let b = Math.floor(Math.random() * 256);
        let hex = "#" + r.toString(16).padStart(2, "0") 
        + g.toString(16).padStart(2, "0") 
        + b.toString(16).padStart(2, "0");
        let tarjeta = document.createElement("div");
        tarjeta.classList.add("tarjeta-color");
        tarjeta.style.backgroundColor = hex;
        tarjeta.textContent = hex;
        tarjeta.style.color = colorchanger(r, g, b) ? "black" : "white";
        contenedor.appendChild(tarjeta);
        tarjeta.addEventListener("click", function() {
            navigator.clipboard.writeText(hex);
            tarjeta.textContent = "Copiado!";
            
            setTimeout(function() {
                tarjeta.textContent = hex;
            }, 1000);
        });
    }
});