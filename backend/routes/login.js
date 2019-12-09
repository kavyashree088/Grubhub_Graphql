var express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
var { user } = require("../models/UserSchema");
var { owner } = require('../models/OwnerSchema')
var jwt = require("jsonwebtoken");

router.post("/loginUser", async function (req, res) {
    console.log(req.body)
    try {
        user
            .find({
                email: req.body.email // search query
            })
            .then(doc => {
                if (doc.length !== 0) {
                    console.log("Success");
                    if (bcrypt.compareSync(req.body.password, doc[0].password)) {
                        console.log("true");
                        var token = {
                            signinSuccess: "success",
                            email: doc[0].email
                        };
                        var signed_token = jwt.sign(token, "cmpe273", {
                            expiresIn: 86400 // in seconds
                        });
                        res.statusCode = 200;
                        res.json({
                            message: "authentication done ",
                            token: signed_token,
                            userType: "user",
                            user: doc
                        });
                    } else {
                        res.writeHead(400, {
                            "Content-Type": "text/plain"
                        });
                        res.end();
                    }
                } else {
                    console.log("here");
                    res.statusCode = 500;
                    return res.json({ errors: ["Invalid Login"] });
                }
            })
            .catch(err => {
                console.error(err);
                res.statusCode = 500;
                return res.json({ errors: ["Invalid Login"] });
            });
    } catch (error) {
        console.log(error);
    }
});

router.post("/loginOwner", async function (req, res) {
    try {
        console.log("Connection Successful!");
        console.log(req.body.email);
        owner
            .find({
                email: req.body.email // search query
            })
            .then(doc => {
                if (doc.length !== 0) {
                    if (bcrypt.compareSync(req.body.password, doc[0].password)) {
                        console.log("true");
                        var token = {
                            signinSuccess: "success",
                            email: doc[0].email
                        };
                        var signed_token = jwt.sign(token, "cmpe273", {
                            expiresIn: 86400 // in seconds
                        });
                        res.statusCode = 200;
                        res.json({
                            message: "authentication done ",
                            token: signed_token,
                            userType: "owner",
                            user: doc
                        });
                    } else {
                        res.writeHead(400, {
                            "Content-Type": "text/plain"
                        });
                        res.end();
                    }
                } else {
                    console.log("here");
                    res.statusCode = 500;
                    return res.json({ errors: ["Invalid Login"] });
                }
            })
            .catch(err => {
                console.error(err);
                res.statusCode = 500;
                return res.json({ errors: ["Invalid Login"] });
            });
    } catch (error) {
        console.log("error");
        res.statusCode = 500;
        return res.json({ message: error.message });
    }
});

module.exports = router;