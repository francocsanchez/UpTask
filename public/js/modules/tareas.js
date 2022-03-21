import axios from "axios";

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
                })
        }
    })
}

export default tasks;