const express = require("express");
const router = express.Router();
const UserModel = require("../model/users.js");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cloudinary = require('../middleware/cloudinary.js');
const upload = require("../middleware/upload.js");
const fs = require("fs");
const path = require("path");


router.post("/", upload("users").single("image"), async (req, res) => {
    try {
            const result = await cloudinary.uploader.upload(req.file.path);
            
            const { f_name, l_name, email, password} = req.body;
            
            if (!(email && password && f_name && l_name)) {
                return res.status(400).send("All input is required");
            }

            const oldUser = await UserModel.findOne({ email });

            if (oldUser) {
                
                if (req.file) {
                    
                    const imagePath = path.join(__dirname,"../assets/images/users", req.file.filename)
                    fs.unlinkSync(imagePath)
            
                }
                return res.status(409).send("User Already Exist. Please Login");
            }

            let user;
            encryptedPassword = await bcrypt.hash(password, 10);
            user = await UserModel.create({
                f_name,
                l_name,
                email: email.toLowerCase(),
                password: encryptedPassword,
                imageUrl: result.secure_url,
                publicID: result.public_id
            })

            // Create token
            const token = jwt.sign({user_id: user._id, email},
            process.env.TOKEN_KEY, {expiresIn: "2h"});
            // save user token
            user.token = token;
            // return new user
            // return res.status(201).json(user);

        } catch (err) {
            res.status(400).send(err.message);
        }
    });

module.exports = router;