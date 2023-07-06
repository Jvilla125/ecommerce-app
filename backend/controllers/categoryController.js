// Controller methods will be performing actual database operations for our app

// Need to import the Category model below VV
const Category = require('../models/CategoryModel');

const getCategories = async (req, res, next) => {
    try {
        // use Category.find to all categories from the database
        // inside the brackets we can filter by name,price, etc.
        const categories = await Category.find({}).sort({ name: "asc" }).orFail()
        // .orFail() means that if there are no categories in the Database, an error will be thrown
        //response is the json of categories
        res.json(categories)
        
    } catch (error) {
        next(error)
    }
}

module.exports = getCategories