import React, { useEffect, useState } from 'react';
import { Row, Container } from "react-bootstrap"
import ProductCarouselComponent from '../../components/ProductCarouselComponent';
import CategoryCardComponent from '../../components/CategoryCardComponent';
import MetaComponent from '../../components/MetaComponent';

const HomePageComponent = ({ categories, getBestSellers }) => {
    const [mainCategories, setMainCategories] = useState([]);
    const [bestSellers, setBestSellers] = useState([]);

    useEffect(() => {
        getBestSellers()
            .then((data) => {
                setBestSellers(data);
            })
            .catch((er) => console.log(er.response.data.message ? er.response.data.message : er.response.data));
        setMainCategories((cat) => categories.filter((item) => !item.name.includes("/")));
    }, [categories])

    return (
        <>
        <MetaComponent />
            <ProductCarouselComponent bestSellers={bestSellers}/>
            <Container>
                <Row xs={1} md={2} className="g-4 mt-5" >
                    {mainCategories.map((category, idx) => (
                        <CategoryCardComponent key={idx} category={category} idx={idx} />
                    ))}
                </Row>
            </Container>
        </>
    )
}

export default HomePageComponent;