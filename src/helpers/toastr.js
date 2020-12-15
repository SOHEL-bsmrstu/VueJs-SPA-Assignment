import toastr from 'toastr'

export default {
  /**
   * Show a info toastr
   * @param message
   */
  info: function (message) {
    toastr.info(message)
  },

  /**
   * Show a error toastr
   * @param message
   */
  error: function (message) {
    toastr.error(message)
  },

  /**
   * Show a success toastr
   * @param message
   */
  success: function (message) {
    toastr.success(message)
  },

  /**
   * Show a warning toastr
   * @param message
   */
  warning: function (message) {
    toastr.warning(message)
  }
}
