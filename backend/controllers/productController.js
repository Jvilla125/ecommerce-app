const Product = require('../models/ProductModel');
const recordsPerPage = require('../config/pagination');

const getProducts = async (req, res, next) => {
    try {

        let query = {}
        let queryCondition = false;

        // filtering by price
        let priceQueryCondition = {}
        if (req.query.price) {
            queryCondition = true;
            // $lte mongodb syntax means less than
            priceQueryCondition = { price: { $lte: Number(req.query.price) } }
        }

        // filtering by rating
        let ratingQueryCondition = {}
        if (req.query.rating) {
            queryCondition = true;
            // $in mongodb syntax means rating includes 
            ratingQueryCondition = { rating: { $in: req.query.rating.split(",") } }
        }

        let categoryQueryCondition = {}
        const categoryName = req.params.categoryName || "";
        if (categoryName) {
            queryCondition = true;
            let a = categoryName.replaceAll(',', "/")
            var regEx = new RegExp("^" + a)
            categoryQueryCondition = { category: regEx }
        }

        // filtering search by category
        if (req.query.category) {
            queryCondition = true
            let a = req.query.category.split(",").map((item) => {
                if (item) return new RegExp("^", item)
            })
            categoryQueryCondition = {
                category: { $in: a }
            }
        }

        // filtering by attributes 
        let attrsQueryCondition = []
        if (req.query.attrs) {

            // req.query.attrs.split(",") will result in ['RAM-1TB-2TB-4TB', 'Color-blue-red']
            attrsQueryCondition = req.query.attrs.split(",").reduce((acc, item) => {
                if (item) {
                    // item.split("-") will result in ['RAM', '1TB', '2TB', '4TB'],['color', 'blue', 'red']
                    let a = item.split("-")
                    let values = [...a]
                    values.shift() // removes first item in a on line 54 -> ['1TB', '2TB', '4TB'],['blue', 'red']
                    let a1 = {
                        attrs: {
                            $elemMatch: {
                                key: a[0],
                                value: { $in: values }
                            }
                        }
                    }
                    acc.push(a1)
                    return acc
                } else return acc
            }, [])
            queryCondition = true;
        }

        // pagination
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

        // Defining a search query
        // req.params.searchQuery is from productRoutes.js line 7 :searchQuery
        // "/category/:categoryName/search/:searchQuery"
        const searchQuery = req.params.searchQuery || ""
        let searchQueryCondition = {}
        let select = {}
        // if there is a searchQuery from the user then we define queryCondition true 
        if (searchQuery) {
            queryCondition = true;
            searchQueryCondition = { $text: { $search: searchQuery } }
            select = {
                score: { $meta: "textScore" } // represents accuracy of search results from search query
            }
            sort = { score: { $meta: "textScore" } }
        }

        if (queryCondition) {
            query = {
                $and: [
                    priceQueryCondition,
                    ratingQueryCondition,
                    categoryQueryCondition,
                    searchQueryCondition,
                    ...attrsQueryCondition
                ]
            }
        }

        // find all products by using .find({})
        // .sort({name: 1}) means products will be sorted in ascending order 
        // .limit(1) reduces the amount of products being returned
        const totalProducts = await Product.countDocuments(query)
        const products = await Product.find(query)
            .select(select) // use select to exclude fields from search
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

const getProductsById = async (req, res, next) => {
    try {
        // req.params.id is from productRoutes.js line 11 "/:id"
        const product = await Product.findById(req.params.id).populate("reviews").orFail() // populate("reviews") shows all reviews content
        res.json(product)
    } catch (error) {
        next(error)
    }
}

const getBestSellers = async (req, res, next) => {
    try {
        const products = await Product.aggregate([
            { $sort: { category: 1, sales: -1 } },
            { $group: { _id: "$category", doc_with_max_sales: { $first: "$$ROOT" } } },
            { $replaceWith: "$doc_with_max_sales" },
            { $match: { sales: { $gt: 0 } } },
            { $project: { _id: 1, name: 1, images: 1, category: 1, description: 1 } }, // only get the following requested
            { $limit: 3 }
        ])
        res.json(products)
    } catch (error) {
        next(error)
    }
}

// admin functions: 
const adminGetProducts = async (req, res, next) => {
    try {
        const products = await Product.find({})
            .sort({ category: 1 })
            .select('name price category');

        return res.json(products)
    } catch (error) {
        next(error)
    }
}

const adminDeleteProduct = async (req, res, next) => {
    try {
        // req.params.id is from productRoutes.js line 16 "/admin/:id"
        const product = await Product.findById(req.params.id).orFail();
        await product.remove()
        res.json({ message: 'product removed' })
    } catch (error) {
        next(error)
    }
}

const adminCreateProduct = async (req, res, next) => {
    try {
        const product = new Product()
        const { name, description, count, price, category, attributesTable } = req.body;
        product.name = name;
        product.description = description;
        product.count = count;
        product.price = price;
        product.category = category;
        if (attributesTable.length > 0) {
            attributesTable.map((item) => {
                product.attrs.push(item) // bc attrs is an array in the model
            })
        }
        await product.save()
        res.json({
            message: "product created",
            productId: product._id
        })
    } catch (error) {
        next(error)
    }
}

const adminUpdateProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id).orFail() // if there is not product with id then throw error
        const { name, description, count, price, category, attributesTable } = req.body;
        product.name = name || product.name;
        product.description = description || product.description;
        product.count = count || product.count;
        product.price = price || product.price;
        product.category = category || product.category;
        if (attributesTable.length > 0) {
            product.attrs = [];
            attributesTable.map((item) => {
                product.attrs.push(item)
            })
        } else {
            product.attrs = []
        }
        await product.save()
        res.json({
            message: "product updated"
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getProducts,
    getProductsById,
    getBestSellers,
    adminGetProducts,
    adminDeleteProduct,
    adminCreateProduct,
    adminUpdateProduct
}