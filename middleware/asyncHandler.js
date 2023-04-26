/**
 * Wraps an async function and catches any errors, forwarding them to the next middleware
 * @param {function} fn - the async function to be wrapped
 * @returns {function} - the wrapped function
 */
const asyncHandler = (fn) => (req, res, next) =>
    Promise.resolve(fn(req, res, next)).catch(next);

export default asyncHandler;
