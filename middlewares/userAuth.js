const jwt = require('jsonwebtoken')
function userMiddleware(req,res,next) {

    const token = req.headers.token;
    const decodedData = jwt.verify(token, process.env.jwt_userSecret);

    if(decodedData) {

        req.userId = decodedData.id;
        next();

    } else {

        res.json({
            message: 'You are no signed in.'
        });
    }

}

module.exports = {
    userMiddleware: userMiddleware
}