import User from "../models/user.model.js";
import ErrRes from "../utils/errorResponse.js";

/**
 * Create a new user account
 * @param {Object} signupInfo - Object containing email and password of user
 * @returns {Object} - Object containing a success message if user was created successfully
 * @throws {ErrRes} - Throws error response if email is already taken
 */
const signup = async (signupInfo) => {
    // Check if email is already taken
    if (await User.isEmailTaken(signupInfo.email)) {
        throw new ErrRes("Email already taken", 400);
    }

    // Create new user account
    const user = await User.create(signupInfo);

    // Return success message if user was created successfully
    if (user) {
        return { msg: "Signed up successfully" };
    }
};

/**
 * Log in a user
 * @param {Object} loginInfo - Object containing email and password of user
 * @returns {Object} - Object containing token, user ID, and email of user if login was successful
 * @throws {ErrRes} - Throws error response if email or password is incorrect
 */
const login = async (loginInfo) => {
    const { email, password } = loginInfo;

    // Find user by email
    const user = await User.findOne({ email });

    // Check if user was found and password is correct
    if (!user || !(await user.isPasswordMatch(password))) {
        throw new ErrRes("Password or email incorrect", 400);
    }

    // Generate JSON Web Token for user
    const token = user.getJwtToken();

    // Return token, user ID, and email if login was successful
    return { token, user_id: user._id, email: user.email };
};

export { signup, login };
