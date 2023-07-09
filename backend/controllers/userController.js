// Controller methods will be performing actual database operations for our app
const User = require('../models/UserModel');

const getUsers = async (req, res, next) => {
    try {
        const users = await User.find({}).select("-password") 
        return res.json(users)
        //fetch all users from database ({})
        // .select("-password") excludes what will be sent in the json 
    } catch (error) {
        next(error)
    }
}

module.exports = getUsers