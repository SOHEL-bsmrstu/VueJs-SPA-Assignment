import Vue from 'vue'
import swal from 'sweetalert2'
import Request from './request'
import Functions from './functions'

Vue.mixin({
  mixins: [Request, Functions],
  methods: {
    /**
     * SWAL confirm alert wrapper
     * @param callback
     */
    confirm: function (callback) {
      swal.fire({
        title: 'Are you sure?',
        text: 'You won\'t be able to revert this!',
        icon: 'warning',
        buttonsStyling: false,
        showCancelButton: true,
        showConfirmButton: true,

        cancelButtonClass: 'btn btn-secondary ml-3',
        confirmButtonClass: 'btn btn-success',

        cancelButtonText: '<i class=\'fa fa-times\'></i> No, thanks.',
        confirmButtonText: '<i class=\'fa fa-thumbs-up\'></i> Yeah, sure!'
      }).then(function (result) {
        if (result.value) callback()
      })
    }
  }
})
