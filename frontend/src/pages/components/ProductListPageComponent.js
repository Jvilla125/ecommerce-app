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
    const [attrsFilter, setAttrsFilter] = useState([]);
    const [attrsFromFilter, setAttrsFromFilter] = useState([]); // pass a prop to AttributesFilterComponent.js

    console.log(attrsFromFilter)

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
    }, [])

    return (
        <Container fluid>
            <Row>
                <Col md={3}>
                    <ListGroup variant="flush">
                        <ListGroup.Item className='mb-3 mt-3'><SortOptionsComponent /></ListGroup.Item>
                        <ListGroup.Item> FILTER: <br /> <PriceFilterComponent /></ListGroup.Item>
                        <ListGroup.Item><RatingFilterComponent /></ListGroup.Item>
                        <ListGroup.Item><CategoryFilterComponent /></ListGroup.Item>
                        <ListGroup.Item>
                            <AttributesFilterComponent attrsFilter={attrsFilter}
                                setAttrsFromFilter={setAttrsFromFilter} />
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button variant="primary">Filters</Button>{" "}
                            <Button variant="danger">Reset filters</Button>
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
