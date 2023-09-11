//creating token and saving in a cookie :)

const sendToken = (user, statusCode, res) => {
    const token = user.getJWTToken();

    //option for cookie
    const option = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRE * 24 + 60 * 60 * 1000
        ),
        httpOnly: true
    }

    res.status(statusCode).cookie("token", token, option).json({
        statusCode: statusCode,
        status: true,
        message: "Success",
        payload: {
            user,
            token
        }
    })
}

module.exports = sendToken