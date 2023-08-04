import ProductCarouselComponent from "../../components/ProductCarouselComponent";
import CategoryCardComponent from "../../components/CategoryCardComponent";
import { Row, Container } from "react-bootstrap";

import { useEffect, useState } from "react";
import MetaComponent from "../../components/MetaComponent";

const HomePageComponent = ({ categories, getBestSellers }) => {

    const [mainCategories, setMainCategories] = useState([]);
    const [bestSellers, setBestsellers] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        getBestSellers()
            .then((data) => {
                setBestsellers(data);
            })
            .catch((er) => {
                setError(er.response.data.message ? er.response.data.message : er.response.data)
                console.log(er.response.data.message ? er.response.data.message : er.response.data)
            });

        setMainCategories((cat) => categories.filter((item) => !item.name.includes("/")));
    }, [categories])

    return (
        <>
            <MetaComponent />
            <ProductCarouselComponent bestSellers={bestSellers} />
            <Container>
                <Row xs={1} md={2} className="g-4 mt-5">
                    {mainCategories.map((category, idx) => (
                        <CategoryCardComponent key={idx} category={category} idx={idx} />
                    ))}
                </Row>
                {error}
            </Container>
        </>
    );
};

export default HomePageComponent;
