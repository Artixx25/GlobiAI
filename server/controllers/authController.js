import User from "../mongodb/models/User.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { validationResult }  from 'express-validator'

const generateAccessToken = id => {
    const payload =  {
        id
    }
    return jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "24h"})
}

class authController {
    async register(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) return res.status(400).json({message: 'error of registration', errors});
            const {username, email, userImage, password, google} = req.body
            const candidate = await User.findOne({username})
            const candidateEmail = await User.findOne({email})
            if (candidate) return res.status(400).json({message: 'User with this username already exists'})
            if (candidateEmail) return res.status(400).json({message: 'User with this email already exists'})
            const hashPassword = bcrypt.hashSync(password, 7)
            const user = new User({username, email, userImage, password: hashPassword, google})
            await user.save()
            return res.json({message: "User was successfully registered"})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: "Registration error"})
        }
    }

    async login(req, res) {
        try {
            const {username, password} = req.body
            const user = await User.findOne({username})
            if(!user) return res.status(400).json({message: `User with username: ${username} allready exists`})
            const validPassword = bcrypt.compareSync(password, user.password)
            if (!validPassword) return res.status(400).json({message: `Password is incorrect`})
            const token = generateAccessToken(user._id)
            return res.json({token, user})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: "Login error"})
        }
    }

    async loginGoogle(req, res) {
        try {
            const {username, email, google} = req.body
            const user = await User.findOne({username, email})
            if(google === undefined || google === false) return res.status(400).json({message: `User: '${username}' registered without google auth.`})
            const token = generateAccessToken(user._id)
            return res.status(200).json({token, user})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: "Login error"})
        }
    }

    async getUsers(req, res) {
        try {
            const users = await User.find()
            res.json(users)
        } catch (e) {
            console.log(e)
            res.status(400).json({message: "Registration error"})
        }
    }

    async getUser(req, res) {
        try {
            const {id} = req.params;
            const user = await User.findById(id)
            return res.json(user)
        } catch (e) {
            console.log(e)
            res.status(400).json({message: "Registration error"})
        }
    }

    async editUser(req, res) {
        try {
            const {id} = req.params;
            const {username, email, userImage, coverImage} = req.body;
            const editingUser = await User.findByIdAndUpdate(id, {username, email, userImage, coverImage})
            return res.status(200).json(editingUser)
        } catch (e) {
            console.log(e);
            return res.status(400).json({message: "Editing error, try again later"})
        }
    }
}

export default new authController();
