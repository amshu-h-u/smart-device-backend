import httpStatus from "http-status";
import { User } from "../models/users.model.js";
import bcrypt from "bcrypt";
import { userValidationSchema, loginValidationSchema } from "../../Schema.js";
import jwt from "jsonwebtoken";

// Register user
const register = async (req, res) => {
    // Validate request body
    const { error } = userValidationSchema.validate(req.body, { abortEarly: false });
    if (error) {
        return res.status(httpStatus.BAD_REQUEST).json({
            message: "Validation failed",
            details: error.details.map(d => d.message)
        });
    }

    const { name, email, password, role } = req.body;

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(httpStatus.CONFLICT).json({ message: "User already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({ name, email, password: hashedPassword, role });
        await newUser.save();

        return res.status(httpStatus.CREATED).json({ message: "User Registered Successfully" });

    } catch (err) {
        console.error("Register Error:", err);
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: "Something went wrong" });
    }
};

// Login user
const login = async (req, res) => {
    // Validate request body
    const { error } = loginValidationSchema.validate(req.body, { abortEarly: false });
    if (error) {
        return res.status(httpStatus.BAD_REQUEST).json({
            message: "Validation failed",
            details: error.details.map(d => d.message)
        });
    }

    const {email, password} = req.body;

    try {
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(httpStatus.NOT_FOUND).json({ message: "User not found" });
        }

        // Compare password
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(httpStatus.UNAUTHORIZED).json({ message: "Invalid email or password" });
        }

        // Check JWT_SECRET
        if (!process.env.JWT_SECRET) {
            console.error("JWT_SECRET not defined");
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: "JWT secret not configured" });
        }

        // Generate JWT
        const token = jwt.sign(
            { id: user._id, name: user.name, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );
        user.token = token;
        await user.save();
        return res.status(httpStatus.OK).json({
            success: true,
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (err) {
        console.error("Login Error:", err);
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: "Something went wrong" });
    }
};

export { register, login };
