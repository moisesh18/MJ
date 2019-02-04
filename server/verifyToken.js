const express = require('express');
const router = express.Router();
var jwt = require('jsonwebtoken');

function VerifyToken(req, res, next) {
    var secret = "&$^Vb:?wKYL'N'6%";
    var token = req.headers["authorization"];
    if (token) {
        jwt.verify(token, secret, function (err, decoded) {
            if (err) {
                return res.status(401).json({
                    success: false,
                    message: "No se proporcionó un token"
                });
            } else {
                req.user = decoded;
                next();
            }
        });
    } else {
        return res.status(401).json({
            success: false,
            message: "No se proporcionó un token"
        });
    }
}

module.exports = VerifyToken;
