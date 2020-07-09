import Swal from 'sweetalert2'


export default ({ app }, inject) => {

  inject('Swal', Swal.mixin(
    {
      padding: '2.5rem',
      customClass: {
        popup: 'bg-white',
        confirmButton: 'btn btn-info btn-block  rounded-pill',
        cancelButton: 'btn btn-link text-info text-decoration-none'
      },
      buttonsStyling: false
    }
  ))
}