import jwt from 'jsonwebtoken'

// admin authentication middleware
const authAdmin = async (req, res, next) => {
    try {
        const { atoken } = req.headers

        // checking for admin token
        if (!atoken) {
            res.json({ success: false, message: "Not Authorized"})
        }

        const token_decode = jwt.verify(atoken, process.env.JWT_SECRET)

        // comparing token
        if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
            res.json({ success: false, message: "Not Authorized"})
        }

        next()
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export default authAdmin 