import axios from "axios";
import Swal from "sweetalert2";
import { actualizarAvance } from '../funciones/avance';

const tasks = document.querySelector('.listado-pendientes');

if (tasks) {
    tasks.addEventListener('click', e => {
        if (e.target.classList.contains('fa-check-circle')) {
            const icono = e.target;
            const idTask = icono.parentElement.parentElement.dataset.task;
            const url = `${location.origin}/task/${idTask}`

            axios.patch(url, { idTask })
                .then(function (response) {
                    response.status == 200 ? icono.classList.toggle('completo') : null
                    actualizarAvance();
                })
        }

        if (e.target.classList.contains('fa-trash')) {
            const taskHTML = e.target.parentElement.parentElement;
            const idTask = taskHTML.dataset.task;

            Swal.fire({
                title: 'Deseas eliminar esta tarea?',
                text: "La tarea no se podra recuperar",
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, Eliminar',
                cancelButtonText: 'No, Cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    const url = `${location.origin}/task/${idTask}`

                    axios.delete(url, { params: { idTask } })
                        .then(function (response) {

                            if (response.status === 200) {
                                taskHTML.parentElement.removeChild(taskHTML);
                            }

                            Swal.fire(
                                'Eliminado!',
                                response.data,
                                'success'
                            );
                            actualizarAvance();
                        })
                        .catch(() => {
                            Swal.fire({
                                icon: 'error',
                                title: 'Hubo un error',
                                text: 'No se pudo eliminar la tarea'
                            })
                        })
                }
            })
        }
    })
}

export default tasks;