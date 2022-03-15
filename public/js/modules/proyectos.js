import Swal from "sweetalert2";
import axios from "axios";

const btnEliminar = document.querySelector('#eliminar-proyecto');

btnEliminar.addEventListener('click', () => {
    Swal.fire({
        title: 'Deseas eliminar este proyecto?',
        text: "El proyecto no se podra recuperar",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Eliminar',
        cancelButtonText: 'No, Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                'Eliminado!',
                'Su proyecto fue eliminado correctamente.',
                'success'
            );

            setTimeout(() => {
                window.location.href = '/'
            }, 3000);
        }
    })
})