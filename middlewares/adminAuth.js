const jwt = require('jsonwebtoken')
function adminMiddleware(req,res,next) {

    const token = req.headers.token;
    const decodedData = jwt.verify(token, process.env.jwt_adminSecret);

    if(decodedData) {

        req.adminId = decodedData.id;
        next();

    } else {

        res.json({
            message: 'You are no signed in.'
        });
    }

}

module.exports = {
    adminMiddleware: adminMiddleware
}