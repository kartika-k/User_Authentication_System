import express from 'express'
import bcrypt from 'bcrypt'
const router = express.Router();
import { User } from '../models/User.js'
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'

router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.json({ message: "Username, email, and password are required" });
    }

    if (password.length < 6) {
        return res.json({ message: "Password must be at least 6 characters long" });
    }

    const userByEmail = await User.findOne({ email });
    const userByUsername = await User.findOne({ username });
    if (userByEmail) {
        return res.json({ message: "User with this email already exists" });
    }
    if (userByUsername) {
        return res.json({ message: "User with this username already exists" });
    }
    const hashpassword = await bcrypt.hash(password, 10);
    const newUser = new User({
        username,
        email,
        password: hashpassword,
    });

    await newUser.save();
    return res.json({ status: true, message: "User created successfully" });
});


router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
        return res.json({ message: "User is not registered" });
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
        return res.json({ message: "Password is incorrect" });
    }
    const token = jwt.sign({ username: user.username }, process.env.KEY, { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true, maxAge: 360000 });
    return res.json({ status: true, message: "Login successfully" });
});

router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ message: "User not registered" });
        }
          const token = jwt.sign({ id: user._id }, process.env.KEY, { expiresIn: '5m' });

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'k.kannojiya2003@gmail.com',
                pass: 'zfxk zxys lwwc aull'
            }
        });

        const encodedToken = encodeURIComponent(token);
        var mailOptions = {
            from: 'k.kannojiya2003@gmail.com',
            to: email,
            subject: 'Reset Password',
            text: `http://localhost:5173/resetPassword/${encodedToken}`
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                return res.json({ message: "Error sending email" });
            } else {
                return res.json({ status: true, message: "Email sent" });
            }
        });
    } catch (err) {
        console.log(err);
        return res.json({ message: "An error occurred" });
    }
});

router.post('/reset-password/:token', async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    if (!password || password.length < 6) {
        return res.json({ message: "Password must be at least 6 characters long" });
    }

    try {
        const decoded = await jwt.verify(token, process.env.KEY);
        const id = decoded.id;
        const hashPassword = await bcrypt.hash(password, 10);
        await User.findByIdAndUpdate({ _id: id }, { password: hashPassword });
        return res.json({ status: true, message: "Password reset successfully" });
    } catch (err) {
        console.log(err);
        return res.json({ message: "Invalid token" });
    }
});

router.post('/reset-password/:token',async(req,res) => {
    const {token} = req.params;
    const {password} = req.body;

    try{
        const decoded = await jwt.verify(token,PromiseRejectionEvent.env.KEY);
        const id = decoded.id;
        const hashPassword = await bcrypt.hash(password,10);
        await User.findByIdAndUpdate({_id:id},{password:hashPassword})
        return res.json({status:true,message:"Password reset successfully"})
    }catch(err){
        return res.json("invalid token")
    }
})

const verifyUser = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.json({ status: false, message: "No token provided" });
        }
        const decoded = await jwt.verify(token, process.env.KEY);
        next();
    } catch (err) {
        return res.json({ status: false, message: "Invalid token" });
    }
};

router.get("/verify", verifyUser, (req, res) => {
    return res.json({ status: true, message: "authorized" });
});

router.get('/logout', (req, res) => {
    res.clearCookie('token')
    return res.json({ status: true , message: "Logout successful" })
})

export { router as userRouter }

