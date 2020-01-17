const jwt = require('jsonwebtoken');
const secret = 'mysecretsshhh';
const withAuth = function(req, res, next) {
    console.log("I am reached");
    const token = req.cookies.token;
    console.log("Well hey there I am reached");
    if (!token) {
        console.log("!token reached");
        res.status(401).send('Unauthorized: No token provided');
        console.log("second !token reached");
    } else {
        console.log("withAuth else statement");
        jwt.verify(token, secret, function(err, decoded) {
            if (err) {
                res.status(401).send('Unauthorized: Inv' +
                    'alid token');
            } else {
                req.email = decoded.email;
                next();
            }
        });
    }
};
module.exports = withAuth;