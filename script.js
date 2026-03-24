let boton = document.getElementById("btn-generar");
let contenedor = document.getElementById("contenedor-colores");
let selector = document.getElementById("cantidad-colores");
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
    contenedor.appendChild(tarjeta);
    }   
});