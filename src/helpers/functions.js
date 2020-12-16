/* eslint-disable */
import is_bool from 'locutus/php/var/is_bool'
import in_array from 'locutus/php/array/in_array'
import filter from 'locutus/php/array/array_filter'
import number_format from 'locutus/php/strings/number_format'

export default {
  filters: {
    /**
     * Truncate text if it exceeds limit & add ellipsis
     *
     * @param {string} value
     * @param {int} limit
     * @return {string}
     */
    truncate: function (value, limit = 80) {
      if (value.length <= limit) return value
      return value.substr(0, limit) + '...'
    },

    /**
     * Make first Letter of the string uppercase
     *
     * @param value
     * @return {string}
     */
    capitalize: function (value) {
      if (!value) return ''
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
  },
  methods: {
    /**
     * Finds out whether a variable is a boolean
     *
     * @param mixedVar
     * @return {*}
     */
    is_bool: function (mixedVar) {
      return is_bool(mixedVar)
    },

    /**
     * Filters elements of an array using a callback function
     * @param arr
     * @param func
     * @return {{}}
     */
    filter: function (arr, func) {
      return filter(arr, func)
    },

    /**
     * Format a number with grouped thousands
     *
     * @param number
     * @param decimals
     * @param decPoint
     * @param thousandsSep
     */
    number_format: function (number, decimals, decPoint, thousandsSep) {
      return number_format(number, decimals, decPoint, thousandsSep)
    },

    /**
     * Checks if a value exists in an array
     * @param needle
     * @param haystack
     * @param argStrict
     * @return {boolean}
     */
    in_array: function (needle, haystack, argStrict) {
      return in_array(needle, haystack, argStrict)
    },

    /**
     * Truncate text if it exceeds limit & add ellipsis
     *
     * @param {string} value
     * @param {int} limit
     * @return {string}
     */
    truncate: function (value, limit = 80) {
      if (value.length <= limit) return value
      return value.substr(0, limit) + '...'
    },

    /**
     * Make first Letter of the string uppercase
     *
     * @param value
     * @return {string}
     */
    capitalize: function (value) {
      if (!value) return ''
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    },
  }
}
