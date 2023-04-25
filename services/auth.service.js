import User from "../models/user.model.js";
import ErrRes from "../utils/errorResponse.js";

const signup = async (signupInfo) => {
    if (await User.isEmailTaken(signupInfo.email))
        throw new ErrRes("Email already taken", 400);

    const user = await User.create(signupInfo);
    if (user) return { msg: "Signed up successfully" };
};

const login = async (loginInfo) => {
    const { email, password } = loginInfo;
    const user = await User.findOne({ email });

    if (!user || !(await user.isPasswordMatch(password)))
        throw new ErrRes("Password or email incorrect", 400);

    const token = user.getJwtToken();

    return { token, user_id: user._id, email: user.email };
};

export { signup, login };
