/**
 * Deletes the property at the given path in the object recursively.
 * @param {Object} obj - The object to delete the property from.
 * @param {Array<string>} path - The path to the property to delete.
 * @param {number} index - The current index in the path array.
 */
const deleteAtPath = (obj, path, index) => {
    if (index === path.length - 1) {
        delete obj[path[index]];
    } else {
        deleteAtPath(obj[path[index]], path, index + 1);
    }
};

/**
 * Sets the `toJSON` option for a given Mongoose schema.
 * This will remove any properties marked as `private` from the returned JSON.
 * @param {Object} schema - The Mongoose schema to set the `toJSON` option for.
 */
const toJSON = (schema) => {
    let transform;
    if (schema.options.toJSON || schema.options.toJSON?.transform) {
        transform = schema.options.toJSON.transform;
    }

    // Override the `toJSON` option to remove any properties marked as `private`.
    schema.options.toJSON = Object.assign(schema.options.toJSON || {}, {
        transform(doc, ret, options) {
            // Loop through all paths in the schema.
            Object.keys(schema.paths).forEach((path) => {
                // If the path is marked as `private`, delete it from the returned JSON.
                if (
                    schema.paths[path].options &&
                    schema.paths[path].options.private
                ) {
                    deleteAtPath(ret, path.split("."), 0);
                }
            });

            // Remove the `__v` property added by Mongoose.
            delete ret.__v;

            // Call the original transform function if it exists.
            if (transform) return transform(doc, ret, options);
        },
    });
};

export default toJSON;
