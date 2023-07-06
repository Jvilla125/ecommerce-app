const Product = require('../models/ProductModel');
const recordsPerPage = require('../config/pagination');

const getProducts = async (req, res, next) => {
    try {

        let query = {}
        let queryCondition = false;

        let priceQueryCondition = {}
        if (req.query.price) {
            queryCondition = true;
            // $lte mongodb syntax means less than
            priceQueryCondition = { price: { $lte: Number(req.query.price) } }
        }

        let ratingQueryCondition = {}
        if (req.query.rating) {
            queryCondition = true;
            // $in mongodb syntax means rating includes 
            ratingQueryCondition = { rating: { $in: req.query.rating.split(",") } }
        }

        let categoryQueryCondition = {}
        const categoryName = req.params.categoryName || "";
        if(categoryName){
            queryCondition = true;
            let a = categoryName.replaceAll(',', "/")
            var regEx = new RegExp("^" + a)
            categoryQueryCondition = {category: regEx}
        }

        if (queryCondition){
            query = {
                $and: [priceQueryCondition, ratingQueryCondition, categoryQueryCondition]
            }
        }
        

        const pageNum = Number(req.query.pageNum) || 1;

        // sort by name, price, customer rating
        // sorting based on //front/src/components/SortOptionsComponent.js
        // We gave 5 options that are separted by an "_"
        // Since it will have either 1 or -1 to be sorted in ascending or descending order
        let sort = {}
        const sortOption = req.query.sort || ""
        if (sortOption) {
            let sortOpt = sortOption.split("_")
            // example <option value="price_1">
            // we separate price = sortOpt[0] and 1 = sortOpt[1]
            sort = { [sortOpt[0]]: Number(sortOpt[1]) }
            console.log(sort)
        }

        // find all products by using .find({})
        // .sort({name: 1}) means products will be sorted in ascending order 
        // .limit(1) reduces the amount of products being returned

        const totalProducts = await Product.countDocuments(query)
        const products = await Product.find(query)
            .skip(recordsPerPage * (pageNum - 1))
            .sort(sort)
            .limit(recordsPerPage)

        res.json({
            products,
            pageNum,
            // Calculates the total number of links
            paginationLinksNumber: Math.ceil(totalProducts / recordsPerPage),
        });
    } catch (error) {
        next(error)
    }
}

module.exports = getProducts