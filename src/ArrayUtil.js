
/**
 * Utility class providing static methods for common array operations.
 */
export default class ArrayUtil {
  /**
   * Deep comparison of two values.
   * @param {mixed} a
   * @param {mixed} b
   * @return {boolean} True, if equal.
   */
  static isEqual (a, b) {
    // compare instance
    if (a === b) {
      return true
    }

    // check null
    if (a === null && b === null) {
      return true
    } else if (a === null || b === null) {
      return false
    }

    // check types
    if (typeof a !== typeof b) {
      return false
    }

    // compare arrays
    if (a instanceof Array) {
      if (a.length !== b.length) {
        return false
      }

      // compare item by item
      let i = -1
      let equal = true
      while (equal && ++i < a.length) {
        equal = ArrayUtil.isEqual(a[i], b[i])
      }
      return equal
    }

    // compare objects
    if (a instanceof Object) {
      // check if object knows how to compare itself to other objects
      if (typeof a.isEqualTo === 'function') {
        return a.isEqualTo(b)
      }
      if (typeof b.isEqualTo === 'function') {
        return b.isEqualTo(a)
      }

      // collect keys of objects
      let keys = ArrayUtil.unique(Object.keys(a).concat(Object.keys(b)))

      // compare items for each key
      let i = -1
      let equal = true
      while (equal && ++i < keys.length) {
        let comparingKey = keys[i]
        equal = ArrayUtil.isEqual(a[comparingKey], b[comparingKey])
      }
      return equal
    }

    // compare dates
    if (a instanceof Date) {
      return a.getTime() === b.getTime()
    }

    return false
  }

  /**
   * Removes duplicate values from an array.
   * @param {array} array
   * @return {mixed} New array with unique items.
   */
  static unique (array) {
    return array.filter((item, index) => array.indexOf(item) === index)
  }
}
