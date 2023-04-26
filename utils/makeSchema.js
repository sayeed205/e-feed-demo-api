/**
 * Creates a new object containing only the specified keys from the original object.
 *
 * @param {Object} object - The original object to extract the keys from.
 * @param {Array} keys - An array of keys to extract from the original object.
 * @returns {Object} - A new object containing only the specified keys from the original object.
 */
const makeSchema = (object, keys) =>
    keys.reduce((obj, key) => {
        if (object && Object.prototype.hasOwnProperty.call(object, key)) {
            obj[key] = object[key];
        }
        return obj;
    }, {});

export default makeSchema;
