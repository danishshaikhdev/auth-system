import { registerUser } from "../services/authService.js";

export const register = async (req, res) => {
    try {
        // STEP 1: call registerUser service
        const user = await registerUser(req.body);

        // STEP 2: return response
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user,
        });
    } catch(err) {
        // STEP 3: handle error
        console.error(err.message);
        res.status(400).json({
            success: false,
            message: err.message,
        })
    }
}