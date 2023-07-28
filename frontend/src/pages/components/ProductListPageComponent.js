import React, { useEffect, useState } from 'react';
import { Row, Col, Container, ListGroup, Button } from "react-bootstrap";
import { useParams } from "react-router-dom"

// Import /filterQueryResultsOptions/Components
import PriceFilterComponent from "../../components/filterQueryResultOptions/PriceFilterComponent";
import RatingFilterComponent from "../../components/filterQueryResultOptions/RatingFilterComponent";
import CategoryFilterComponent from "../../components/filterQueryResultOptions/CategoryFilterComponent";
import AttributesFilterComponent from "../../components/filterQueryResultOptions/AttributesFilterComponent";
// Import Components
import PaginationComponent from "../../components/PaginationComponent";
import ProductForListComponent from "../../components/ProductForListComponent";
import SortOptionsComponent from "../../components/SortOptionsComponent";



const ProductListPageComponent = ({ getProducts, categories }) => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [attrsFilter, setAttrsFilter] = useState([]); // collect category attributes from db and display on webpage
    const [attrsFromFilter, setAttrsFromFilter] = useState([]); // collect user filters for category attributes
    const [showResetFiltersButton, setShowResetFiltersButton] = useState(false);
    const [filters, setFilters] = useState({}); // collects all filters
    const [price, setPrice] = useState(500);
    const [ratingsFromFilter, setRatingsFromFilter] = useState({});

    const { categoryName } = useParams() || ""; // name is from App.js :categoryname

    // if there is a categoryName in the link
    useEffect(() => {
        if (categoryName) {
            let categoryAllData = categories.find((item) => item.name === categoryName.replaceAll(",", "/"));
            if (categoryAllData) {
                let mainCategory = categoryAllData.name.split("/")[0];
                let index = categories.findIndex((item) => item.name === mainCategory);
                setAttrsFilter(categories[index].attrs);
            }
        } else {
            setAttrsFilter([]);
        }
    }, [categoryName, categories])

    useEffect(() => {
        getProducts()
            .then(products => {
                setProducts(products.products)
                setLoading(false)
            })
            .catch((er) => {
                console.log(er)
                setError(true);
            })
        console.log(filters);
    }, [filters]);

    // if filters button is clicked, then the 'reset filters' button will appear 
    // handleFilters will push price, attrs, and rating to setFilters and be sent to the database
    const handleFilters = () => {
        setShowResetFiltersButton(true);
        setFilters({
            price: price,
            rating: ratingsFromFilter,
            attrs: attrsFromFilter,
        })
    }

    const resetFilters = () => {
        setShowResetFiltersButton(false);
        setFilters({});
        window.location.href = "/product-list"; // redirects user to same page without filters
    }

    return (
        <Container fluid>
            <Row>
                <Col md={3}>
                    <ListGroup variant="flush">
                        <ListGroup.Item className='mb-3 mt-3'><SortOptionsComponent /></ListGroup.Item>
                        <ListGroup.Item>
                            FILTER: <br />
                            <PriceFilterComponent price={price} setPrice={setPrice} />
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <RatingFilterComponent setRatingsFromFilter={setRatingsFromFilter} />
                        </ListGroup.Item>
                        <ListGroup.Item><CategoryFilterComponent /></ListGroup.Item>
                        <ListGroup.Item>
                            <AttributesFilterComponent attrsFilter={attrsFilter}
                                setAttrsFromFilter={setAttrsFromFilter} />
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button variant="primary" onClick={handleFilters}>Filters</Button>{" "}
                            {showResetFiltersButton && (
                                <Button onClick={resetFilters} variant="danger">Reset filters</Button>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={9}>
                    {loading ? (
                        <h1>Loading products...</h1>
                    ) : error ? (
                        <h1>Error while loading products. Try again later.</h1>
                    ) : (
                        products.map((product) => (
                            <ProductForListComponent
                                key={product._id}
                                images={product.images}
                                name={product.name}
                                description={product.description}
                                price={product.price}
                                rating={product.rating}
                                reviewsNumber={product.reviewsNumber}
                                productId={product._id}
                            />
                        ))
                    )}
                    <PaginationComponent />
                </Col>
            </Row>
        </Container>
    );
};

export default ProductListPageComponent;
