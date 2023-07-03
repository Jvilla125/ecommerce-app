const connectDB = require('../config/db');
connectDB();

const categoryData = require('./catergories')
const Category = require('../models/CategoryModel')

const importData = async () => {
    try {
        // Delete all categories from existing categories
        await Category.collection.deleteMany({});
        await Category.insertMany(categoryData);
        console.log("Seeder data proceeded succsesfully")
        process.exit()
    } catch (error){
        console.error("Error while processing seeder data", error);
        process.exit(1)
    }
}

importData();