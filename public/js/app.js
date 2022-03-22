import proyectos from './modules/proyectos';
import tareas from './modules/tareas';
import { actualizarAvance } from './funciones/avance';

document.addEventListener('DOMContentLoaded', () => {
    actualizarAvance();
})