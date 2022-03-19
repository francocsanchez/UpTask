import Swal from "sweetalert2";
import axios from "axios";

const btnEliminar = document.querySelector('#eliminar-proyecto');

if (btnEliminar) {
    btnEliminar.addEventListener('click', e => {
        const urlProyect = e.target.dataset.proyectUrl;
        //console.log(urlProyect);
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
                const url = `${location.origin}/proyect/${urlProyect}`;

                axios.delete(url, { params: { urlProyect } })
                    .then(function (response) {

                        console.log(response);

                        Swal.fire(
                            'Eliminado!',
                            response.data,
                            'success'
                        );

                        setTimeout(() => {
                            window.location.href = '/'
                        }, 3000);
                    })
            }
        })
    })
}