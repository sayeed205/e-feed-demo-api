import User from "../models/user.model.js";
import ErrRes from "../utils/errorResponse.js";

const signup = async (signupInfo) => {
    if (await User.isEmailTaken(signupInfo.email))
        throw new ErrRes("Email already taken", 400);

    const user = await User.create(signupInfo);
    if (user) return { msg: "Signed up successfully" };
};

export { signup };
