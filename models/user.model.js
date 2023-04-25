import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

/* <!----------------------------------- LOAD ENV -----------------------------------> */
if (process.env.NODE_ENV !== "production")
    dotenv.config({ path: ".env.local" });
else dotenv.config({ path: ".env" });

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.statics.isEmailTaken = async function (email) {
    const user = await this.findOne({ email });
    return !!user;
};

userSchema.methods.isPasswordMatch = async function (password) {
    return await bcrypt.compare(password, this.password);
};

userSchema.methods.getJwtToken = function () {
    return jwt.sign(
        {
            user_id: this._id,
            email: this.email,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "7d",
        }
    );
};

const User = mongoose.model("User", userSchema);

export default User;
