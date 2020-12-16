import axios from 'axios'
import toastr from 'toastr'
import empty from 'locutus/php/var/empty'

// Set default axios values
axios.defaults.baseURL = 'http://localhost:8000/api'
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

export default {
  methods: {
    request: function (method, path, data = null, successCallback, errorCallback = null, finalCallback = null) {
      // Get request configuration
      const config = this.buildRequestConfig(
        method, path, data
      )

      // Performed the HTTP request
      axios(config).then((response) => {
        // Throw an error If received response is invalid
        if (this.isInvalidResponse(response)) {
          return toastr.error('Invalid response received!')
        }

        // Handle denied actions response
        this.handleDeniedResponse(response)

        // Execute the given success callback function
        successCallback(response.data, response)
      }).catch((error) => {
        // Handle error
        this.handleErrorResponse(error)
        if (typeof errorCallback === 'function') errorCallback(error)
      }).then(() => {
        // Always execute
        if (typeof finalCallback === 'function') finalCallback()
      })
    },

    /**
     * Handle all axios error
     * @param error
     */
    handleErrorResponse: function (error) {
      let unknownError = true

      // Handle unauthorized request
      if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        unknownError = false
        toastr.error('This action is unauthorized.')
      }

      // Handle expire (session) request
      if (error.response && error.response.status === 419) {
        unknownError = false
        toastr.error('Your session has been expired! Please reload the page.')
      }

      // Handle validation related errors
      if (error.response && error.response.status === 422) {
        let messages = []
        let validationErrors = error.response.data
        for (let field in validationErrors) {
          messages.push(validationErrors[field])
        }

        if (this.notEmpty(messages)) {
          unknownError = false
          toastr.error(messages.join('<br>'))
        }
      }

      if (unknownError) {
        console.log('Error:', error.message)
        toastr.error('Failed to fetch data. Unknown Error Occurred!')

        // PROD: Remove verbose debug in production
        // Send all debug data to console
        console.log(error.config)
        if (error.request) console.log(error.request)
        if (error.response) console.log(error.response)
      }
    },

    /**
     * Handle denied action response
     *
     * @param {Object} response
     * @property {Number} response.data.denied
     */
    handleDeniedResponse: function (response) {
      if (response.data.hasOwnProperty('denied') && response.data.hasOwnProperty('total')) {
        let total = response.data.total
        let denied = response.data.denied

        if (!this.empty(denied)) {
          if (denied !== total) {
            toastr.error('denied.multiple')
          } else {
            (total === 1 ? toastr.error('denied.single') : toastr.error('denied.everything'))
          }
        }
      }
    },

    /**
     * Check if received response is invalid?
     *
     * @param {Object} response
     * @return {Boolean}
     */
    isInvalidResponse: function (response) {
      const type = response.headers['content-type']

      return type !== 'application/json' && this.isValidJson(response.data)
    },

    /**
     * Build request configuration object
     *
     * @param {String} method
     * @param {String} path
     * @param {Object|Null} data
     * @return {Object}
     */
    buildRequestConfig: function (method, path, data = null) {
      // Init config object with path & method
      // eslint-disable-next-line func-call-spacing
      let config = { url: path, method: method }

      if (method === 'get') {
        config.params = data
      } else {
        config.data = data
      }

      // Set appropriate encoding method
      if (data instanceof FormData) {
        config.headers = {
          'Content-Type': 'multipart/form-data'
        }
      }
      return config
    },

    /**
     * Check if given JSON string is valid
     * @param jsonString
     * @return {boolean}
     */
    isValidJson: function (jsonString) {
      try {
        JSON.parse(jsonString)
      } catch (e) {
        return false
      }

      return true
    },
    /**
     * Determine whether a variable is empty
     *
     * @param mixedVar
     * @return {boolean}
     */
    empty: function (mixedVar) {
      if (mixedVar instanceof File) {
        return this.empty(mixedVar.name)
      }

      return empty(mixedVar)
    },
    /**
     * Determine whether a variable is not empty
     *
     * @param mixedVar
     * @return {boolean}
     */
    notEmpty: function (mixedVar) {
      return !empty(mixedVar)
    },
    /**
     * Toastr wrapper
     *
     * @return toastr
     */
    notify: function () {
      return toastr
    }
  }
}
