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

const newCategory = async (req, res, next) => {
    try {
        const { category } = req.body;
        if (!category) {
            res.status(400).send("Category input is required!")
        }
        // findOne means we are looking based on the name of category
        const categoryExists = await Category.findOne({ name: category })
        // if the name of a category exists a user error 400 will be sent back
        if (categoryExists) {
            res.status(400).send("Category already exists");
        } else {
            // if a category does not exist, we will create one in the database 
            const categoryCreated = await Category.create({
                name: category
            })
            // after a category is successfully created, the user will the json information of that 
            // new category
            res.status(201).send({ categoryCreated: categoryCreated })
        }
    } catch (error) {
        next(error)
    }
}

const deleteCategory = async (req, res, next) => {
    // req.params gets id of category
    // return res.send(req.params.category)
    try {
        if (req.params.category !== "Choose category") {
            const categoryExists = await Category.findOne({
                name: decodeURIComponent(req.params.category)
            }).orFail()
            await categoryExists.remove()
            res.json({ categoryDeleted: true })
        }
    } catch (error){
        next(error)
    }
}


module.exports = {
    getCategories,
    newCategory,
    deleteCategory
}