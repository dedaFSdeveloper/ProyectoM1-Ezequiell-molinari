# Generador de Paletas de Colores

Aplicación web estática e interactiva desarrollada como Proyecto Integrador del Módulo 1 del curso de Full Stack en Soy Henry.

---

## Descripción

La aplicación permite generar paletas de colores aleatorias, visualizar sus códigos en formato HEX y HSL, bloquear colores individuales para conservarlos entre generaciones, y guardar paletas con nombre para consultarlas posteriormente.

---

## Funcionalidades

| Funcionalidad | Descripción |
|---|---|
| Generar paleta | Genera entre 6, 8 o 9 colores aleatorios |
| Copiar código | Click sobre cualquier tarjeta copia el código al portapapeles |
| Bloquear colores | Fija un color para que no cambie al regenerar la paleta |
| Guardar paletas | Guarda paletas con nombre en un panel lateral |
| Formato HEX / HSL | Toggle para alternar entre ambos formatos de color |
| Atajo de teclado | La barra espaciadora genera una nueva paleta |
| Contraste automático | El texto de cada tarjeta cambia a negro o blanco según la luminancia del fondo |
| Persistencia | La sesión actual y las paletas guardadas se mantienen al recargar la página |

---

## Demo

[Ver aplicación desplegada](https://dedaFSdeveloper.github.io/ProyectoM1-Ezequiell-molinari)

---

## Ejecución local

No requiere instalación ni dependencias externas.

1. Clonar el repositorio:

```bash
git clone https://github.com/dedaFSdeveloper/ProyectoM1-Ezequiell-molinari
```

2. Abrir el archivo `index.html` directamente en el navegador.

---



## Estructura del proyecto

```
ProyectoM1-Ezequiel-molinari/
├── index.html       # Estructura HTML de la aplicación
├── styles.css       # Estilos visuales y animaciones
├── script.js        # Lógica de la aplicación
└── README.md        # Documentación del proyecto
```

---

## Decisiones técnicas

**Contraste automático de texto**  
Se aplica la fórmula de luminancia perceptual `0.299*R + 0.587*G + 0.114*B` para determinar si un color de fondo es claro u oscuro, y asignar automáticamente texto negro o blanco. Esto garantiza legibilidad en cualquier color generado.

**Conversión RGB a HSL**  
El algoritmo de conversión fue implementado manualmente para no depender de librerías externas y para comprender el funcionamiento interno del modelo de color HSL.

**Persistencia con localStorage**  
El estado actual de la paleta y las paletas guardadas se almacenan en `localStorage`, lo que permite conservar la sesión entre recargas sin necesidad de backend.

**Colores bloqueados al regenerar**  
Al generar una nueva paleta, los colores marcados como bloqueados se conservan en su posición. Solo se reemplazan los desbloqueados, lo que permite iterar sobre una combinación parcial.

---

## Uso de Inteligencia Artificial

Durante el desarrollo se utilizo ChatGPT como herramienta de apoyo para consultas técnicas puntuales, entre ellas la fórmula de luminancia perceptual, el algoritmo de conversión RGB a HSL, y la lógica de conservación de colores bloqueados al regenerar.

En todos los casos el código fue comprendido, adaptado e integrado manualmente al proyecto.

---

## Autor

Ezequiel Molinari  
[github.com/dedaFSdeveloper](https://github.com/dedaFSdeveloper)