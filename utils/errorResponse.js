/**
 * Custom Error Response class
 * @class ErrRes
 * @extends Error
 */
class ErrRes extends Error {
    /**
     * Create an instance of ErrRes
     * @constructor
     * @param {string} message - The error message.
     * @param {number} statusCode - The HTTP status code.
     */
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

export default ErrRes;
