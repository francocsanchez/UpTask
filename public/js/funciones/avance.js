import Swal from "sweetalert2";
export const actualizarAvance = () => {
    const tasks = document.querySelectorAll('li.tarea');

    if (tasks.length) {
        const tasksComplete = document.querySelectorAll('i.completo');
        const avance = Math.round((tasksComplete.length / tasks.length) * 100);

        const porcentaje = document.querySelector('#porcentaje');
        porcentaje.style.width = avance + '%';

        if (avance == 100) {
            Swal.fire(
                'Finalizado',
                'Completaste el 100% del proyecto',
                'success'
            );
        }
    }
}