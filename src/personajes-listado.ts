import {
  obtenerPersonajes,
  obtenerPersonajesPorNombre,
} from "./personajes-listado-api";
import { Personaje } from "./personajes-listado-model";

const crearContenedorPersonaje = (personaje: Personaje): HTMLDivElement => {
  const elementoPersonaje = document.createElement("div");
  elementoPersonaje.classList.add("card");
  elementoPersonaje.innerHTML = `
    <img src="http://localhost:3000/${personaje.imagen}" />
    <div class="container-description">
        <h2><span>Nombre: </span>${personaje.nombre}</h2>
        <p><span>Especialidad: </span>${personaje.especialidad}</p>
        <p>
        <span>Habilidades: </span>${personaje.habilidades}
        </p>
    </div>
  `;
  return elementoPersonaje;
};

const pintarPersonajes = async (): Promise<void> => {
  const personajes = await obtenerPersonajes();
  const listado = document.querySelector("#character-list");
  if (listado && listado instanceof HTMLDivElement) {
    personajes.forEach((personaje) => {
      const contenedorPersonaje = crearContenedorPersonaje(personaje);
      listado.appendChild(contenedorPersonaje);
    });
  } else {
    throw new Error("No se ha encontrado el contenedor del listado");
  }
};

const pintarBusqPersonajes = async (nombrePersonaje: string): Promise<void> => {
  const personajes = await obtenerPersonajesPorNombre(nombrePersonaje);
  const listado = document.querySelector("#character-list");
  if (listado && listado instanceof HTMLDivElement) {
    listado.innerHTML = "";
    personajes.forEach((personaje) => {
      const contenedorPersonaje = crearContenedorPersonaje(personaje);
      listado.appendChild(contenedorPersonaje);
    });
  } else {
    throw new Error("No se ha encontrado el contenedor del listado");
  }
};

const iniciarFormulario = () => {
  const formulario = document.querySelector("#formulario");
  if (formulario && formulario instanceof HTMLFormElement) {
    formulario.addEventListener("submit", iniciarBusqueda);
  } else {
    throw new Error("No se ha encontrado el formulario");
  }
};

export const iniciarBusqueda = (event: Event): any => {
  event.preventDefault();
  const inputElement = document.querySelector("#search");
  if (inputElement && inputElement instanceof HTMLInputElement) {
    pintarBusqPersonajes(inputElement.value);
  } else {
    throw new Error("Error al obtener el título");
  }
};

document.addEventListener("DOMContentLoaded", () => {
  pintarPersonajes(), iniciarFormulario();
});
