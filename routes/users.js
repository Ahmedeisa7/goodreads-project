const express = require("express");
const router = express.Router();
const UserModel = require("../model/users.js");
const upload = require("../middleware/upload.js");
const ObjectID = require('mongoose').Types.ObjectId;
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose')

// Get All Data From DB
router.get("/", (req, res) => {
    UserModel.find({}, (err, usersData) => {
    if (!err) {
            return res.status(200).json(usersData);
        } else {
            return res.status(500).json({ Error: "DB_ERROR" });
        }
    });
});

// Get Data of user by id From DB
router.get("/:id", (req, res) => {
    const { id } = req.params;
    if(!ObjectID.isValid(id)){
        res.status(400).json({
            Error: 'Id Is Not Valid in DB'
        })
    }
    else {
        UserModel.findById(id, (err, userData) => {
            if (!err) {
                return res.json(userData);
            } else {
                return res.status(500).json({ Error: "DB_ERROR" });
            }
        });
    }
});

// Update By Id
router.patch("/:id", upload('user').single('image') , async (req, res) => {
    const { id } = req.params;
try {

        const user = await UserModel.findById(id);

        if(!user) {
            console.log("User Is Not Found !!");
        } else {

            const UserImage = user.image;
            
            if (req.file && req.file.name != "user.jpg") {
                
                const imagePath = path.join(__dirname, "../assets/uploads/user", user.image);
                
                fs.unlinkSync(imagePath); 
                user.image = req.file.filename;
            }
            encryptedPassword = await bcrypt.hash(req.body.password, 10);
            user.f_name = req.body.f_name;
            user.l_name = req.body.l_name;
            user.password = encryptedPassword;
            user.email = req.body.email;
            
            await user.save();
            res.send("Update User Successfuly")
            
            if (req.file && req.file.name != "user.jpg" && user.image !== req.file.filename) {
                
                const imagePath = path.join(__dirname, "../assets/uploads/user", user.image);
                
                fs.unlinkSync(imagePath); 
                
                user.image = UserImage;
                await user.save();
                console.log("image revert");
            }
        }
    } catch(err) {
        if (err instanceof mongoose.Error.ValidationError) {
                console.log("Validation error:", err.errors);
                res.status(400).send(err.errors);
            } else {
                console.log("Error saving user object:", err);
                res.status(500).send("Internal server error");
            }
    }
});

// // Delete By ID1
router.delete("/:id", (req, res) => {
    const { id } = req.params;
        UserModel.findByIdAndDelete(id, (err, data) => {
        if (!err) {
            return res.status(200).json(`Deleted One Record ===> ${data}`);
        } else {
            return res.status(500).json({ Erorr: "DB_ERROR" });
        }
    });
});

module.exports = router;

