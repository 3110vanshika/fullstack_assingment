const user = require('../model/user');
const bcrypt = require('bcrypt');
const createToken = require('../utils/createToken');
const { sendEmail } = require('../utils/sendEmail');
const { generateTokenWithOTP, generateOTP } = require('../utils/generateOTP');
const getObjFromToken = require('../utils/getObjFromToken');

const userSignup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Validation
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,}$/;
        if (!passwordRegex.test(password)) {
            throw new Error("Password must be minimum 8 characters, at least 1 uppercase letter, at least 1 number, and at least 1 special character (e.g., @, #, $, %).");
        }

        const existingUser = await user.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: "Email is already registered. Please login." });
        }

        const hashedPassword = await bcrypt.hash(password, 5);
        const newUser = await user.create({
            name,
            email,
            password: hashedPassword
        });

        res.status(200).json({ user: newUser, message: "User registered successfully." });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const userSignin = async (req, res) => {
    try {
        const { email, password } = req?.body;

        const existingUser = await user.findOne({ where: { email } });
        if (!existingUser) {
            return res.status(400).json({ message: "User not found. Please sign up." });
        }

        if (existingUser.isBlocked) {
            const unblockTime = new Date(existingUser.blockedAt).getTime() + (1 * 60 * 1000);
            if (Date.now() < unblockTime) {
                return res.status(403).json({ message: "Your account is temporarily blocked. Try again after 1 minute." });
            } else {
                existingUser.isBlocked = false;
                existingUser.failedLoginAttempts = 0;
                existingUser.blockedAt = null;
                await existingUser.save();
            }
        }

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect) {
            existingUser.failedLoginAttempts += 1;
            if (existingUser.failedLoginAttempts >= 3) {
                existingUser.isBlocked = true;
                existingUser.blockedAt = new Date();
            }
            await existingUser.save();
            return res.status(400).json({ message: "Invalid credentials" });
        }

        existingUser.failedLoginAttempts = 0;

        const passwordExpiryTime = 10 * 24 * 60 * 60 * 1000; 

        const passwordChangedTime = existingUser.passwordChangedAt
            ? new Date(existingUser.passwordChangedAt).getTime()
            : new Date(existingUser.createdAt).getTime();
        const passwordAge = Date.now() - passwordChangedTime;

        if (passwordAge > passwordExpiryTime) {
            return res.status(400).json({ message: "Your password has expired. Please reset your password." });
        }

        await existingUser.save();

        const obj = {
            id: existingUser.id,
            email: existingUser.email,
            passwordExpiry: Date.now() + passwordExpiryTime,
        };
        const token = await createToken(obj);

        res.status(200).json({ token, user: existingUser });

    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error?.message });
    }
};


const verifyEmail = async (req, res) => {
    try {
        const { email } = req.body;
        console.log("Email", email)

        const users = await user.findOne({ where: { email } });
        if (!users) throw Error("User with this email is not found");
        const obj = {
            id: users.id,
            otp: generateOTP()
        }
        const OTP = generateTokenWithOTP(obj);
        const text = `Click <a target="_blank" href="${process.env.FRONTEND_URL}/reset-password/${OTP}">here</a> to verify your email`;
        await sendEmail(users.email, text);

        res.status(200).json({ message: "Password reset link is sent to your registered email" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const resetPassword = async (req, res) => {
    try {
        const { OTP } = req?.params;
        const { password, confirmPassword } = req?.body;

        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        const users = await getObjFromToken(OTP);
        if (!users) {
            throw new Error("Token verification failed");
        }

        const existingUser = await user.findOne({ where: { id: users.id } });
        if (!existingUser) {
            return res.status(404).json({ message: "User not found" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        existingUser.password = hashedPassword;
        existingUser.passwordChangedAt = new Date();

        let previousPasswords = existingUser.previousPasswords || [];
        previousPasswords.unshift(hashedPassword); 
        previousPasswords = previousPasswords.slice(0, 3); 
        existingUser.previousPasswords = previousPasswords;
        await existingUser.save();

        res.status(200).json({ message: "Password reset successfully" });
    } catch (error) {
        res.status(500).json({ message: error?.message });
    }
};

module.exports = { userSignup, userSignin, verifyEmail, resetPassword };
