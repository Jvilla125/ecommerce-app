import React from 'react';
import { useParams } from 'react-router-dom';

const ProductDetailsPage = () => {
    const { id } = useParams()
    console.log(id, "<-- id ")
    return <p>This is a product details page</p>
};

export default ProductDetailsPage;